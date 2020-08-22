import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import logo from '../Images/jio.png';
function Header(props) {
    return (
        <>
            <AppBar style={{ backgroundColor: '#343434' }}>
                <Toolbar>
                    {props.children}
                </Toolbar>
            </AppBar>
        </>
    )
}
export default Header;