import React, { Component } from 'react';

class Register extends Component {
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

    onNameChnage = (event) => {
        this.setState({name: event.target.value});
    }

    onSurnameChange = (event) => {
        this.setState({surname: event.target.value});
    }

    onAgeChange = (event) => {
        this.setState({age: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    saveAuthTokenInSession = (token) => {
        window.sessionStorage.setItem('token', token);
    }

    onSubmitRegister = () => {
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                surname: this.state.surname,
                age: this.state.age,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.userId && data.success === 'true') {
                this.saveAuthTokenInSession(data.token);
                fetch(`http://localhost:3000/profile/${data.userId}`,{
                    method: 'get',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': data.token
                    }
                })
                .then(response => response.json())
                .then(user => {
                    console.log(user);
                    if(user && user.email){
                        this.props.loadUser(user);
                        this.props.onRouteChange('home');
                    }
                })
            }
        })
    }

    render(){
        return(
            <main className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <article className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input
                                onChange = {this.onNameChnage}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="text"
                                name="name"
                                id="name"
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="surname">Surname</label>
                                <input
                                onChange = {this.onSurnameChange}
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="text"
                                name="surname"
                                id="surname"
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="age">Age</label>
                                <input
                                onChange = {this.onAgeChange}
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="number"
                                name="age"
                                id="age"
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                onChange = {this.onEmailChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="email"
                                name="email-address"
                                id="email-address"
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                onChange = {this.onPasswordChange}
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="password"
                                name="password"
                                id="password"
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick = {this.onSubmitRegister}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register"
                            />
                        </div>
                    </div>
                </article>
            </main>
        );
    }
}

export default Register;