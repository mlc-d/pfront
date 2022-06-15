import {token} from "../stores/auth.js";
import jwt_decode from "jwt-decode";
import {active_user_id, authenticated, rol, username} from "../stores/session.js";


const refreshToken = async () => {
    const res = await fetch('http://localhost:1998/refresh', {
        method: 'POST',
        credentials: 'include'
    });
    const data = await res.json();
    token.set(data.accToken);
    return data.accToken
}

let baseURL = 'http://localhost:1998'

let originalRequest = async (url, config)=> {
    url = `${baseURL}${url}`
    let response = await fetch(url, config)
    let data = await response.json()
    return {response, data}
}

let apiFetch = async (url, config={}, tk) => {
    config['headers'] = {
        'accessToken': tk,
        'Content-type': 'application/json'
    }
    let {response, data} = await originalRequest(url, config)
    if (response.status === 401){
        tk = await refreshToken();
        config['headers'] = {
            'accessToken': tk
        }
        let newResponse = await originalRequest(url, config);
        response = newResponse.response;
        data = newResponse.data;

        username.set(jwt_decode(tk)["sub"]);
        rol.set(jwt_decode(tk)["rol"]);
        active_user_id.set(jwt_decode(tk)["uid"]);
        authenticated.set(true);
    }
    return {response, data}
}

export {apiFetch};