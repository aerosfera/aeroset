import AeroUser from "../../data/auth/AeroUser";
import {UserStatus} from "../../data/auth/UserStatus";
import {BehaviorSubject} from "rxjs";
import {setAuthUser} from "../../store/auth/authReducer";
import {store} from "../../store/store";
import UserRepresentation from "keycloak-admin/lib/defs/userRepresentation";
import IoC from "../../infrastructure/ioc/IoC";
import ReplicationService from "../../services/replicationService/ReplicationService";
import {REPLICATION_SERVICE} from "../../infrastructure/ioc/ServiceTypes";
import {META_DB_CONNECTION_STRING} from "../../config/connection";

const userBehaviorObserver = async (user: AeroUser) => {
    const replicationService = IoC.get<ReplicationService>(REPLICATION_SERVICE);

    switch (user.status) {
        case UserStatus.SignedIn:
            const userAttributes: Record<string, any> = (<UserRepresentation>user.userInfo).attributes as Record<string, any>;
            const organization: string = userAttributes['organization'];
            const database: string = userAttributes['database'];

            const isIndividual = organization === "individual";
            const userDocumentName: string = userAttributes['userDocumentName'];

            await replicationService.ConnectMetaDatabaseAsync(`${META_DB_CONNECTION_STRING}/${database}`, <string>user.token, isIndividual, userDocumentName);

            store.dispatch(setAuthUser(user));
            console.log("User status - SignedIn");
            break;
        case UserStatus.SignedOut:
            store.dispatch(setAuthUser(null));
            await replicationService.CloseAsync();


            console.log("User status - SignedOut");
            break;
        default:
            console.log("User status - Unknown");
            break;
    }
};

export const userBehaviorSubject = new BehaviorSubject<AeroUser>(new AeroUser(undefined));
userBehaviorSubject.subscribe(userBehaviorObserver);
