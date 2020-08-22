import {get,post} from '../../lib/api';
import {OneJio_Login} from '../../configConstant/config';

const getDeploymentRecords = () => {

    return async (dispatch) => {
        let url = OneJio_Login;
        let response = await get(url);
        dispatch({
            type: 'GET_DEPLOYMENT',
            payload: response.data
        })
    }
}

 const postNewDeploymentRecords = (url) => {
     let payload = {};
    return async (dispatch)=>{
        let response = await post(url,payload)
        dispatch({
            type: 'POST_DEPLOYMENT',
                payload: response
        })
    }

    }

    export {getDeploymentRecords,postNewDeploymentRecords}
