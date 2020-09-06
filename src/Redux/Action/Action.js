import {get,post,put,remove} from '../../lib/api';
import {OneJio_Get_Deployment,OneJio_Post_Deployment,
    OneJio_Update_Deployment,OneJio_Delete_Deployment,OneJio_Download_Report} from '../../configConstant/config';

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

const deleteDeploymentRecord = (payload)=>{
    let url = OneJio_Delete_Deployment;

    let response;

   return async (dispatch)=>{
       try{
            response = await remove(url,payload);
           console.log("deleteResponse",response);
           dispatch({
               type: 'DELETE_DEPLOYMENT',
               payload: response
           })
       }
       catch(error){
           console.log("error",error);
       dispatch({
           type: 'DELETE_DEPLOYMENT',
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

 const setSignUpErrorDialog =(...args)=>{
     return async(dispatch)=>{
         dispatch({
             type:'SIGNUP_ERROR_DIALOG',
             payload:args[0]
         })
     }
 }

 const setSignUpSuccessDialog = (...args)=>{
     return async(dispatch) =>{
         dispatch({
             type:'SIGNUP_SUCCESS_DIALOG',
             payload:args[0]
         })
     }
 }
 
 const shouldAuthenticate = (...args)=>{
    return async(dispatch) =>{
        dispatch({
            type:'SHOULD_AUTHENTICATE',
            payload:args[0]
        })
    }
}

const downloadReport = ()=>{

    return async (dispatch) =>{
    let url = OneJio_Download_Report;
    let response = await get(url);
    
    let link = document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + response); 
    link.setAttribute('download', 'download.csv');
    document.body.appendChild(link);
    link.click();
    dispatch({
        type: 'DOWNLOAD_REPORT',
        payload: response
    })
}
}

    export {getDeploymentRecords,postNewDeploymentRecords,deploymentRowTable,
        deploymentCreateRecords,confirmDialogValue,
        successErrorDialog,updateDeploymentRecord,
        deleteDeploymentRecord,setSignUpErrorDialog,setSignUpSuccessDialog,shouldAuthenticate,downloadReport}
