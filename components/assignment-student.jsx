import React, {Component} from 'react';

class AssignmentStudent extends Component {
	render() {
		return (
			<div>
				<h3>Title of the assignment</h3>
				
				<p>Incididunt nostrud enim aute elit laborum. Sunt magna incididunt elit commodo laboris Lorem consequat. Non ut labore voluptate consectetur aute do laborum. Laboris proident eiusmod nisi ut ea sit amet amet eu exercitation ullamco. Proident laboris dolore culpa labore qui voluptate ea nostrud officia exercitation et consequat pariatur. In voluptate quis eiusmod proident ullamco adipisicing exercitation.</p>
				
				<p>Cupidatat occaecat duis nisi elit occaecat eiusmod eu elit tempor sint tempor. Dolore ea dolore proident magna ad proident labore cillum dolor voluptate id nostrud qui sit. Eiusmod elit velit et ea anim occaecat non culpa ea.</p>
				
				<ul>
					<li>foo</li>
					<li>bar</li>
					<li><b>baz!</b></li>
					<li>quu</li>
					<li>qux</li>
				</ul>
			
				<div className="jumbotron">
					<h4>You have not yet submitted this assignment</h4>
					<p>Non excepteur ex aute nostrud pariatur. Adipisicing consectetur ea mollit aliqua magna ut.</p>
					
					<button className="btn btn-primary">Choose file..</button>
				</div>
			</div>
		);
	}
}

export default AssignmentStudent;