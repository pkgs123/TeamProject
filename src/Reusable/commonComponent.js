import React,{Component} from 'react';
import {Paper,Grid} from '@material-ui/core';
import CancelButton from '../Reusable/Cancel';
class CommonComponent extends Component{
    render(){
        return(
            <>
            <Grid container>
            <Paper style={{
                minHeight: '515px',
                //  minWidth: '315px',
                display: 'inline-block',
                width: '100%',
                marginTop: '5%',
            }}>
              <CancelButton/>  
            <p style={{color:'red',textAlign:'center',marginTop:'12%',fontSize:'xx-large'}}>Coming Soon..........</p>
            </Paper>
            </Grid>
            </>
        )
    }
}
export default CommonComponent;