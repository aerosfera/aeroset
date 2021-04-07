import {setAuthUUID} from "./authStateManager";
import {nanoid} from "@reduxjs/toolkit";
import axios from "axios";
import * as Querystring from "querystring";

export const authorizeUserAsync = async (login: string, password: string): Promise<void> => {

    //setup once
    //axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //axios.defaults.withCredentials = true;
    //    axios.defaults.baseURL = axiosDefaultConfiguration.baseUrl;
    //     axios.defaults.headers.Authorization = `Bearer ${UserService.getToken()}`

    const authParams = {
        client_id: 'aeroset-client',
        username: login,
        password: password,
        grant_type: "password"
    };

    try {
        const resp = axios.post("http://localhost:8080/auth/realms/Aeroset/protocol/openid-connect/token",
            Querystring.stringify(authParams)
        ).then(console.log).catch(console.log);

        //const cookie = resp.headers["set-cookie"][0]; // get cookie from request
        //console.log(cookie);
    } catch (ex) {
        console.error(ex);
    }
    //axiosInstance.defaults.headers.Cookie = cookie;   // attach

    // axios.get('http://localhost:5984', {
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         'Accept': 'application/json'
    //     }
    // })

    //Todo: authorize
    setAuthUUID(nanoid(10));

    return Promise.resolve();
}
