import React, {Component} from 'react';
import logo from './logo.svg';
import Register from './components/Register/Register'
import Signin from './components/Signin/Signin'
import Navigation from './components/Navigation/Navigation'
import Joke from './components/Joke/Joke'
import Profile from './components/Profile/Profile'
import './App.css';

const initialState = {
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    surname: '',
    email: '',
    joined: '',
    age: 0
  },
  joke: {
    id: 0,
    type: '',
    category: '',
    joke: '',
    setup: '',
    delivery: ''
  },
  favourites: []
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }
  
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      surname: data.surname,
      email: data.email,
      joined: data.joined,
      age: data.age
    }})
  }

  loadJoke = (data) => {
    if(data.type === 'single'){
      this.setState({joke: {
        id: data.id,
        category: data.category,
        type: data.type,
        joke: data.joke
      }})
    } else if(data.type === 'twopart') {
      this.setState({joke: {
        id: data.id,
        category: data.category,
        type: data.type,
        setup: data.setup,
        delivery: data.delivery
      }})
    }
  }

  loadFavourites = (data) => {
    this.setState({favourites: data});
  }

  getJoke = () => {
    fetch('http://localhost:3000/joke', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        }
    })
    .then(resp => resp.json())
    .then(data => this.loadJoke(data))
  }

  setFavourite = () => {
    fetch('http://localhost:3000/joke', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.sessionStorage.getItem('token')
      },
      body: JSON.stringify({
        jokeid: this.state.joke.id,
        userid: this.state.user.id
      })
    })
  }
  
  onRouteChange = (route) => {
    if (route === 'signout') {
      fetch('http://localhost:3000/signout', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': window.sessionStorage.getItem('token')
        },
        body: JSON.stringify({
          token: window.sessionStorage.getItem('token')
        })
      })
      .then(resp => resp.json())
      .catch(console.log)
      window.sessionStorage.removeItem('token');
      return this.setState(initialState)
    } else if (route === 'home') {
      this.getJoke();
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  componentDidMount(){
    const token = window.sessionStorage.getItem('token');
    if(token) {
      fetch('http://localhost:3000/signin', {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
          'Authorization': token
        }
      })
      .then(resp => resp.json())
      .then(data => {
        if(data && data.id) {
          fetch(`http://localhost:3000/profile/${data.id}`, {
            method: 'get',
            headers: {
              'Content-type': 'application/json',
              'Authorization': token
            }
          })
          .then(resp => resp.json())
          .then(user => {
            if(user && user.email){
              this.loadUser(user);
              this.onRouteChange('home');
              fetch(`http://localhost:3000/favourite/${data.id}`,{
                method: 'get',
                headers: {
                  'Content-type': 'application/json',
                  'Authorization': token
                }
              })
              .then(resp => resp.json())
              .then(user => {
                this.loadFavourites(user);
              })
            }
          })
        }
      })
      .catch(console.log)
    }
  }

  render(){
    const { isSignedIn, route, user, joke, favourites} = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} user={user}/>
        { route === 'home'
          ?
            <div>
              <Joke getJoke={this.getJoke} route={route} joke={joke} setFavourite={this.setFavourite}/>
            </div>
          : (
            route === 'signin'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : (
                route=== 'profile'
                ?<Profile user={user} route={route} favourites={favourites}/>
                :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              )
          ) 
        }
      </div>
    );
  }
}

export default App;
