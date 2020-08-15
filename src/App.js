import React from 'react';
import {Grid} from '@material-ui/core';
import AppBar from './Component/AppBar';
import Footer from './Component/Footer';
import CardList from './Component/CardList';


function App(props){
return(
    <>
   <AppBar/>
   <Footer/>
   <Grid container>
       <Grid item>
       <CardList/>
       </Grid>
   </Grid>
   
    </>
)
}
export default App;