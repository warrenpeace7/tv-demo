import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ManageShows from './Pages/ManageShows'
import ViewShows from '../src/Pages/ViewShows'
import './App.css';


class App extends Component {
  state = {
    shows: [
      {
        name: 'Game of Thrones',
        rating: 5,
        image: 'http://bronlea.com/wp-content/uploads/2017/10/2742670-game-768x384.jpg'
      }
    ]
  }
  createShow = (show) => {
    this.setState((previousState) => {
      const existingShows = previousState.shows
      existingShows.push(show)
      return {
        shows: existingShows
      }
    })
  }


  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={() => <ViewShows allShows={this.state.shows} /> } />
            <Route path="/manageShows" component={() => <ManageShows allShows={this.state.shows} createShow={this.createShow} /> } />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
