import React from 'react';
import CardList from './Component/CardList';
import {HashRouter,Route} from 'react-router-dom';
import Deployment from './Component/DeploymentReport';
import CodReview from './Component/CodeReview';
import DsmReport from './Component/DsmReport';
import ScmReport from './Component/ScmReport';
import MarcomReport from './Component/Marcom';
import history from './History';
function App(props){
return(
    <>
   <HashRouter history={history}>
       <Route path="/" component={CardList} exact>
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
export default App;