import {UserMeta} from "../auth/UserMeta";
import {AppModule} from "../auth/AppModule";
import {UserScheme} from "../auth/UserScheme";
import {UserOrganization} from "../auth/UserOrganization";
import {UserSettings} from "../auth/UserSettings";

export interface OrganizationMetaDocument {
    organization: UserOrganization,
    members: UserMeta[],
    modules: AppModule[],
    schemes: UserScheme[],
    userSettings: { [userId: string]: UserSettings }
}