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

   const deploymentRowTable = (...args) =>{

       return async (dispatch)=>{

        dispatch({
            type: 'EDIT_DEPLOYMENT_RECORD',
            payload:{
                index:args[0],
                edit:args[1]
            }
        })
       }
   }

   const deploymentCreateRecords = (...args) =>{
       return async (dispatch)=>{
           dispatch({
            type:'CREATE_DEPLOYMENT_RECORD',
            payload:args[0]
           })

       }
   }
    export {getDeploymentRecords,postNewDeploymentRecords,deploymentRowTable,deploymentCreateRecords}
