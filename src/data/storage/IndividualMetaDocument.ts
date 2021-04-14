import {UserMeta} from "../auth/UserMeta";
import {FamiliarUser} from "../auth/FamiliarUser";
import {AppModule} from "../auth/AppModule";
import {UserScheme} from "../auth/UserScheme";

export interface IndividualMetaDocument {
    user: UserMeta,
    familiarUsers: FamiliarUser[],
    modules: AppModule[],
    schemes : UserScheme[]
}