import React, {Component} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import api from '../api';
import { setUser } from '../redux';

class Signup extends Component {
	
	constructor(props) {
		super(props);
		
		this.onSubmit = this.onSubmit.bind(this);
		this.valueChanged = this.valueChanged.bind(this);
		this.roleRadioChanged = this.roleRadioChanged.bind(this);
		
		this.state = {
			name: "",
			password: "",
			passwordConfirm: "",
			student: true,
			teacher: false,
		};
	}
	
	onSubmit(event) {
		event.preventDefault();
		
		const { replace, setUser } = this.props;
		const { name, password, passwordConfirm, student, teacher } = this.state;
		
		if(!name || !password || password !== passwordConfirm) {
			return;
		}
		
		console.log({
				name, password, student, teacher
		});
		
		api("/users", {
			method: "POST",
			body: {
				name, password, student, teacher
			}
		}).then(result => {
			setUser(name, student ? "student" : teacher ? "teacher" : undefined, result);
			
			if(student)
				replace("/student/assignments");
			else if(teacher)
				replace("/teacher/assignments");
		});
	}
	
	valueChanged(event) {
		const { name: key, value } = event.target;
		
		this.setState({
			[key]: value
		});
	}
	
	roleRadioChanged(event) {
		const { value } = event.target;
		
		this.setState({
			student: value === "student",
			teacher: value === "teacher",
		});
	}
	
	render() {
		const { name, password, passwordConfirm, student, teacher } = this.state;
		
		return (
			<div className="container container-login">
				<form onSubmit={this.onSubmit}>
					<fieldset className="form-group">
						<label>Name</label>
						<input type="text" className="form-control" name="name" value={name} onChange={this.valueChanged} />
					</fieldset>
					<fieldset className="form-group">
						<label>Password</label>
						<input type="password" className="form-control" name="password" value={password} onChange={this.valueChanged} />
					</fieldset>
					<fieldset className="form-group">
						<label>Confirm password</label>
						<input type="password" className="form-control" name="passwordConfirm" value={passwordConfirm} onChange={this.valueChanged} />
					</fieldset>
					
					<div className="radio">
						<label>
							<input type="radio" name="teacher" checked={student} value="student" onChange={this.roleRadioChanged}/>
							Student
						</label>
					</div>
					
					<div className="radio">
						<label>
							<input type="radio" name="teacher" checked={teacher} value="teacher" onChange={this.roleRadioChanged}/>
							Teacher
						</label>
					</div>
					
					<button className="btn btn-primary btn-block" disabled={!name || !password || password !== passwordConfirm} style={{marginTop: 30}}>Sign up</button>
				</form>
			</div>
		);
	}
}

export default connect(state => state, {replace, setUser})(Signup);