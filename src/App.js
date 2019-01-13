import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CourseCards from './components/CourseCards';
import CourseDetails from './components/CourseDetails';
import { Head } from './components/Header';
import Login from './components/Login';
import './App.css';
import 'react-vis/dist/style.css';
import Questionnaire from './components/Questionnaire';
import CreateCourse from './components/CreateCourse';
import { AccountInfoProvider } from './components/AccoutInfo.context';
import { CourseDetailsProvider } from './components/CourseDetails.context';

class App extends Component {
  state = {
    detached: false
  };

  handleScroll = () => {
    if (window.scrollY > 100) {
      this.setState({ detached: true });
    } else {
      this.setState({ detached: false });
    }
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  render() {
    return (
      <BrowserRouter>
        <AccountInfoProvider>
          <CourseDetailsProvider>
            <Head detached={this.state.detached} />
            <Switch>
              <Route exact path="/" component={CourseCards} />
              <Route path="/courses/:id" component={CourseDetails} />
              <Route
                exact
                path="/questionnaire/:id"
                component={Questionnaire}
              />
              <Route path="/create-course" component={CreateCourse} />
              <Route path="/login" component={Login} />
            </Switch>
          </CourseDetailsProvider>
        </AccountInfoProvider>
      </BrowserRouter>
    );
  }
}

export default App;
