import React from 'react';
import {AppBar} from '@material-ui/core';
function Footer(props){
    return(
        <>
        <AppBar>
        <AppBar style={{ backgroundColor: '#6c757d !important' }}>
                <Toolbar>
                    <img src={logo} width="30" height="30"></img><h4 style={{ marginLeft: '1%', fontStyle: "normal" }}>OneJio Team Dashboard</h4>
                </Toolbar>
            </AppBar>
        </AppBar>

        </>
    )
}