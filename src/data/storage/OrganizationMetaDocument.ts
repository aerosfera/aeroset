import {UserMeta} from "../auth/UserMeta";
import {AppModule} from "../auth/AppModule";
import {UserScheme} from "../auth/UserScheme";
import {UserOrganization} from "../auth/UserOrganization";

export interface OrganizationMetaDocument{
    organization: UserOrganization,
    members: UserMeta[],
    modules: AppModule[],
    schemes : UserScheme[]
}