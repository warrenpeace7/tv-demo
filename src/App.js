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
    this.postShow(show)
    // this.setState((previousState) => {
    //   const existingShows = previousState.shows
    //   existingShows.push(show)
    //   return {
    //     shows: existingShows
    //   }
    // })
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

  getShows = () => {
   
    fetch('http://localhost:3001/shows')
      .then((response) => {
        console.log("response:", response)
        return response.json()
      })
      .then((shows) => {
        console.log("jsonData:", shows)
        this.setState({ shows })
      })
      .catch((error) => {
        console.log(error, 'also error')
      })
  }

  postShow = (showToSave) => {
    console.log('here')
    const postInit = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(showToSave),
    }
    fetch('http://localhost:3001/shows', postInit)
      .then((postShowsResponse) => {
        return postShowsResponse.json()
      })
      .then((show) => {
        this.setState({
          shows: [...this.state.shows, show]
      })
    })
      .catch((error) => {
        this.setState({ errorMessage: error.message })
      })
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
            <Route path="/manageShows" component={() => <ManageShows allShows={this.state.shows} createShow={this.createShow} />} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
