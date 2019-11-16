import React, {Component} from 'react';
import { Image } from 'semantic-ui-react';
import Joke from '../Joke/Joke';
import './Profile.css';

class Profile extends Component{

    render(){
        const {user, route, jokes} = this.props;
        return(
            <div className='profile-main'>
                <article className="w-100 center">
                    <main className="pa3 w-70">
                        <div className="top-line">
                            <Image avatar src={'https://avatarfiles.alphacoders.com/893/thumb-89303.gif'} size="tiny"/>
                            <h1>&nbsp;{user.name} {user.surname}, {user.age}</h1>
                        </div>
                        <div>
                            {
                                jokes?
                                    jokes.length ?
                                    jokes.map((joke) => {
                                        return(
                                            <Joke key={joke.id} joke={joke} route={route} favourites={this.props.favourites}/>
                                        );
                                    })
                                    : <p>Couldn't load joke</p>
                                : <p>Couln't load jokes</p>
                            }
                        </div>
                    </main>
                </article>
            </div>
        );
    }
}
export default Profile