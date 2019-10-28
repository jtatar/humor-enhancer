import React from 'react';
import logo from './logo.svg';
import Register from './components/Register/Register'
import Signin from './components/Signin/Signin'
import './App.css';

loadUser = () => {

}

onRouteChange = () => {

}

function App() {
  return (
    <div className="App">
      <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
    </div>
  );
}

export default App;
