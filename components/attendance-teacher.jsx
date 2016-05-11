import React, {Component} from 'react';

const students = [{
	name: "Kaarel Kivistik",
	attendance: [true, true, false, true, false]
}, {
	name: "Oliver Kuldmäe",
	attendance: [true, true, true, true, false]
}, {
	name: "Mart Laus",
	attendance: [true, true, true, false, false]
}, {
	name: "Rico Kõiv",
	attendance: [true, true, true, true, false]
}, {
	name: "Karl Mäe",
	attendance: [true, true, false, true, false]
}, {
	name: "Siim-Martin Kaasik",
	attendance: [true, false, true, true, false]
}, {
	name: "Maanus Leesment",
	attendance: [true, true, true, true, false]
}];

const ok = <i style={{cursor: "pointer"}} className="fa fa-check-circle"/>;
const notOk = <i style={{cursor: "pointer"}} className="fa fa-circle-o"/>;

class Attendance extends Component {
	render() {
		return (
			<div>
				<div style={{marginBottom: 20}}>
					<a href="#" className="btn btn-link">&laquo; previous month</a>
					<a href="#" className="btn btn-link disabled">next month &raquo;</a>
				</div>
				
				<div className="form-inline" style={{marginBottom: 20}}>
					<div className="form-group">
						<input type="text" className="form-control" placeholder="Filter by name.."/>
					</div>
				</div>
			
				<div className="table-responsive">
					<table className="table table-hover">
						<thead>
							<tr>
								<th>Student</th>
								<th className="text-xs-center">1</th>
								<th className="text-xs-center">8</th>
								<th className="text-xs-center">15</th>
								<th className="text-xs-center">22</th>
								<th className="text-xs-center table-info">29</th>
							</tr>
						</thead>
						<tbody>
							{students.map(({name, attendance}) => <tr key={name}>
								<td>{name}</td>
								{attendance.map((present, index) => <td key={index} className={"text-xs-center" + (index == 4 ? " table-info" : "")}>{present ? ok : notOk}</td>)}
							</tr>)}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default Attendance;