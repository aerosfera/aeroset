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
        const currentMonth = moment().month() + 1
        let month = 0;
        if(currentMonth <= 3)
        {
            month = 1;
        }
        if(currentMonth <= 6)
        {
            month = 2;
        }
        if(currentMonth <= 9)
        {
            month = 3;
        }
        if(currentMonth <= 12)
        {
            month = 4;
        }
        VersionService._version = `${year}.${month}.${build}`
    }

    public GetVersion(): string {
        return VersionService._version
    }
}

export default VersionService;