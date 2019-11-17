import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import './Joke.css'

const initialState = {
    isFavourite: false
}

class Joke extends Component{
    constructor(props){
        super(props);
        this.state = initialState;
    }

    onFavouriteClick = () =>{
        const { setFavourite } = this.props;
        this.setState((prevState) => ({
            isFavourite: !prevState.isFavourite
        }));
        setFavourite();
    }

    checkIfFavourite = () => {
        const { favourites, joke } = this.props;
        if(favourites.includes(joke.id)){
            this.setState({isFavourite:true});
        }
    }

    loadJoke = () => {
        const { getJoke } = this.props;
        getJoke();
            this.checkIfFavourite();
    }

    componentDidMount(){
        this.checkIfFavourite();
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
                            isFavourite
                            ?
                                <Icon name='like' size='big' color='red' onClick={this.onFavouriteClick}/>
                            :
                                <Icon name='like' size='big' onClick={this.onFavouriteClick}/>
                        }
                    </div>
                    :(
                        <div  className='icons'>
                            <Icon name='like' size='big' onClick={this.onFavouriteClick}/>
                        </div>
                    )
                }
                </div>
            </div>
        );
    }
}


export default Joke;