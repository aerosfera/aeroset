import {META_DB_CONNECTION_STRING} from "../../config/connection";
import IoC from "../../infrastructure/ioc/IoC";
import {EVENT_BUS_SERVICE, REPLICATION_SERVICE} from "../../infrastructure/ioc/ServiceTypes";
import ReplicationService from "../../services/replicationService/ReplicationService";

export function initializeInfrastructureServices(organization: string, token: string){
    const replicationService = IoC.get<ReplicationService>(REPLICATION_SERVICE);

    replicationService.setMetaDataBaseConnectionString(`${META_DB_CONNECTION_STRING}/${organization}`, token);
}