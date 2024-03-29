import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';

class Signin extends Component {
    constructor(props){
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            isVerified:false
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    saveAuthTokenInSession = (token) => {
        window.sessionStorage.setItem('token', token);
    }
    
    verifyCallback = (response) => {
        if(response){
            this.setState({
                isVerified: true
            })
        }
    }
    
    callback = () => {
        console.log('loaded')
    }

    onSubmitSignIn = () => {
        if(this.state.isVerified){
            fetch('https://tai-polsl-api.herokuapp.com/signin',{
                method:'post',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.signInEmail,
                    password: this.state.signInPassword
                })
            })
                .then(response => response.json())
                .then(data => {
                    if(data.userId && data.success === 'true'){
                        this.saveAuthTokenInSession(data.token);
                        fetch(`https://tai-polsl-api.herokuapp.com/profile/${data.userId}`, {
                            method:'get',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': data.token
                            }
                        })
                        .then(resp => resp.json())
                        .then(user => {
                            if(user && user.email){
                                this.props.loadUser(user);
                                this.props.onRouteChange('home');
                            }
                        })
                    }
                })
        } else {
            console.log('Please verify the captcha')
        }
    }

    render(){
        const { onRouteChange } = this.props;
        return(
            <main className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <article className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input
                            className="hover-black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            type="email"
                            name="email-address"
                            id="email-address"
                            onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input
                            className="hover-black b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            type="password"
                            name="password"
                            id="password"
                            onChange={this.onPasswordChange}
                            />
                        </div>
                        </fieldset>
                        <Recaptcha
                        sitekey="6Leq79YUAAAAADuj-tFkC7-ZOUyRF08ZmZKffYG9"
                        render="explicit"
                        verifyCallback={this.verifyCallback}
                        />
                        <div className="">
                        <input
                            onClick={this.onSubmitSignIn}
                            className="hover-black b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib mt2"
                            type="submit"
                            value="Sign in"
                        />
                        </div>
                        <div className="lh-copy mt3">
                            <p  onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                        </div>
                    </div>
                </article>
            </main>
        );
    }
}

export default Signin;