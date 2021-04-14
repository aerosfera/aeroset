import {AppModule} from "./AppModule";

export interface UserMeta {
    id: string,
    name: string,
    surname: string,
    email: string,
    photo_url : string,
    modules: AppModule[]
}