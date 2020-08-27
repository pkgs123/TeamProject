let initialState = {
    deploymentRecords :[],
    confirmDialogOptions:{},
    deploymentPostResponse:[],
    successErrorDialogValue:false
}

const findDeploymentRecords = (state, action) => {
    return {
        ...state,
        deploymentRecords: action.payload
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
        default: return state;
    }
}

export default deployment;