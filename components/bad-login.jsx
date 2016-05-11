import React, {Component} from 'react';

class BadLogin extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            loading: true
        };
    }
    
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loading: false
            });
        }, 5000);
    }
    
    render() {
        const {loading, loggedIn, newsLetter} = this.state;
        
        if(loggedIn)
            return (
                <div>
                    <h3>Invalid Portal Session</h3>
                    <p>An error was encountered while processing your Portal request, because your portal session is no longer valid. You have been logged out and you will automatically be redirected to the OracleAS Portal home page in 30 seconds. Click OracleAS Portal home page to go directly to the OracleAS Portal home page, or if your browser does not automatically redirect you. If you continue to have problems while accessing OracleAS Portal, close all your browser instances and try again.</p>
                </div>
            )
            
        return (
            <div>
                {newsLetter ? <img src="https://www.wonderplugin.com/wp-content/uploads/2015/09/wordpress-lightbox-popup-ajax.png" style={{position: 'absolute'}}/> : null}
                
                <div style={{fontFamily: 'Courier', fontSize: '20px', width: 500, backgroundImage: 'url(http://webislove.com/wordpress/wp-content/uploads/2011/04/pattern2.jpg)'}}>
                    {loading ? <img src="http://preloaders.net/preloaders/712/Floating%20rays.gif" style={{width: '100vw', height: '100vh', backgroundColor: 'white', position: 'absolute'}}/> : null}
                    
                    <form style={{marginLeft: 300}} onSubmit={event => {
                        event.preventDefault();
                    }}>
                        <span style={{display: 'inline-block', marginRight: -10}}>Kasutajanimi</span>
                        <input ref="email" type="text" style={{border: 'none', cursor: 'pointer', color: '#BBB', fontSize: '20px', backgroundColor: 'rgba(0, 0, 0, 0)'}} onKeyDown={event => {                        
                            if(event.keyCode == 9)
                                event.preventDefault()
                        }} defaultValue="ID"/><br/>
                        Sisesta saladus
                        <input ref="password" type="text" style={{border: 'none', cursor: 'pointer', color: '#BBB', fontSize: '20px', backgroundColor: 'rgba(0, 0, 0, 0)'}} onFocus={event => {
                            this.setState({
                                newsLetter: true
                            });
                            
                            setTimeout(() => {
                                this.setState({
                                    newsLetter: false    
                                })
                            }, 5000);
                        }} onKeyDown={event => {                        
                            if(event.keyCode == 9)
                                event.preventDefault()
                        }} defaultValue="Saladus"/><br/><br/>
                        <button onClick={event => {
                            
                        }} onDoubleClick={event => {
                            alert("Kas oled kindel??");
                            
                            let email = this.refs.email.value;
                            let password = this.refs.password.value;
                            
                            if(email == "asd@asd.ee" && password == "asd") {
                                alert("Oled sisse logitud!!!");
                                
                                this.setState({
                                    loggedIn: true
                                });
                            } else {
                                this.refs.email.value = "";
                                this.refs.password.value = "";
                            }
                        }}>Submit</button>
                        <hr/>
                        <img src="https://upload.wikimedia.org/wikipedia/en/0/03/Welcome_flames.gif"/>
                        <img src="http://www.11points.com/images/animatedgifs/counter.gif"/>
                        <img src="http://cjihrig.com/blog/wp-content/uploads/2011/12/best_viewed_with_ie_or_netscape.jpg"/>
                        <img src="https://gun.io/static/uploads/HTML%3ACSS3.jpg" style={{width: 100}}/>
                    </form>
                </div>
            </div>
        );
    }
}

export default BadLogin;