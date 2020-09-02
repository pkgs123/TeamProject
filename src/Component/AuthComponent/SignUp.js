import React, { useState } from 'react';
//import Base from '../core/Base';
import { Link, Redirect } from "react-router-dom";
//import {signUp} from '../auth/helper/index'
import { signUp,signIn,isAuthenticated, authenticateUser } from '../AuthComponent/AuthAPI';
import AppBar from '../AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// //import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Tooltip } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import logo from '../../Images/jio.png';
import {connect} from 'react-redux';
import {setSignUpErrorDialog,setSignUpSuccessDialog} from '../../Redux/Action/Action';
//import signInForm from '../AuthComponent/SignIn';
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
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  avatar: {
  margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    marginLeft: '41%'
  },
  form: {
    width: '100%',
    // height:'16%%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    marginTop: '0%'
  },
}));

const Signup = (props) => {
  const classes = useStyles();
  const[unameDisplay,setUserNameDisplay] = useState(false);
  const[signText,setSignText] = useState('Sign in');
  const [show, setShow] = useState(false);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",            
    sucess: false,
    errorValue:false,
    loading: false,
		didRedirect: false,
  });

  const[close,onClose]=useState(true);
  const { name, email, password, error,sucess,errorValue,loading, didRedirect  } = values;
  const { user } = isAuthenticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }

  const onSignUp = event => {

    event.preventDefault();
    if(name === "" || email === "" || password === ""){
      props.setSignUpSuccessDialog(false);
      setUserNameDisplay(true);
      setSignText('Sign up');
      return;
    }
    setValues({ ...values, error: false });
    signUp({ name, email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, sucess: false,errorValue:true })
          props.setSignUpErrorDialog(errorValue);
        } else {
         
          setValues({
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
            errorValue:false
          })
          props.setSignUpSuccessDialog(true);
          setUserNameDisplay(false);
          setSignText('Sign in');
        }
      })
      .catch(error => {
        console.log(error)
      })
    
    
     
  }

	const onSignIn = (event) => {
    event.preventDefault();
    if(email === "" || password === ""){
      props.setSignUpSuccessDialog(false);
      setUserNameDisplay(false);
      setSignText('Sign in');
      return;
    }


		setValues({ ...values, error: false, loading: true });
		signIn({ email, password })
			.then((data) => {
				if (data.error) {
          setValues({ ...values, error: data.error, loading: false,errorValue:true });
          props.setSignUpErrorDialog(errorValue);
				} else {
          props.setSignUpSuccessDialog(true);
					authenticateUser(data, () => {
						setValues({ ...values, didRedirect: true });
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

  const loadingMessage = () => {
		return (
			loading && (
				<div className="alert alert-info">
					<h2>Loading...</h2>
				</div>
			)
		);
	};


	const redirect = () => {
		if (didRedirect) {
      return <Redirect to="/applist"></Redirect>;
		}

		if (isAuthenticated()) {
			return <Redirect to="/applist"></Redirect>;
		}
	};

  const handleErrorDialogClose = () =>{
    props.setSignUpErrorDialog(false);
  }
  const handleSuccessDialogClose = () =>{
    props.setSignUpSuccessDialog(false);
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
              <form className={classes.form} noValidate>
              {/* <div> */}
                {unameDisplay && <TextField
            style={{backgroundColor:'white'}}
           variant="outlined"
            margin="normal"
            placeholder="UserName"
            required
            fullWidth
            type="text"
            name="UserName"
             autoComplete="UserName"
             autoFocus
             value={name}
             onChange={handleChange("name")}
          />
                }
                <TextField
                  style={{ backgroundColor: 'white' }}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                 // id="email"
                  placeholder="Email Address"
                 name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={handleChange("email")}
                />
                <TextField
                  style={{ backgroundColor: 'white' }}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                   name="password"
                  placeholder="Password"
                  type="password"
                 // id="password"
                  autoComplete="current-password"
                  autoFocus
                  value = {password}
                  onChange={handleChange("password")}
                />
                <Tooltip title="Sign In">
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    style={{ marginTop: '4%' }}
                   onClick={onSignIn}
                  >
                    Continue
          </Button>
                </Tooltip>
                <br />
                <Tooltip title="Sign Up">
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    style={{ marginTop: '4%' }}
                    onClick={onSignUp}
                  >
                    Sign Up
          </Button>
                </Tooltip>
              </form>
              {/* </div> */}
            </div>
          </div>
        </Container>
      </>
    )
  }

  const successMessage = () => {
    
    return (
   
      <div className={classes.root}>
      <Snackbar open={props.signUpDialogSuccessDisplay} autoHideDuration={6000}  onClose={handleSuccessDialogClose}>
            <MuiAlert elevation={6} variant="filled" onClose={handleSuccessDialogClose} severity="success">
            Account Successfully Created .
            </MuiAlert>
      </Snackbar>
    </div>
         
    )
  }

  const errorMessage = () => {
    return (

      <div className={classes.root}>
      <Snackbar open={props.signUpDialogErrorDisplay} autoHideDuration={6000} onClose={handleErrorDialogClose}>
            <MuiAlert elevation={6} variant="filled"  onClose={handleErrorDialogClose} severity="error">
           {error}
            </MuiAlert>
        
      </Snackbar>
    </div>
    )
  }


  return (
    <>
     {signText === "Sign up" ? <h1 style={{marginTop:'5%',color:'white',fontSize:'large'}}>
        {successMessage()}
        {errorMessage()}
        <br /><br />
        {signUpForm()}
      </h1>: <h1 style={{marginTop:'5%',color:'white',fontSize:'large'}}>
      {loadingMessage()}
			{errorMessage()}
			{signUpForm()}
			{redirect()}
      </h1>
     }
    </>
  )
}

const mapStateToProps = state =>{
  return{
    signUpDialogErrorDisplay:state.Reducer.signUpErrorDialogValue,
    signUpDialogSuccessDisplay:state.Reducer.signUpSuccessDialogValue
  }
}
const mapDispatchToProps={
setSignUpErrorDialog,setSignUpSuccessDialog
}
export default connect(mapStateToProps,mapDispatchToProps)(Signup);
