import React from 'react';
import CardList from './Component/CardList';
import {HashRouter,Route} from 'react-router-dom';
import Deployment from './Component/DeploymentReport';
import CodReview from './Component/CodeReview';
import DsmReport from './Component/DsmReport';
import ScmReport from './Component/ScmReport';
import MarcomReport from './Component/Marcom';
import signUp from './Component/AuthComponent/SignUp';
//import signIn from './Component/AuthComponent/SignIn';
import history from './History';
import {connect} from 'react-redux';
//import {shouldAuthenticate} from './Redux/Action/Action';
function Routes(props){
   const {authInd} = props;
return(
<>
<HashRouter history={history}>
   
   {/* <Route path="/signup" component={signIn} exact>
   </Route> */}

   <Route path="/" component={signUp} exact>
   </Route>
   <Route path="/applist" component={CardList} exact>
   </Route>
   <Route path="/deployment" component={Deployment} exact/>
   <Route path="/codereview" component={CodReview} exact/>
   <Route path="/dsmreport" component={DsmReport} exact/>
   <Route path="/screport" component={ScmReport} exact/>
   <Route path="/marcomreport" component={MarcomReport} exact/>
</HashRouter>
</>

)
}

export default (Routes);