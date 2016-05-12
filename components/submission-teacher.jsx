import React, {Component} from 'react';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import update from 'react-addons-update';

import api from '../api';

const invalidPointsText = "Please check given points - some are missing or out of range.";
const apiErrorText = "Unable to save changes.. Please contact the guy developing this.";

class SubmissionTeacher extends Component {
	
	constructor(props) {
		super(props);
		
		this.submitChanges = this.submitChanges.bind(this);
		
		this.state = {
			properties: {}
		};
	}
	
	componentWillMount() {
		const { params: { submissionId } } = this.props;
		
		api("/submissions/" + submissionId).then(submission => {
			this.setState({
				submission,
				submissionProperties: submission.properties || submission.assignment.properties.map(property => {
					return {
						value: property.pointsTo
					}
				})
			});
		}, error => {
			console.error(error);
		});
	}
	
	submitChanges() {
		const { params: { submissionId }, goBack } = this.props;
		const { submission: { comment }, submissionProperties } = this.state;
		
		api("/submissions/" + submissionId, {
			method: "PUT",
			body: {
				properties: submissionProperties.map(property => {
					const { value } = property;
					
					return {value};
				}),
				graded: true,
				comment
			}
		}).then(result => {
			console.log("going back");
			goBack();
		}, error => {
			this.setState({
				apiError: true
			});
		});
	}
	
	propertyChange(index, event) {
		const { pointsFrom, pointsTo } = this.state.submission.assignment.properties[index];
		
		const { value } = event.target;
		const number = parseInt(value);
		const hasErrors = isNaN(number) || number < pointsFrom || number > pointsTo;
		
		this.setState(update(this.state, {
			submissionProperties: {
				[index]: {
					$set: {
						value: hasErrors ? value : number,
						hasErrors
					}
				}
			}
		}));
	}
	
	render() {
		const { submission, submissionProperties, apiError } = this.state;
			
		if(!submission)
			return <h4>Wait..</h4>;
			
		const { comment, assignment: { title, properties }, author: { name } } = submission;
		
		const errorsExist = submissionProperties.some(property => property.hasErrors);
			
		return (
			<div>
				<h3>{name}</h3>
				<h5 style={{marginBottom: 40}}>{title}</h5>
				
				<div className="table-responsive">
					<table className="table table-striped">			
						<tbody>
							{properties.map((property, index) => {
								const { name: propertyName, pointsFrom, pointsTo } = property;
								const { value, hasErrors } = submissionProperties[index];
								
								return (
									<tr key={index}>
										<td style={{width: 300}}><p className="form-control-static">{propertyName}</p></td>
										<td className={hasErrors ? "has-danger" : ""}>
											<div className="input-group">
												<input type="number" min={pointsFrom} max={pointsTo} className="form-control" value={value} onChange={this.propertyChange.bind(this, index)}/>
												<span className="input-group-addon">{pointsFrom + "..." + pointsTo}</span>
											</div>
										</td>
									</tr>	
								);
							})}
							
							<tr>
								<td colSpan="2"><textarea className="form-control" value={comment} onChange={event => {
									this.setState(update(this.state, {
										submission: {
											comment: {
												$set: event.target.value
											}
										}
									}));
								}} placeholder="Additional comments"></textarea></td>
							</tr>
						</tbody>
					</table>
				
					<div className="form-inline">
						<button 
							className="btn btn-primary" 
							onClick={this.submitChanges} 
							disabled={errorsExist}>Mark as graded</button>
							
						{errorsExist ? <p className="form-control-static" style={{marginLeft: 20}}>{apiError ? apiErrorText : errorsExist ? invalidPointsText : ""}</p> : null}
					</div>
				</div>
			</div>
		);
	}
}

export default connect(state => {return{}}, {goBack})(SubmissionTeacher);