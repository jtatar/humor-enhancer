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

    onFavouriteClickProfile = (event) =>{
        event.target.parentElement.parentElement.remove()
        const {delFavouriteById, userid, joke} = this.props;
        delFavouriteById(userid,joke.id);
    }

    loadJoke = () => {
        const { getJoke } = this.props;
        getJoke();
    }

    render(){
        const {joke, route, isFavourite, jokeCount } = this.props;
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
                        {
                            (isFavourite)
                            ?
                                <div className='likeBox'>
                                    {
                                        jokeCount === 0
                                        ?
                                            <p className='b fw9 cursorText'>You like this &nbsp;</p>
                                        : (
                                            jokeCount === 1
                                            ?
                                                <p className='b fw9 cursorText'>You and {jokeCount} person like this &nbsp;</p>
                                            : (
                                                <p className='b fw9 cursorText'>You and {jokeCount} people like this &nbsp;</p>
                                            )
                                        )
                                    }
                                    <Icon name='like' size='big' color='red' onClick={this.onFavouriteClick}/>
                                </div>
                            :
                                <div className='likeBox'>
                                    {
                                        jokeCount === 0
                                        ?
                                            <p className='b fw9 cursorText'>No one like this &nbsp;</p>
                                        : (
                                            jokeCount === 1
                                            ?
                                                <p className='b fw9 cursorText'>{jokeCount} person like this &nbsp;</p>
                                            : (
                                                <p className='b fw9 cursorText'>{jokeCount} people like this &nbsp;</p>
                                            )
                                        )
                                    }
                                    <Icon name='like' size='big' onClick={this.onFavouriteClick}/>
                                </div>
                        }
                        <Icon className='pr4' name='refresh' size='big' onClick={this.loadJoke}/>
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