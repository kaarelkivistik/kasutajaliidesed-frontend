import React, {Component} from 'react';
import { Link } from 'react-router';

class Dashboard extends Component {
    render() {
        return (
            <div className="container container-dashboard">
                <nav className="navbar navbar-light bg-faded">
                    <a className="navbar-brand">ÕIS + Moodle</a>
                    
                    <ul className="nav navbar-nav">
                        <li className="nav-item active">
                        <Link className="nav-link" to="/">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/">News</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/">Messages</Link>
                        </li>
                    </ul>
                </nav>
                
                <div className="dashboard-body">
                    <div className="col-md-5">                    
                        <h3>Upcoming deadlines</h3>
                        <hr/>
                        
                        <div className="card card-block card-warning">
                            <h3 className="card-title">Kasutajaliidesed</h3>
                            <p className="card-text">Esimene praktikum</p>
                            <a href="#" className="btn btn-primary">See details</a>
                        </div>
                        
                        <div className="card card-block card-info">
                            <h3 className="card-title">Mikro- ja makroökonoomika</h3>
                            <p className="card-text">Pakkumise ja nõudluse kõverad</p>
                            <a href="#" className="btn btn-primary">See details</a>
                        </div>
                        
                        <div className="card card-block card-info">
                            <h3 className="card-title">Võrgurakendused II</h3>
                            <p className="card-text">Test AJAXi callide peale</p>
                            <a href="#" className="btn btn-primary">See details</a>
                        </div>
                    </div>
                    
                    <div className="col-md-7">
                        <h3>Recent grades</h3>
                        <hr/>
                        
                        <ul className="list-group">
                            <li className="list-group-item">
                                <span className="label label-primary label-pill pull-xs-right">3</span>
                                Kasutajaliidesed <small>ITV0130</small>
                            </li>
                            <li className="list-group-item">
                                <span className="label label-primary label-pill pull-xs-right">1</span>
                                Veebipõhiste rakenduste arhitektuur, disain ja tehnoloogia <small>IDU0200</small>
                            </li>
                            <li className="list-group-item">
                                Mikro- ja makroökonoomika <small>TET3070</small>
                            </li>
                            <li className="list-group-item">
                                Võrgurakendused II <small>ITV0120</small>
                            </li>
                            <li className="list-group-item">
                                Elektroonika II <small>IED0150</small>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;