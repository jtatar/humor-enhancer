import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import './Joke.css'

class Joke extends Component{

    onFavouriteClick = () =>{
        const { setFavourite, delFavourite, isFavourite } = this.props;
        if(isFavourite){
            delFavourite();
        } else {
            setFavourite();
        }
    }

    onFavouriteClickProfile = () =>{
        const {delFavouriteById, userid, joke} = this.props;
        delFavouriteById(userid,joke.id);
        this.forceUpdate();
    }

    loadJoke = () => {
        const { getJoke } = this.props;
        getJoke();
    }

    render(){
        const {joke, route, isFavourite } = this.props;
        return(
            <div className='center ma mw8'>
                <div className='mt2 w-100'>
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
                        <Icon className='pr4' name='refresh' size='big' onClick={this.loadJoke}/>
                        {
                            (isFavourite)
                            ?
                                <Icon name='like' size='big' color='red' onClick={this.onFavouriteClick}/>
                            :
                                <Icon name='like' size='big' onClick={this.onFavouriteClick}/>
                        }
                    </div>
                    :(
                        <div  className='icons'>
                            <Icon name='like' size='big' color='red' onClick={this.onFavouriteClickProfile}/>
                        </div>
                    )
                }
                </div>
            </div>
        );
    }
}


export default Joke;