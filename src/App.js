import React, {Component} from 'react';
import Register from './components/Register/Register'
import Signin from './components/Signin/Signin'
import Navigation from './components/Navigation/Navigation'
import Joke from './components/Joke/Joke'
import Profile from './components/Profile/Profile'
import ProfileUpdate from './components/Profile/ProfileUpdate'
import Modal from './components/Modal/Modal'
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
  userInfo: {
    id: '',
    name: '',
    surname: '',
    age: 0,
    joined: ''
  },
  favourites: [],
  jokes: [],
  isFavourite: false,
  isProfileOpen: false,
  jokeCount: 0
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }))
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
    if(this.state.favourites.includes(data.id)){
      this.setState({isFavourite: true})
    } else {
      this.setState({isFavourite: false})
    }
    this.loadJokeLikes(data.id);
  }

  loadFavourites = (data) => {
    this.setState({favourites: data});
    this.loadFavouriteJokes(data);
  }

  setLikes = (data) => {
    this.setState({jokeCount: Number(data[0].count)})
  }

  loadJokeLikes = (data) => {
    fetch(`https://tai-polsl-api.herokuapp.com/likes/${data}`,{
        method:'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        }
    })
    .then(resp => resp.json())
    .then(likes => this.setLikes(likes))
  }

  getJoke = () => {
    fetch('https://tai-polsl-api.herokuapp.com/joke', {
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
    //should change fetch to favourite
    fetch('https://tai-polsl-api.herokuapp.com/joke', {
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
    .then(this.getFavourites(this.state.user, window.sessionStorage.getItem('token')))
    .then(this.setState({isFavourite: true}))
    .catch(console.log)
  }

  delFavourite = () => {
    fetch('https://tai-polsl-api.herokuapp.com/favourite', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.sessionStorage.getItem('token')
      },
      body: JSON.stringify({
        jokeid: this.state.joke.id,
        userid: this.state.user.id
      })
    })
    .then(this.getFavourites(this.state.user, window.sessionStorage.getItem('token')))
    .then(this.setState({isFavourite: false}))
    .catch(console.log)
  }

  delFavouriteById = (userid, jokeid) => {
    fetch('https://tai-polsl-api.herokuapp.com/favourite', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.sessionStorage.getItem('token')
      },
      body: JSON.stringify({
        jokeid: jokeid,
        userid: userid
      })
    })
    .then(this.getFavourites(this.state.user, window.sessionStorage.getItem('token')))
    .catch(console.log)
  }
  
  onRouteChange = (route) => {
    if (route === 'signout') {
      fetch('https://tai-polsl-api.herokuapp.com/signout', {
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
    } else if (route === 'profile'){
      this.getFavourites(this.state.user, window.sessionStorage.getItem('token'));
    } else if (route ==='getprofile'){
      this.getFavourites(this.state.userInfo, window.sessionStorage.getItem('token'));
    }
    this.setState({route: route});
  }

  getFavourites = (user, token) => {
    fetch(`https://tai-polsl-api.herokuapp.com/favourite/${user.id}`,{
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

  loadFavouriteJokes = (favourites) =>{
    fetch('https://tai-polsl-api.herokuapp.com/favourite',{
        method:'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        body: JSON.stringify({
            favourites: favourites
        })
    })
    .then(resp => resp.json())
    .then(jokes => this.setJokes(jokes.jokes))
  }

  setJokes = (jokes) => {
    this.setState({jokes: jokes});
  }

  setUserInfo = (data) => {
    this.setState({userInfo: {
      id: data.id,
      name: data.name,
      surname: data.surname,
      joined: data.joined,
      age: data.age
    }})
  }

  componentDidMount(){
    const token = window.sessionStorage.getItem('token');
    if(token) {
      fetch('https://tai-polsl-api.herokuapp.com/signin', {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
          'Authorization': token
        }
      })
      .then(resp => resp.json())
      .then(data => {
        if(data && data.id) {
          fetch(`https://tai-polsl-api.herokuapp.com/profile/${data.id}`, {
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
              this.getFavourites(data, token);
            }
          })
        }
      })
      .catch(console.log)
    }
  }

  render(){
    const { isSignedIn, route, user, joke, favourites, jokes, isFavourite, isProfileOpen, jokeCount, userInfo} = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} user={user} toggleModal={this.toggleModal} setUserInfo={this.setUserInfo}/>
        {isProfileOpen &&
        <Modal>
          <ProfileUpdate
            isProfileOpen = {isProfileOpen}
            toggleModal = {this.toggleModal}
            loadUser = {this.loadUser}
            user ={user}
          />
        </Modal>
        }
        { route === 'home'
          ?
            <div>
              <Joke getJoke={this.getJoke} route={route} joke={joke} setFavourite={this.setFavourite} favourites={favourites} isFavourite={isFavourite} jokeCount={jokeCount} delFavourite={this.delFavourite}/>
            </div>
          : (
            route === 'signin'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : (
                route=== 'profile'
                ?<Profile user={user} route={route} jokes={jokes} delFavouriteById={this.delFavouriteById} myProfile={'true'}/>
                : (
                  route === 'getprofile'
                  ? <Profile user={userInfo} route={route} jokes={jokes} delFavouriteById={null} myProfile={'false'}/>
                  : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                  )
              )
          ) 
        }
      </div>
    );
  }
}

export default App;
