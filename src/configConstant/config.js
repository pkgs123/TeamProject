export const runLocally = () => (window.location.hostname && /^localhost$/.test(window.location.hostname));
const HOST_URL = (runLocally()? 'http://localhost:8000' : 'http://jmngd1bag050v07.bss.dev.jio.com');
const URL1 = HOST_URL + '/api/onejioteam/';

export const OneJio_Get_Deployment = URL1 + 'getDeployments';
export const OneJio_Post_Deployment = URL1 + 'postDeployment';
export const OneJio_Update_Deployment = URL1 + 'updateDeploymentRecord';
export const OneJio_Delete_Deployment = URL1 + 'deleteDeploymentRecord';