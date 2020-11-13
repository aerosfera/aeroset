import {injectable} from "inversify";
import {build} from '../../metadata.json';
import moment from "moment/moment";

@injectable()
class VersionService {
    private static _version: string = "None";

    constructor() {
        this.Initialize()
    }

    private async Initialize() {
        const year = moment().year()
        const month = moment().month() + 1
        VersionService._version = `${year}.${month}.${build}`
    }

    public GetVersion(): string {
        return VersionService._version
    }
}

export default VersionService;