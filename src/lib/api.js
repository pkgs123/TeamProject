import axios from 'axios';

const apiCall = async (url, method, payload) => {

    let params = {
        url: url
    };
    if (method) {
        params.method = method;
    }
    if (payload) {
        params.data = payload;
    }

    const response = await axios(url, params);
    return response;
}

export async function get(url) {
    return apiCall(url);
}

export async function post(url, payload) {
    return apiCall(url, 'POST', payload);
}
