import {SchemeModelType} from "../../views/types/SchemeModelType";
import _ from 'lodash';

const defineModelTypeById = (schemeId: string | null): SchemeModelType => {
    if (schemeId == null) {
        return SchemeModelType.None;
    }

    if (_.startsWith(schemeId, 'prs')) {
        return SchemeModelType.Pressure;
    }
    if (_.startsWith(schemeId, 'air')) {
        return SchemeModelType.Air;
    }

    return SchemeModelType.None;
}

export default defineModelTypeById;