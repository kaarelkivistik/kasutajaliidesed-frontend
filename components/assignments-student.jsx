import React, {Component} from 'react';
import moment from 'moment';
import sortBy from 'sort-by';
import { Link } from 'react-router';

const format = "DD.MM.YYYY";

const assignments = [{
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

assignments.sort(sortBy("submitted", "graded", "due"));

const ok = <i className="fa fa-check-circle"/>;
const notOk = <i className="fa fa-circle-o"/>;

const filterStyle = {
	marginLeft: 15,
	marginRight: 5
};

class Assignments extends Component {
	render() {
		return (
			<div>
				<p>
					Show 
					<a href="#" style={filterStyle}><b>all</b></a>
					<a href="#" style={filterStyle}>due soon</a>
					<a href="#" style={filterStyle}>submitted, but not graded</a>
					<a href="#" style={filterStyle}>graded</a>
				</p>
				
				<table className="table table-hover">
					<thead>
						<tr>
							<th>Assignment</th>
							<th className="text-xs-center">Due</th>
							<th className="text-xs-center">Score</th>
							<th className="text-xs-center">Submitted?</th>
							<th className="text-xs-center">Graded?</th>
						</tr>
					</thead>
					
					<tbody>
						{assignments.map(({id, name, due, soonDue, points, pointsEarned, submitted, graded}) => {
							return <tr key={id} className={soonDue ? "table-danger" : graded ? "table-success" : submitted ? "table-info" : ""}>
									<td><Link to="/student/assignments/1/submission">{name}</Link></td>
									<td className="text-xs-center">{soonDue ? <i className="fa fa-exclamation-circle"/> : null} {moment(due).format(format)}</td>
									<td className="text-xs-center">{graded ? <span><b>{pointsEarned}</b> out of <b>{points}</b></span> : <b>{points}</b>}</td>
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

export default Assignments;