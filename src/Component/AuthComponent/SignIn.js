import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { signIn, isAuthenticated, authenticateUser } from '../AuthComponent/AuthAPI';

const SignIn = () => {
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
			<div className="d-flex justify-content-center">
				<div className="card authCard text-center">
					<div className="card-body">
						<div className="row">
							<div className="col-md-6 offset-sm-3 text-left">
								<form action="">
									<div className="form-group">
										<label className="text-dark">Email</label>
										<input
											className="form-control"
											type="email"
											onChange={handleChange("email")}
											value={email}
										/>
									</div>
									<div className="form-group">
										<label className="text-dark">Password</label>
										<input
											className="form-control"
											type="password"
											onChange={handleChange("password")}
											value={password}
										/>
									</div>
									<button
										className="btn btn-success btn-block"
										onClick={onSubmit}
									>
										Submit
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};
	return (
		<Base title="Log In" description="Let's get started">
			{loadingMessage()}
			{errorMessage()}
			{signInForm()}
			{redirect()}
		</Base>
	);
};

export default SignIn;
