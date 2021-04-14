import {injectable} from "inversify";
import PouchDB from "../../infrastructure/pounchDB/pounchDB";
import {OrganizationMetaDocument} from "../../data/storage/OrganizationMetaDocument";
import {IndividualMetaDocument} from "../../data/storage/IndividualMetaDocument";
import {store} from "../../store/store";
import {setFamiliarUsers, setMeta, setModules, setOrganization, setUserSchemes} from "../../store/auth/authReducer";
import _ from 'lodash';

//Todo: handle errors
@injectable()
class ReplicationService {
    private isIndividual: boolean = true;
    private metaDatabase: any;
    private schemeDatabase: any;

    constructor() {
        PouchDB.debug.enable('*');
    }

    public async ConnectMetaDatabaseAsync(metaDBConnectionString: string,
                                          token: string,
                                          isIndividual: boolean,
                                          userDocumentName: string | undefined,
                                          userId: string | undefined): Promise<void> {
        await this.CloseAsync();

        this.metaDatabase = new PouchDB(metaDBConnectionString,
            {
                jwtauth: {token: () => token},
                adapter: 'worker'
            });

        this.isIndividual = isIndividual;
        await this.InitializeAsync(isIndividual, userDocumentName, userId);
    }

    private async InitializeAsync(isIndividual: boolean = false, userDocumentName: string | undefined, userId: string | undefined): Promise<void> {
        const dispatch = store.dispatch;

        if (isIndividual) {
            this.metaDatabase.get(userDocumentName).then(function (individualMetaDocument: IndividualMetaDocument) {

                dispatch(setMeta(individualMetaDocument.user));
                dispatch(setModules(individualMetaDocument.modules));
                dispatch(setUserSchemes(individualMetaDocument.schemes));
                dispatch(setFamiliarUsers(individualMetaDocument.familiarUsers));
            });
        } else { //member of organization
            this.metaDatabase.get('meta').then(function (organizationMetaDocument: OrganizationMetaDocument) {
                const members = organizationMetaDocument.members.filter(m => m.id !== <string>userId);
                const userMeta = organizationMetaDocument.members.filter(m => m.id === <string>userId)[0];

                const userId: string = userMeta.id;
                const userSchemes = organizationMetaDocument.schemes.filter(s => s.creatorId === userId || _.includes(s.memberIDs, userId));

                dispatch(setMeta(userMeta));
                dispatch(setModules(organizationMetaDocument.modules));
                dispatch(setUserSchemes(userSchemes));
                dispatch(setFamiliarUsers(members));
                dispatch(setOrganization(organizationMetaDocument.organization));
            });
        }
    }


    public async ConnectSchemeDatabaseAsync(schemeConnectionString: string, token: string): Promise<void> {
        await this.CloseScheme();

        this.schemeDatabase = new PouchDB(schemeConnectionString,
            {
                jwtauth: {token: () => token},
                adapter: 'worker'
            });
    }


    private async CloseScheme(): Promise<void> {
        if (this.schemeDatabase) {
            await this.schemeDatabase.close();
            this.schemeDatabase = null;

            //Todo: cleanUp
            if (this.isIndividual) {
            } else {
            }
        }
    }

    private async CloseMeta(): Promise<void> {
        if (this.metaDatabase) {
            await this.metaDatabase.close();
            this.metaDatabase = null;

            const dispatch = store.dispatch;
            if (this.isIndividual) {
                dispatch(setMeta(null));
                dispatch(setModules([]));
                dispatch(setUserSchemes([]));
                dispatch(setFamiliarUsers([]));
            } else {
                dispatch(setMeta(null));
                dispatch(setModules([]));
                dispatch(setUserSchemes([]));
                dispatch(setFamiliarUsers([]));
                dispatch(setOrganization(null));
            }
        }
    }


    public async CloseAsync(): Promise<void> {
        let p1;
        if (this.metaDatabase) {
            p1 = this.CloseMeta();
        }

        let p2;
        if (this.schemeDatabase) {
            p2 = this.CloseScheme();
        }

        await Promise.all([p1, p2]);
    }
}

export default ReplicationService