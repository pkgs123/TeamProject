let initialState = {
    deploymentRecords :[],
    countScm : 0,
    countDsm :0,
    countFiori :0,

    confirmDialogOptions:{},
    deploymentPostResponse:[],
    successErrorDialogValue:false,
    updateResponse:[],
    deleteResponse:[],
    signUpErrorDialogValue:false,
    signUpSuccessDialogValue:false,
    authenticateEnableDisable:false,
    downloadData:{}
}

const findDeploymentRecords = (state, action) => {
    let arr = action.payload, countDSM = 0 ,countSCM = 0 , countFiori = 0 ;
    for(let i= 0 ;i <arr.length;i++){
        if(arr[i].AppName==="DSM"){
            countDSM++ ;
        }
        else if(arr[i].AppName==="SCM"){
            countSCM++ ;
        }
        else if(arr[i].AppName === "FIORI"){
            countFiori++;
        }
    }
    return {
        ...state,
        deploymentRecords: action.payload,
        countScm : countDSM,
        countDsm : countSCM ,
        countFiori : countFiori ,
    }
}
const setDeploymentRecordValue = (state,action)=>{
    let arr = state.deploymentRecords;
  
    for(let i = 0; i<arr.length; i++){
        arr[i].edit = false;
    }

    arr[action.payload.index].edit = action.payload.edit
    return{
        ...state,
        deploymentRecords:arr
    }
}

const createEmptyDeploymentRecord = (state,action) =>{

    let dataArray = state.deploymentRecords;

    dataArray.unshift(action.payload);
    console.log("dataArray",dataArray)

    return{
            ...state,
            deploymentRecords:dataArray

    }
}
const setUpdateResponse = (state,action) =>{
    return{
        ...state,
        updateResponse:action.payload
    }
}
const setDeleteResponse =(state,action)=>{
    return{
        ...state,
        deleteResponse:action.payload
    }
}
const setConfirmDialogValue = (state,action) =>{
    return{
        ...state,
        confirmDialogOptions:action.payload
    }
}
const setPostDeploymentRecords = (state,action) =>{
    return{
        ...state,
        deploymentPostResponse: action.payload
    }
}
const setSuccessErrorDialogValue = (state,action) =>{
    return{
        ...state,
        successErrorDialogValue: action.payload
    }
}
const setSignUPErrorDiaLog = (state,action)=>{
    return{
        ...state,
        signUpErrorDialogValue:action.payload
    }
}
const setSignUpSuccessLog = (state,action)=>{
    return{
        ...state,
        signUpSuccessDialogValue:action.payload
    }
}
const setAuthenticationPage = (state,action)=>{
    return{
        ...state,
        authenticateEnableDisable:action.payload
    }
}
const getDownloadData = (state,action)=>{
    return{
        ...state,
        downloadData:action.payload
    }
}
const deployment = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_DEPLOYMENT':
            return findDeploymentRecords(state, action);
        case 'EDIT_DEPLOYMENT_RECORD':
            return setDeploymentRecordValue(state,action);
        case 'CREATE_DEPLOYMENT_RECORD':
            return createEmptyDeploymentRecord(state,action);
        case 'CONFIRM_DIALOG_SETTING':
              return setConfirmDialogValue(state,action);
        case 'POST_DEPLOYMENT':
              return setPostDeploymentRecords(state,action);
        case 'SUCCESS_ERROR_SETTING':
              return setSuccessErrorDialogValue(state,action);
        case 'UPDATE_DEPLOYMENT':
              return setUpdateResponse(state,action);
        case 'DELETE_DEPLOYMENT':
              return setDeleteResponse(state,action);
        case 'SIGNUP_ERROR_DIALOG':
            return setSignUPErrorDiaLog(state,action);
        case 'SIGNUP_SUCCESS_DIALOG':
            return setSignUpSuccessLog(state,action);
        case 'SHOULD_AUTHENTICATE':
             return setAuthenticationPage(state,action);
        case 'DOWNLOAD_REPORT':
             return getDownloadData(state,action);
        default: return state;
    }
}

export default deployment;