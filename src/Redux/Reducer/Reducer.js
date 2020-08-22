let initialState = {
    deploymentRecords :[]
}

const findDeploymentRecords = (state, action) => {
    return {
        ...state,
        deploymentRecords: action.payload
    }
}

const deployment = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_DEPLOYMENT':
            return findDeploymentRecords(state, action);
            break;
        default: return state;
    }
}

export default deployment;