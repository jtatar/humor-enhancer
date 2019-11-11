import React from 'react'
import { Icon } from 'semantic-ui-react'
import './Joke.css'

const Joke = ({getJoke, joke, setFavourite}) => {
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
                <div className='icons'>
                    <Icon className='pr4' name='refresh' size='big' onClick={getJoke}/>
                    <Icon name='like' size='big' onClick={setFavourite}/>
                </div>
            </div>
        </div>
    );
}

export default Joke;