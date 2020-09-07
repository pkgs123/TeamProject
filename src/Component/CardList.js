import React, { Component } from 'react';
import { Card, CardActions, CardContent, Typography, withStyles,Tooltip } from '@material-ui/core';
import { isAuthenticated,signout} from './AuthComponent/AuthAPI';
import history from '../History';
import { Link } from 'react-router-dom';
import AppBar from './AppBar';
import logo from '../Images/jio.png';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
const styles = theme => ({
    Card1: {
        minWidth: '312px',
        minHeight: '121px',
        display: 'inline-block',
        marginTop: '5%',
        //margin: '0 2px',
        transform: 'scale(0.8)',
        backgroundColor: '#808000',
        borderColor: '#808000'
    },
    Card2: {
        minWidth: '312px',
        minHeight: '121px',
        display: 'inline-block',
        marginTop: '5%',
        //margin: '0 2px',
        transform: 'scale(0.8)',
        backgroundColor: '#db4437',
        borderColor: '#db4437'
    },
    Card3: {
        minWidth: '312px',
        minHeight: '121px',
        display: 'inline-block',
        marginTop: '5%',
        //margin: '0 2px',
        transform: 'scale(0.8)',
        backgroundColor: '#673ab7',
        borderColor: '#673ab7'

    },
    Card4: {
        minWidth: '312px',
        minHeight: '121px',
        display: 'inline-block',
        marginTop: '5%',
        //margin: '0 2px',
        transform: 'scale(0.8)',
        backgroundColor: '#e91e63',
        borderColor: '#e91e63'
    },
    Card5: {
        minWidth: '312px',
        minHeight: '121px',
        display: 'inline-block',
        marginTop: '1%',
        //margin: '0 2px',
        transform: 'scale(0.8)',
        backgroundColor: '#008080',
        borderColor: '#008080'
    },
    Card6: {
        minWidth: '312px',
        minHeight: '121px',
        display: 'inline-block',
        marginTop: '1%',
        //margin: '0 2px',
        transform: 'scale(0.8)',
        backgroundColor: '#092756',
        borderColor: '#092756'
    },
    cardTitle1: {
        marginTop: '10%',
        marginLeft: '11%',
        fontSize: 'larger',
        color: '#fff!important'
    }

})

class CardListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cardList: [{ title: 'Deployment Report' }, { title: 'Application Report' }, { title: 'CodeReview Report' }]
        }
    }

    componentDidMount(){
        if(isAuthenticated()){
        //  JSON.parse(localStorage.getItem('token')).user.email
        //   this.props.signedInUser()
        }
        else{
            history.push('/');
        }
    }

    onSignOut = () =>{
        signout()
        .then((response)=>{
               console.log("SignedOut",response);
               history.push('/');
        })
        .catch((error)=>{
            console.log("signedOutError",error);
        })
    }
    render() {
        const { classes } = this.props;
        return (
            <>
                <AppBar>
                    <img alt="" src={logo} width="30" height="30"></img>
                    <h4 style={{ marginLeft: '1%', fontStyle: "normal" }}>OneJio Team Dashboard</h4>
                  
                    <span style={{marginLeft:'55%'}}>
                        <span>| </span>
                        <span style={{color:"#fcfcfc"}}>{localStorage.getItem('token')!==null && JSON.parse(localStorage.getItem('token')).user.email}</span>
                        <span> |</span>
                    </span>
                       <span style={{marginLeft:'5%'}}><Tooltip title="Logout"><ExitToAppIcon style={{fontSize:'medium',marginLeft:'228%',cursor:'pointer'}} onClick={this.onSignOut}></ExitToAppIcon></Tooltip></span>
                       <span style={{fontSize: 'small',marginLeft: '3%',fontStyle: 'normal'}}>LOGOUT</span>
                      
                </AppBar>
                <Link to='/deployment'>
                    <Card className={classes.Card1}>
                        <CardContent>
                            <Typography className={classes.cardTitle1}>
                                Deployment Report
                    </Typography>
                        </CardContent>
                        <CardActions>
                        </CardActions>
                    </Card>
                </Link>

                <Link to="/codereview">
                    <Card className={classes.Card2}>
                        <CardContent>
                            <Typography className={classes.cardTitle1}>
                                {/* CodeReview Report */}
                                Azue Pipeline Report
                    </Typography>
                        </CardContent>
                        <CardActions>
                        </CardActions>
                    </Card>
                </Link>

                <Link to="/testReport">
                    <Card className={classes.Card6}>
                        <CardContent>
                            <Typography className={classes.cardTitle1}>
                               Replica/UAT-Test Report
                    </Typography>
                        </CardContent>
                        <CardActions>
                        </CardActions>
                    </Card>
                </Link>

                <Link to="/dsmreport">
                    <Card className={classes.Card3}>
                        <CardContent>
                            <Typography className={classes.cardTitle1}>
                                DSM Report
                    </Typography>
                        </CardContent>
                        <CardActions>
                        </CardActions>
                    </Card>
                </Link>
                <Link to="/screport">
                    <Card className={classes.Card4}>
                        <CardContent>
                            <Typography className={classes.cardTitle1}>
                                SCM Report
                    </Typography>
                        </CardContent>
                        <CardActions>
                        </CardActions>
                    </Card>
                </Link>
                <Link to="/marcomreport">
                    <Card className={classes.Card5}>
                        <CardContent>
                            <Typography className={classes.cardTitle1}>
                                MARCOM Report
                    </Typography>
                        </CardContent>
                        <CardActions>
                        </CardActions>
                    </Card>
                </Link>

            
            </>
        )
    }
}
export default withStyles(styles)(CardListComponent);