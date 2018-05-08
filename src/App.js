import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ManageShows from './Pages/ManageShows'
import ViewShows from '../src/Pages/ViewShows'
import './App.css';


class App extends Component {
  state = {
    shows: []
  }

  componentWillMount() {
    this.getShows()
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



  testPromises = () => {
    console.log('testing some promises')
    new Promise((resolve, reject) => {
      const success = true
      const successMessage = 'promise was successful'
      const errorMessage = 'promise failed epically'
      setTimeout(() => {
        if (success)
          resolve(successMessage)
        else
          reject(errorMessage)
      }, 5000)
    })
  }

  getShows = async () => {
    try {
      const showsResponse = await fetch('http://localhost:3001/shows')
      const shows = await showsResponse.json()
      this.setState({ shows: shows })
    } catch (error) {
      this.setState({ errorMessage: error })
    }
  }

  postShow = async (showToSave) => {
    console.log('here')
    const postInit = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(showToSave),
    }
    try {
      const postShowsResponse = await fetch('http://localhost:3001/shows', postInit)
      const show = await postShowsResponse.json()
      console.log(show)
      this.createShow( show )
    } catch (error) {
      this.setState({ errorMessage: error })
    }
  }

  renderError = () => {
    return this.state.errorMessage
      ? (<div>{this.state.errorMessage}</div>)
      : (<div></div>)
  }

  render() {
    return (
      <Router>
        <div className="App">
          {this.renderError()}
          <Switch>
            <Route exact path="/" component={() => <ViewShows allShows={this.state.shows} />} />
            <Route path="/manageShows" component={() => <ManageShows allShows={this.state.shows} createShow={this.postShow} />} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
