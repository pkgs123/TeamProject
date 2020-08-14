import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import logo from '../Images/jio.png';
function Header(props) {
    return (
        <>
            <AppBar style={{ backgroundColor: '#343434' }}>
                <Toolbar>
                    <img alt="" src={logo} width="30" height="30"></img><h4 style={{ marginLeft: '1%', fontStyle: "normal" }}>OneJio Team Dashboard</h4>
                </Toolbar>
            </AppBar>
        </>
    )
}
export default Header;