import React from 'react';
import { AppBar, withStyles,Toolbar, Button } from '@material-ui/core';

const style = theme => ({
    footerBar: {
        backgroundColor: 'blue',
        top: 'auto',
        bottom: 0,
        right: 0,
        //height:'56px',
        // lineHeight:'55px',
        position: 'absolute'
    }
})

function Footer(props) {
    const { classes } = props;
    return (
        <>
            <AppBar className={classes.footerBar} position="fixed">
             <Toolbar>
             {props.children}
             <Button style={{ backgroundColor:'black',color:'red'}}>Back</Button>
             </Toolbar>
            
                {/* <p style={{ marginLeft: '45%',color:'white',fontStyle:'x-large'}}>{ `@Desgin & Developed by Prashant and Team`}</p> */}
               
            </AppBar>



        </>
    )
}
export default withStyles(style)(Footer);