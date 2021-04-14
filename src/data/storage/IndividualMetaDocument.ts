import {UserMeta} from "../auth/UserMeta";
import {FamiliarUser} from "../auth/FamiliarUser";
import {AppModule} from "../auth/AppModule";
import {UserScheme} from "../auth/UserScheme";
import {UserSettings} from "../auth/UserSettings";

export interface IndividualMetaDocument {
    user: UserMeta,
    familiarUsers: FamiliarUser[],
    modules: AppModule[],
    schemes : UserScheme[],
    settings : UserSettings
}