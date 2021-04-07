import {setAuthUUID} from "./authStateManager";
import {nanoid} from "@reduxjs/toolkit";
import axios, {AxiosRequestConfig} from "axios";
import * as Querystring from "querystring";
import {keycloakUrl} from "../../config/auth.config";
import KcAdminClient from 'keycloak-admin';
import jwt_decode from "jwt-decode";
// or
// const KcAdminClient = require('keycloak-admin').default;

// To configure the client, pass an object to override any of these  options:
// {
//   baseUrl: 'http://127.0.0.1:8080/auth',
//   realmName: 'master',
//   requestConfig: {
//     /* Axios request config options https://github.com/axios/axios#request-config */
//   },
// }


export const authorizeUserAsync = async (login: string, password: string): Promise<void> => {

    //setup once
    //axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //axios.defaults.withCredentials = true;
    //    axios.defaults.baseURL = axiosDefaultConfiguration.baseUrl;
    //     axios.defaults.headers.Authorization = `Bearer ${UserService.getToken()}`


    const kcAdminClient = new KcAdminClient({
        realmName: "Aeroset",
        requestConfig : {
            paramsSerializer: function (params) {
                return Querystring.stringify(params)
            },
        }
    });

// Authorize with username / password
    await kcAdminClient.auth({
        username: login,
        password: password,
        grantType: 'password',
        clientId: 'aeroset-client',
        //totp: '123456', // optional Time-based One-time Password if OTP is required in authentication flow
    });

    const token = kcAdminClient.accessToken;
    console.log(token);

    const decodedToken = jwt_decode(token);
    // @ts-ignore
    const idUser : string = decodedToken.sub;

    const user = await kcAdminClient.users.findOne({
        id: idUser
    });

    console.log(user);

    // const authParams = {
    //     client_id: 'aeroset-client',
    //     username: login,
    //     password: password,
    //     grant_type: "password"
    // };
    //
    // try {
    //     const resp = axios.post(keycloakUrl,
    //         Querystring.stringify(authParams)
    //     ).then(console.log).catch(console.log);
    //
    //     //const cookie = resp.headers["set-cookie"][0]; // get cookie from request
    //     //console.log(cookie);
    // } catch (ex) {
    //     console.error(ex);
    // }
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
