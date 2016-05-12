import React, {Component} from 'react';
import { connect } from 'react-redux';

import api from '../api';

class AssignmentStudent extends Component {
	
	constructor(props) {
		super(props);
		
		this.submitAssignment = this.submitAssignment.bind(this);
		
		this.state = {};
	}
	
	componentWillMount() {
		const { params: { assignmentId }, user: { id: studentId } } = this.props;
		
		api("/assignments/" + assignmentId + "/student/" + studentId).then(assignment => {
			assignment.submitted = !!assignment.submission;
			assignment.graded = assignment.submission && assignment.submission.graded;
			
			this.setState({
				assignment
			});
		}, error => {
			console.error(error);
		});
	}
	
	submitAssignment() {
		const { params: { assignmentId }, user: { id: studentId } } = this.props;
		
		api("/submissions", {
			method: "POST",
			body: {
				assignmentId,
				authorId: studentId
			}
		}).then(this.componentWillMount.bind(this));
	}
	
	render() {
		const { assignment } = this.state;
		
		if(!assignment)
			return <h4>Wait...</h4>;
			
		const { title, description, properties, submitted, graded, submission, isOpen } = assignment;
		
		return (
			<div>
				<h3>{title}</h3>
				
				<p>{description}</p>
			
				{graded ? 
					<div>
						{submission.comment ? <blockquote className="blockquote">{submission.comment}</blockquote> : null}
						<div className="table-responsive">
							<table className="table table-striped">
								<tbody>
									{submission.properties.map((property, index) => {
										return <tr key={index}>
											<td>{properties[index].name} <b>{property.value}</b> <small className="pull-right">{properties[index].pointsFrom + "..." + properties[index].pointsTo}</small></td>
										</tr>
									})}
								</tbody>
							</table>
						</div>
					</div> :
					!isOpen ?
						<div className="jumbotron">
							<h4>This assignment is not open for submissions.</h4>
							<p>Contact your teacher.</p>
						</div> :
						submitted ? 
							<div className="jumbotron">
								<h4>Assignment is submitted!</h4>
								<p>But has not been graded yet.</p>
							</div> :
							<div className="jumbotron">
								<h4>You have not yet submitted this assignment</h4>
								<p>You can do this by choosing a file to upload.</p>
								
								<button className="btn btn-primary" onClick={this.submitAssignment}>Choose file..</button>
							</div>}
			</div>
		);
	}
}

export default connect(state => state)(AssignmentStudent);