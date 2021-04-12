import {injectable} from "inversify";
import PouchDB from "../../infrastructure/pounchDB/pounchDB";

@injectable()
class ReplicationService {
    private isIndividual: boolean = false;
    private metaDatabase: any;
    private schemeDatabase: any;

    public ConnectMetaDatabase(metaDBConnectionString: string, token: string, isIndividual: boolean) {
        this.isIndividual = isIndividual;

        this.metaDatabase = new PouchDB(metaDBConnectionString,
            {
                jwtauth: {token: () => token},
                adapter: 'worker'
            });
    }

    public ConnectSchemeDatabase(schemeConnectionString: string, token: string) {
        this.schemeDatabase = new PouchDB(schemeConnectionString,
            {
                jwtauth: {token: () => token},
                adapter: 'worker'
            });
    }

    public async CloseAsync(): Promise<void> {
        await this.metaDatabase.close();
        await this.schemeDatabase.close();
    }
}

export default ReplicationService