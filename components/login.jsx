import React, {Component} from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';

import api from '../api';
import { setUser } from '../redux';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        
        this.onSubmit = this.onSubmit.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signInSuccessful = this.signInSuccessful.bind(this);
        
        this.state = {
            name: "kaarel",
            password: "kaarel"
        };
    }
      
    render() {
        const { loading, name, password } = this.state;
        
        return (
            <div className="container container-login">
                <h1>ITV0130</h1>
                <hr/>
                <form onSubmit={this.onSubmit}>
                    <fieldset className="form-group">
                        <input type="text" value={name} className="form-control" placeholder="Username" onChange={event => this.setState({name: event.target.value})}/>
                    </fieldset>
                    <fieldset className="form-group">
                        <input type="password" value={password} className="form-control" placeholder="Password" onChange={event => this.setState({password: event.target.value})}/>
                    </fieldset>
                    
                    <button className="btn btn-primary btn-block" disabled={loading || !name || !password}>{loading ? 'Loading..' : 'Sign in'}</button>
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
        const { name, password } = this.state;
        
        this.setState({
            loading: true
        });
        
        api("/auth", {
            method: "POST",
            body: {
                name, password
            }
        }).then(this.signInSuccessful)
    }
    
    signInSuccessful(user) {
		const { push, setUser } = this.props;
        
        this.setState({
            loading: false
        });
        
        if(!user)
            return;
        
        const { _id, name, student, teacher } = user;
        
        setUser(name, student ? "student" : teacher ? "teacher" : undefined, _id);
		
        if(student)
            push("/student/assignments");
        else if(teacher)
            push("/teacher/assignments");
    }
}

LoginForm.defaultProps = {}

export default connect(state => state, {push, setUser})(LoginForm);