import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import './Joke.css'

class Joke extends Component {
    constructor(props){
        super(props)
        this.state =  {
            id: 0,
            type:'',
            setup: '',
            delivery: '',
            joke: '',
            category:''
        }
    }

    getJoke = () => {
        fetch('https://sv443.net/jokeapi/category/Any')
        .then(resp => resp.json())
        .then(data => {
            if(data && data.type && data.id){
                this.setState({id: data.id});
                this.setState({category: data.category})
                this.setState({type: data.type});
                if(data.type === 'single'){
                    this.setState({joke: data.joke});
                } else {
                    this.setState({delivery: data.delivery});
                    this.setState({setup: data.setup});
                }
            }
        })
    }

    componentDidMount(){
        this.getJoke();
    }

    render(){
        const { type, joke, setup, delivery } = this.state;
        return(
            <div className='center ma'>
                <div className='mt2'>
                {   
                    type === 'single'
                    ?
                    <div className='jokeBox'>
                        <p className='f1'>{joke}</p>
                    </div>
                    : (
                        type === 'twopart'
                        ? (
                            <div className='jokeBox'>
                            <p className='f1'>{setup}</p>
                            <p className='f3 red'>{delivery}</p>
                            </div>
                        )
                        :
                        <p>Couldn't load joke</p>
                    )
                }
                    <div className='icons'>
                        <Icon className='pr4' name='refresh' size='big' onClick={this.getJoke}/>
                        <Icon name='like' size='big'/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Joke;