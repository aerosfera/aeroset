import {injectable} from "inversify";
import PouchDB from "../../infrastructure/pounchDB/pounchDB";

@injectable()
class ReplicationService {
    private isIndividual: boolean = false;

    private metaDatabase: any;
    private schemeDatabase: any;

    public async ConnectMetaDatabaseAsync(metaDBConnectionString: string, token: string, isIndividual: boolean): Promise<void> {
        this.isIndividual = isIndividual;

        await this.CloseAsync();

        this.metaDatabase = new PouchDB(metaDBConnectionString,
            {
                jwtauth: {token: () => token},
                adapter: 'worker'
            });
    }

    public async ConnectSchemeDatabaseAsync(schemeConnectionString: string, token: string): Promise<void> {
        if (this.schemeDatabase) {
            await this.schemeDatabase.close();
        }

        this.schemeDatabase = new PouchDB(schemeConnectionString,
            {
                jwtauth: {token: () => token},
                adapter: 'worker'
            });
    }

    public async CloseAsync(): Promise<void> {
        let p1;
        if (this.metaDatabase)
            p1 = this.metaDatabase.close();

        let p2;
        if (this.schemeDatabase)
            p2 = this.schemeDatabase.close();

        await Promise.all([p1, p2]);
    }
}

export default ReplicationService