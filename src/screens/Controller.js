import React, {Component} from 'react';
import Home from './Home/Home';
import Details from './details/Details';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BookShow from './bookshow/BookShow';
import Confirmation from './confirmation/Confirmation';
// import moviesData from '../common/movieData';

class Controller extends Component {

    constructor()
    {
        super();
        this.baseUrl = "http://localhost:8085/api/v1/";
        // http://localhost:8085/api/swagger-ui.html
    }
    render(){
        return(
            <Router>
                <div className="main-container">
                              <Route exact path='/' render={(props) => <Home {...props} baseUrl={this.baseUrl} />} />
                    <Route path='/movie/:id'  render={ (props) => <Details {...props} baseurl = {this.baseUrl} />} />
                    <Route path='/bookshow/:id'  render={ (props) => <BookShow {...props} baseurl = {this.baseUrl} />} />
                    <Route path='/confirm/:id'  render={ (props) => <Confirmation {...props} baseurl = {this.baseUrl} />} />
                </div>
            </Router>
        );
    }
}

export default Controller; 