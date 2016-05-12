import React, {Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import sortBy from 'sort-by';
import { Link } from 'react-router';

import api from '../api';

const format = "DD.MM.YYYY";

/*const assignments = [{
	id: 0,
	name: "First assignment",
	due: moment().add(0 * 5, "days").valueOf(),
	points: 10,
	pointsEarned: 5,
	submitted: true,
	graded: true
}, {
	id: 1,
	name: "Second assignment",
	due: moment().add(1 * 5, "days").valueOf(),
	points: 10,
	pointsEarned: 8,
	submitted: true,
	graded: true
}, {
	id: 2,
	name: "Third assignment",
	due: moment().add(2 * 5, "days").valueOf(),
	points: 30,
	submitted: true,
	graded: false
}, {
	id: 3,
	name: "Fourth assignment",
	due: moment().add(3 * 5, "days").valueOf(),
	points: 10,
	submitted: false,
	graded: false
}, {
	id: 4,
	name: "Fifth assignment",
	due: moment().add(4 * 5, "days").valueOf(),
	points: 10,
	submitted: false,
	graded: false
}, {
	id: 6,
	name: "Sixth assignment",
	due: moment().add(1, "days").valueOf(),
	soonDue: true,
	points: 10,
	submitted: false,
	graded: false
}];

assignments.sort(sortBy("submitted", "graded", "due"));*/

const ok = <i className="fa fa-check-circle"/>;
const circle = <i className="fa fa-circle"/>;
const notOk = <i className="fa fa-circle-o"/>;

const filterStyle = {
	marginLeft: 15,
	marginRight: 5
};

class Assignments extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			filter: "all",
			assignments: []
		};
	}
	
	componentWillMount() {
		const { user: { id: studentId }} = this.props;
		
		api("/students/" + studentId + "/submissions").then(assignments => {
			const parsedAssignments = assignments.map(assignment => {
				assignment.due = new Date(assignment.due);
				assignment.isSubmitted = !!assignment.submission;
				assignment.submissionIsGraded = !!(assignment.isSubmitted && assignment.submission.graded);
				
				assignment.points = assignment.properties.reduce((sum, current) => {
					return sum + current.pointsTo;
				}, 0);
				
				assignment.pointsEarned = assignment.submissionIsGraded ? assignment.submission.properties.reduce((sum, current) => {
					return sum + current.value;
				}, 0) : NaN;
				
				return assignment;
			});
			
			// parsedAssignments.sort(sortBy("isSubmitted", "submissionIsGraded", "due"));
			parsedAssignments.sort(sortBy("submissionIsGraded", "isSubmitted", "-isOpen"));
			
			this.setState({
				assignments: parsedAssignments
			});
		}, error => {
			console.error(error);
		});
	}
	
	render() {
		const { assignments } = this.state;
		
		if(!assignments)
			return <h4>Wait...</h4>;
		
		return (
			<div>
				
				<table className="table table-hover">
					<thead>
						<tr>
							<th>Assignment</th>
							<th className="text-xs-center">Due</th>
							<th className="text-xs-center">Score</th>
							<th className="text-xs-center">Open?</th>
							<th className="text-xs-center">Submitted?</th>
							<th className="text-xs-center">Graded?</th>
						</tr>
					</thead>
					
					<tbody>
						{assignments.map(({_id: id, title, due, soonDue, points, pointsEarned, isSubmitted, submissionIsGraded, isOpen}) => {
							return <tr key={id} 
								className={submissionIsGraded ? "table-success" : isSubmitted ? "table-info" : isOpen ? "table-active" : ""}>
									<td><Link to={"/student/assignments/" + id}>{title}</Link></td>
									<td className="text-xs-center">{soonDue ? <i className="fa fa-exclamation-circle"/> : null} {moment(due).format(format)}</td>
									<td className="text-xs-center">{submissionIsGraded ? <span><b>{pointsEarned}</b> out of <b>{points}</b></span> : <b>-</b>}</td>
									<td className="text-xs-center">{submissionIsGraded ? circle : isOpen ? ok : notOk}</td>
									<td className="text-xs-center">{isSubmitted ? ok : notOk}</td>
									<td className="text-xs-center">{submissionIsGraded ? ok : notOk}</td>
								</tr>
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

export default connect(state => state)(Assignments);

/*<p>
Show 
<a href="#" style={filterStyle}><b>all</b></a>
<a href="#" style={filterStyle}>due soon</a>
<a href="#" style={filterStyle}>submitted, but not graded</a>
<a href="#" style={filterStyle}>graded</a>
</p>*/