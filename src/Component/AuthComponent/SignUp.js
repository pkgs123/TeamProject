import React, { useState } from 'react';
//import Base from '../core/Base';
import { Link } from 'react-router-dom';
//import {signUp} from '../auth/helper/index'
import { signUp } from '../AuthComponent/AuthAPI';
import AppBar from '../AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Tooltip } from '@material-ui/core';

import logo from '../../Images/jio.png';

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(8),
    //background:'transparent',
    // backgroundColor:'white',
    background: "transparent",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '400px',
    height: '407px',
    backgroundSize: 'cover'
  },
  avatar: {
    // margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    marginLeft: '41%'
  },
  form: {
    width: '100%',
    // height:'16%%', // Fix IE 11 issue.
    //marginTop: theme.spacing(1),
  },
  submit: {
    // margin: theme.spacing(3, 0, 2),
    marginTop: '0%'
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}







const Signup = () => {
  const classes = useStyles();
  const[unameDisplay,setUserNameDisplay] = useState(false);
  const[signText,setSignText] = useState('Sign in');
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    sucess: false
  });

  const { name, email, password, error, success } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }

  // const onSignUp = ()=>{
  //   // setUserNameDisplay(true);
  //   // setSignText('Sign up');
  // } 


  const onSignUp = event => {
    event.preventDefault();
    setUserNameDisplay(true);
    setSignText('Sign up');
    setValues({ ...values, error: false });
    signUp({ name, email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, sucess: false })
        } else {
          setValues({
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  const signUpForm = () => {

    return (
      <>
       <AppBar>
                <img alt="" src={logo} style={{marginLeft:'48%'}} width="40" height="40"></img>
            </AppBar>
        <Container component="main" maxWidth="xs" style={{ background: "transparent" }}>
          <CssBaseline />
          <div className={classes.paper}>
            <div style={{ width: '80%' }}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" style={{ marginLeft: '36%', color: 'white' }}>
                {signText}
        </Typography>
              {/* <form className={classes.form}> */}
              <div>
                {unameDisplay && <TextField
            style={{backgroundColor:'white'}}
           variant="outlined"
            margin="normal"
            placeholder="UserName"
            required
            fullWidth
            type="text"
             autoComplete="UserName"
             onChange={handleChange("name")}
          />
                }
                <TextField
                  style={{ backgroundColor: 'white' }}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  placeholder="Email Address"
                 // name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={handleChange("email")}
                />
                <TextField
                  style={{ backgroundColor: 'white' }}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  // name="password"
                  placeholder="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange("password")}
                />
                <Tooltip title="Sign In">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Continue
          </Button>
                </Tooltip>
                <br />
                <Tooltip title="Sign Up">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    style={{ marginTop: '4%' }}
                    onClick={onSignUp}
                  >
                    Sign Up
          </Button>
                </Tooltip>
              {/* </form> */}
              </div>
            </div>
          </div>
        </Container>
      </>
    )
  }

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div className="alert alert-success"
            style={{ display: success ? "" : "none" }}>
            Account Successfully Created . Please login <Link to="/signin">here</Link>
          </div>
        </div>
      </div>

    )
  }

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div className="alert alert-danger"
            style={{ display: error ? "" : "none" }}>
            {error}
          </div>
        </div>
      </div>
    )
  }


  return (
    <>
      <h1>
        {successMessage()}
        {errorMessage()}
        <br /><br />
        {signUpForm()}
      </h1>
    </>
  )
}


export default Signup;
