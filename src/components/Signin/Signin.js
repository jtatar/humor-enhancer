import React, { Component } from 'react';

class Signin extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            surname: '',
            age: 0
        }
    }

    render(){
        return(
            <article>
                Hello world
            </article>
        );
    }
}

export default Signin;