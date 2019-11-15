import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import './Joke.css'

class Joke extends Component{
    constructor(props){
        super(props);
    }

    onFavouriteClick = () =>{
        const { setFavourite } = this.props;
        setFavourite();
    }

    render(){
        const { getJoke, joke, route } = this.props;
        return(
            <div className='center ma'>
                <div className='mt2'>
                {   
                    joke.type === 'single'
                    ?
                    <div className='jokeBox'>
                        <p className='f1'>{joke.joke}</p>
                    </div>
                    : (
                        joke.type === 'twopart'
                        ? (
                            <div className='jokeBox'>
                            <p className='f1'>{joke.setup}</p>
                            <p className='f3 red'>{joke.delivery}</p>
                            </div>
                        )
                        :
                        <p>Couldn't load joke</p>
                    )
                }
                {
                    route === 'home'
                    ?
                    <div className='icons'>
                        <Icon className='pr4' name='refresh' size='big' onClick={getJoke}/>
                        <Icon name='like' size='big' onClick={this.onFavouriteClick}/>
                    </div>
                    :
                    <p></p>
                }
                </div>
            </div>
        );
    }
}


export default Joke;