import React, {Component} from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import sortBy from 'sort-by';

import api from '../api';

const format = "DD.MM.YYYY";

const ok = <i className="fa fa-check-circle"/>;
const circle = <i className="fa fa-circle"/>;
const notOk = <i className="fa fa-circle-o"/>;

const filterStyle = {
	marginLeft: 10,
	marginRight: 10
};

const rowStyle = {
	cursor: "pointer"
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
		api("/assignments").then(assignments => {
			const parsedAssignments = assignments.map(assignment => {
				assignment.due = new Date(assignment.due);
				
				return assignment;
			});
			
			parsedAssignments.sort(sortBy("-isOpen", "isGraded", "due"));
			
			this.setState({
				assignments: parsedAssignments
			});
		}, error => {
			console.error(error);
		});
	}
	
	render() {		
		const { push } = this.props;
		const { assignments, filter } = this.state;
		
		return (
			<div>
				<div className="form-inline" style={{marginBottom: 15}}>
					<div className="form-group">
						Show
					
						{["all", "open", "graded"].map(aFilter => <button 
							key={aFilter}
							className={"btn btn-" + (filter === aFilter ? "primary" : "link")} 
							style={filterStyle} 
							onClick={this.setState.bind(this, {filter:aFilter}, undefined)}>{aFilter}</button>)}
					</div>
				</div>
				
				<div className="table-responsive">
					<table className="table table-hover">
						<thead>
							<tr>
								<th>Assignment</th>
								<th className="text-xs-center">Due</th>
								<th className="text-xs-center">Open?</th>
								<th className="text-xs-center">Graded?</th>
							</tr>
						</thead>
						
						<tbody>
							{assignments.filter(assignment => {
								if(filter === "open")
									return assignment.isOpen;
								else if(filter === "graded")
									return assignment.isGraded;
								else
									return true;
							}).map(({_id, title, due, isOpen, isGraded}) => {
								return <tr key={_id} 
									className={isGraded ? "table-success" : isOpen ? "table-info" : ""}>
										<td><Link to={"/teacher/assignments/" + _id}>{title}</Link></td>
										<td className="text-xs-center">{moment(due).format(format)}</td>
										<td className="text-xs-center">{isGraded ? circle : isOpen ? ok : notOk}</td>
										<td className="text-xs-center">{isGraded ? ok : notOk}</td>
									</tr>
							})}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default Assignments;