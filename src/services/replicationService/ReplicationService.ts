import {injectable} from "inversify";
import PouchDB from "../../infrastructure/pounchDB/pounchDB";

@injectable()
class ReplicationService {
    private metaDataBase: any;

    public setMetaDatabaseConnectionString(metaDBConnectionString: string, token: string) {
        this.metaDataBase = new PouchDB(metaDBConnectionString,
            {
                jwtauth: {token: () => token},
                adapter: 'worker'
            });
    }

    public async CleanUp(): Promise<void> {
        await this.metaDataBase.close();
    }
}

export default ReplicationService