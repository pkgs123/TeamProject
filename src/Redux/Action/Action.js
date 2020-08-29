import {get,post,put} from '../../lib/api';
import {OneJio_Get_Deployment,OneJio_Post_Deployment,OneJio_Update_Deployment} from '../../configConstant/config';

const getDeploymentRecords = () => {

    return async (dispatch) => {
        let url = OneJio_Get_Deployment;
        let response = await get(url);
        dispatch({
            type: 'GET_DEPLOYMENT',
            payload: response.data
        })
    }
}

 const postNewDeploymentRecords = (payload) => {
     
     let url = OneJio_Post_Deployment;
     let response;

    return async (dispatch)=>{
        try{
             response = await post(url,payload);
            console.log("postResponse",response);
            dispatch({
                type: 'POST_DEPLOYMENT',
                payload: response
            })
        }
        catch(error){
            console.log("error",error);
        dispatch({
            type: 'POST_DEPLOYMENT',
            payload:error
        })
    }
    }
    }

const updateDeploymentRecord = (payload)=>{

    let url = OneJio_Update_Deployment;

    let response;

   return async (dispatch)=>{
       try{
            response = await put(url,payload);
           console.log("updateResponse",response);
           dispatch({
               type: 'UPDATE_DEPLOYMENT',
               payload: response
           })
       }
       catch(error){
           console.log("error",error);
       dispatch({
           type: 'UPDATE_DEPLOYMENT',
           payload:error
       })
   }
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

   const confirmDialogValue = (...args) =>{
       return async (dispatch)=>{
           dispatch({
               type:'CONFIRM_DIALOG_SETTING',
               payload:{
                   rowDeleteIndex:args[0],
                   dialogOpenValue:args[1]
               }
           })
       }
   }

   const successErrorDialog = (...args) =>{
       return async (dispatch)=>{
           dispatch({
               type:'SUCCESS_ERROR_SETTING',
               payload:args[0]
           })
       }
   }



    export {getDeploymentRecords,postNewDeploymentRecords,deploymentRowTable,
        deploymentCreateRecords,confirmDialogValue,successErrorDialog,updateDeploymentRecord}
