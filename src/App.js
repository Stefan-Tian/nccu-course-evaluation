import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CourseCards from './components/CourseCards';
import CourseDetails from './components/CourseDetails';
import { Head } from './components/Header';
import Aux from './components/Aux';
import './App.css';
import 'react-vis/dist/style.css';
import Questionnaire from './components/Questionnaire';
import axios from 'axios';

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
    axios
      .get('https://0689f14c.ngrok.io/user_email')
      .then(res => console.log(res));
  }

  render() {
    return (
      <BrowserRouter>
        <Aux>
          <Head detached={this.state.detached} />
          <Switch>
            <Route exact path="/" component={CourseCards} />
            <Route path="/courses/:id" component={CourseDetails} />
            <Route exact path="/questionnaire/:id" component={Questionnaire} />
          </Switch>
        </Aux>
      </BrowserRouter>
    );
  }
}

export default App;
