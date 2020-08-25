let initialState = {
    deploymentRecords :[],
    countScm : 0,
    countDsm :0,
    countFiori :0

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
const deployment = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_DEPLOYMENT':
            return findDeploymentRecords(state, action);
        case 'EDIT_DEPLOYMENT_RECORD':
            return setDeploymentRecordValue(state,action);
        default: return state;
    }
}

export default deployment;