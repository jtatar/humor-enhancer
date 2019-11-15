import React, {Component} from 'react';
import { Image } from 'semantic-ui-react';
import Joke from '../Joke/Joke';
import './Profile.css';

const initialState = {
    jokes: []
}

class Profile extends Component{

    constructor(){
        super();
        this.state = initialState;
    }

    loadJokes = (favourites) =>{
        fetch('http://localhost:3000/favourite',{
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

    componentDidMount(){
        this.loadJokes(this.props.favourites);
    }

    render(){
        const {user, route} = this.props;
        const { jokes } = this.state;
        return(
            <div className='profile-main'>
                <article className="w-100 shadow-5 center">
                    <main className="pa3 w-70">
                        <div className="top-line">
                            <Image avatar src={'https://avatarfiles.alphacoders.com/893/thumb-89303.gif'} size="tiny"/>
                            <h1>&nbsp;{user.name} {user.surname}, {user.age}</h1>
                        </div>
                        <div>
                            {
                                jokes.length ?
                                jokes.map((joke) => {
                                    return(
                                        <Joke key={joke.id} joke={joke} route={route}/>
                                    );
                                })
                                : <p>Couldn't load joke</p>
                            }
                        </div>
                    </main>
                </article>
            </div>
        );
    }
}
export default Profile