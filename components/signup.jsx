import React, {Component} from 'react';
import { Link } from 'react-router';

class Signup extends Component {
	render() {
		return (
			<div className="container container-login">
				<fieldset className="form-group">
					<label>E-mail</label>
					<input type="email" className="form-control"/>
				</fieldset>
				<fieldset className="form-group">
					<label>Name</label>
					<input type="text" className="form-control"/>
				</fieldset>
				<fieldset className="form-group">
					<label>Password</label>
					<input type="password" className="form-control"/>
				</fieldset>
				<fieldset className="form-group">
					<label>Confirm password</label>
					<input type="password" className="form-control"/>
				</fieldset>
				
				<Link to="/" className="btn btn-primary btn-block" style={{marginTop: 30}}>Sign up</Link>
			</div>
		);
	}
}

export default Signup;