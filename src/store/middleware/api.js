import axios from "axios";
import {apiCall} from "../api";


const api = ({dispatch}) => (next) => (action) => {
    if (action.type !== apiCall.type) {
        next(action);
        return;
    }
    next(action)
    const {url, method, onSuccess, onFail, data} = action.payload
    let token = localStorage.getItem('accessToken')

    let headers = token ? {'Authorization': 'Bearer ' + token} : ''

    axios({
        baseURL:'http://reactive-mockaroo.us-east-1.elasticbeanstalk.com/api/',
        // baseURL: 'http://localhost:8080/api/',
        url,
        method,
        data,
        headers
    }).then(res => {
        dispatch({
            type: onSuccess,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: onFail,
            payload: err.response.data
        })
    })
}

export default api;