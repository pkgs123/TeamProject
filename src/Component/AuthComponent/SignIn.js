import React, { useState } from "react";
//import Base from "../core/Base";
//import { signUp,signIn } from '../AuthComponent/AuthAPI';
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

import { Link, Redirect } from "react-router-dom";
import { signIn, isAuthenticated, authenticateUser } from '../AuthComponent/AuthAPI';




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



const SignIn = () => {
	const classes = useStyles();
	const[signText,setSignText] = useState('Sign in');
	const [values, setValues] = useState({
		email: "manav@gmail.com",
		password: "12345",
		error: "",
		loading: false,
		didRedirect: false,
	});

	const { email, password, error, loading, didRedirect } = values;
	const { user } = isAuthenticated();

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
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

	const errorMessage = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<div
						className="alert alert-danger"
						style={{ display: error ? "" : "none" }}
					>
						{error}
					</div>
				</div>
			</div>
		);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false, loading: true });
		signIn({ email, password })
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error, loading: false });
				} else {
					authenticateUser(data, () => {
						setValues({ ...values, didRedirect: true });
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const redirect = () => {
		if (didRedirect) {
			if (user && user.role == 1) {
				return <Redirect to="/admin/dashboard" />;
			} else {
				return <Redirect to="/user/dashboard" />;
			}
		}

		if (isAuthenticated()) {
			return <Redirect to="/"></Redirect>;
		}
	};

	const signInForm = () => {
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
				   <form className={classes.form}>
				   {/* <div> */}
				
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
					   value={email}
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
					   value = {password}
					   onChange={handleChange("password")}
					 />
					 <Tooltip title="Sign In">
					   <Button
						 type="submit"
						 fullWidth
						 variant="contained"
						 color="primary"
						 className={classes.submit}
						 onClick={onSubmit}
					   >
						 Continue
			   </Button>
					 </Tooltip>
									   </form>
				   {/* </div> */}
				 </div>
			   </div>
			 </Container>
			 </>
		);
	};
	return (
		// <Base title="Log In" description="Let's get started">
		<>

		<h1 style={{marginTop:'5%',color:'white',fontSize:'large'}}>
			{loadingMessage()}
			{errorMessage()}
			{signInForm()}
			{redirect()}
			</h1>
			</>
		// </Base>
	);
};

export default SignIn;
