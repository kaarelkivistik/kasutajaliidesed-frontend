import React, {Component} from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, Link } from 'react-router'

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import LoginForm from './components/login.jsx';
import Signup from './components/signup.jsx';

import AssignmentsStudent from './components/assignments-student.jsx';
import AssignmentStudent from './components/assignment-student.jsx';

import AssignmentsTeacher from './components/assignments-teacher.jsx';
import AssignmentTeacher from './components/assignment-teacher.jsx';
import SubmissionTeacher from './components/submission-teacher.jsx';
import AttendanceTeacher from './components/attendance-teacher.jsx';

import { store, history } from './redux';

class Application extends Component {
    render() {
        return <div className="container">{this.props.children}</div>
    }
}

class Teacher extends Component {
	render() {
		return (
			<div>
				<nav className="navbar navbar-light bg-faded" style={{marginBottom: 30}}>
						<span className="navbar-brand">ITV0130</span>
					<ul className="nav navbar-nav">
						<li className="nav-item">
							<Link to="/teacher/assignments" className="nav-link" activeClassName="active">Assignments</Link>
						</li>
						<li className="nav-item">
							<Link to="/teacher/attendance" className="nav-link" activeClassName="active">Attendance</Link>
						</li>
						
						<li className="nav-item">
							<Link to="/" className="nav-link">Log out</Link>
						</li>
					</ul>
				</nav>
				
				{this.props.children}
			</div>
		);
	}
}

class Student extends Component {
	render() {
		return (
			<div>
				<nav className="navbar navbar-light bg-faded" style={{marginBottom: 30}}>
						<span className="navbar-brand">ITV0130</span>
						<ul className="nav navbar-nav">
							<li className="nav-item">
								<Link to="/" className="nav-link">Log out</Link>
							</li>
						</ul>
				</nav>
				
				{this.props.children}
			</div>
		);
	}
}

render(
	<Provider store={store}>
		<Router history= {history}>
			<Route path="/" component={Application}>
				<IndexRoute component={LoginForm}/>
				<Route path="signup" component={Signup}/>
				
				<Route path="teacher" component={Teacher}>
					<Route path="assignments" component={AssignmentsTeacher}/>
					<Route path="assignments/:assignmentId" component={AssignmentTeacher}/>
					<Route path="submission/:submissionId" component={SubmissionTeacher}/>
					<Route path="attendance" component={AttendanceTeacher}/>
				</Route>
				
				<Route path="student" component={Student}>
					<Route path="assignments" component={AssignmentsStudent}/>
					<Route path="assignments/:assignmentId" component={AssignmentStudent}/>
				</Route>
			</Route>
		</Router>
	</Provider>
, document.querySelector("#app"));