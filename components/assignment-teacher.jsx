import React, {Component} from 'react';
import { Link } from 'react-router';
import sortBy from 'sort-by';

import api from '../api';

const ok = <i className="fa fa-check-circle"/>;
const notOk = <i className="fa fa-circle-o"/>;

const filterStyle = {
	marginLeft: 15,
	marginRight: 5
};

const rowStyle = {
	cursor: "pointer"
};

class AssignmentTeacher extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {};
	}
	
	componentWillMount() {
		const { params: { assignmentId } } = this.props;
		
		api("/assignments/" + assignmentId + "/submissions").then(assignment => {
			assignment.due = new Date(assignment.due);
			
			assignment.users.forEach(user => {
				user.submitted = !!user.submission;
				user.graded = user.submitted && user.submission.graded;
				user.pending = user.submitted && !user.graded;
			});
			
			assignment.users.sort(sortBy("-pending", "submitted", "graded"));
			
			this.setState({
				assignment
			});
		}, error => {
			console.error(error);
		});
	}
	
	updateAssignment(isOpen, isGraded) {
		const { params: { assignmentId } } = this.props;
		
		api("/assignments/" + assignmentId, {
			method: "PUT",
			body: {
				isOpen, isGraded
			}
		}).then(this.componentWillMount.bind(this));
	}
	
	render() {
		const { push, params: { assignmentId } } = this.props;
		const { assignment, filter } = this.state;
		
		if(!assignment)
			return <h4>Wait..</h4>;
			
		const { title, properties, due, users, isOpen, isGraded } = assignment;
		
		return (
			<div>
				<h3 style={{marginBottom: 30}}>{title}</h3>
				
				<div className="form-inline" style={{marginBottom: 20}}>
					<div className="form-group">
						<input type="text" style={filterStyle} className="form-control" placeholder="Filter by name.." onChange={event => {
							this.setState({
								filter: event.target.value
							})
						}}/>
						
						{isOpen ? 
							<button style={filterStyle} className="btn btn-danger" onClick={this.updateAssignment.bind(this, false, isGraded)}>Close assignment</button> :
							<button style={filterStyle} className="btn btn-success" onClick={this.updateAssignment.bind(this, true, isGraded)}>Open assignment</button>}
						
						{isGraded ? 
							<button style={filterStyle} className="btn btn-warning" onClick={this.updateAssignment.bind(this, isOpen, false)}>Mark as not graded</button> :
							<button style={filterStyle} className="btn btn-primary" onClick={this.updateAssignment.bind(this, false, true)}>Mark as graded and close</button>}
					</div>
				</div>
			
				<table className="table table-hover">
					<thead>
						<tr>
							<th>Student</th>
							<th className="text-xs-center">Submitted?</th>
							<th className="text-xs-center">Graded?</th>
						</tr>
					</thead>
					<tbody>
						{users.filter(user => {
							return !filter || filter.length == 0 || user.name.indexOf(filter) > -1
						}).map(user => {
							const { _id: id, name, submitted, graded, submission } = user;
							
							return <tr key={id} className={graded ? "table-success" : submitted ? "table-info" : ""}>
								<td className="student-name">{submitted ? <Link to={"/teacher/submission/" + submission._id}>{name}</Link> : name}</td>
								<td className="text-xs-center">{submitted ? ok : notOk}</td>
								<td className="text-xs-center">{graded ? ok : notOk}</td>
							</tr>
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

export default AssignmentTeacher;