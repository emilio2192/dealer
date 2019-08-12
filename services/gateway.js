import SERVER from "../constants/Server";
import { AsyncStorage } from 'react-native';

const gateway = async (path, method = 'GET', body, token = true) => {
    try {
        let headers = SERVER.headers;
        if (token) {
            let token = 'Bearer ' + await AsyncStorage.getItem('token');
            token = token.replace(/['"]+/g, '');
            headers['Authorization'] = token;
        }
        const response = await fetch(SERVER.domain + path, {
            method,
            headers,
            body: JSON.stringify(body)
        });
        const responseJson = await response.json();
        return responseJson;
    } catch (e) {
        return Promise.reject(e);
    }
}

export {
    gateway
}