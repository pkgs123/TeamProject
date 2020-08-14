import React from 'react';
import { AppBar, Toolbar, withStyles } from '@material-ui/core';

const style = theme => ({
    footerBar: {
        backgroundColor: '#343434',
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
                {/* <Toolbar style={{ marginLeft: '45%', fontStyle: "normal",color:'#6c757d!important'}}>
                   { `Desgin & Developed by Prashant Singh`}
                </Toolbar> */}
                <h6 style={{ marginLeft: '45%',color:'#6c757d',fontStyle:'italic'}}>{ `@Desgin & Developed by Prashant Singh`}</h6>
            </AppBar>


        </>
    )
}
export default withStyles(style)(Footer);