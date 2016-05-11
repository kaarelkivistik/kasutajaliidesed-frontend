import React, {Component} from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        
        this.onSubmit = this.onSubmit.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signInSuccessful = this.signInSuccessful.bind(this);
        
        this.state = {}
    }
      
    render() {
        const { loading } = this.state;
        
        return (
            <div className="container container-login">
                <h1>ITV0130</h1>
                <hr/>
                <form onSubmit={this.onSubmit}>
                    <fieldset className="form-group">
                        <input type="text" value={this.state.name} className="form-control" placeholder="Username" onChange={event => this.setState({name: event.target.value})}/>
                    </fieldset>
                    <fieldset className="form-group">
                        <input type="password" className="form-control" placeholder="Password"/>
                    </fieldset>
                    
                    <button className="btn btn-primary btn-block" disabled={loading}>{loading ? 'Loading..' : 'Sign in'}</button>
					<Link to="/signup" className="btn btn-secondary btn-block">Sign up</Link>
                </form>
            </div>
        );
    }
    
    onSubmit(event) {
        event.preventDefault();
        
        this.signIn();
    }
    
    signIn() {
        this.setState({
            loading: true
        });
        
        setTimeout(this.signInSuccessful, 2000);
    }
    
    signInSuccessful() {
        this.setState({
            loading: false
        });
        
		/* const { signedIn } = this.props;
        
        if(typeof signedIn === "func")
            signedIn()*/
			
		const { name } = this.state;
		const { push } = this.props;
		
		push(name === "student" ? "/student/assignments" : "/teacher/assignments");
    }
}

LoginForm.defaultProps = {}

export default connect(state => state, {push})(LoginForm);