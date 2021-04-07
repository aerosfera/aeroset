import {setAuthUUID} from "./authStateManager";
import {nanoid} from "@reduxjs/toolkit";
import PouchDB from 'pouchdb';
import axios from "axios";


export const authorizeUserAsync = async (login: string, password: string): Promise<void> => {

    //setup once
    // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // axios.defaults.headers.common['Accept'] = 'application/json';
    //axios.defaults.withCredentials = true;

    const authParams = {
        name : login,
        password: password
    };

    try {
        const resp = await axios.post("http://127.0.0.1:5984/_session", authParams);
        console.log(resp);

        //const cookie = resp.headers["set-cookie"][0]; // get cookie from request
        //console.log(cookie);
    }
    catch (ex){
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
