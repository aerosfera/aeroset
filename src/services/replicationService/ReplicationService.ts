import {injectable} from "inversify";
import PouchDB from "../../infrastructure/pounchDB/pounchDB";

@injectable()
class ReplicationService {
    private metaDataBase: any;

    public setMetaDataBaseConnectionString(metaDBConnectionString: string, token: string) {
        this.metaDataBase = new PouchDB(metaDBConnectionString,
            {
                jwtauth: {token: () => token},
                adapter: 'worker'
            });
    }

    public CleanUp() {
        //cleanUp metaDataBase
    }
}

export default ReplicationService