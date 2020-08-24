let initialState = {
    deploymentRecords :[]

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