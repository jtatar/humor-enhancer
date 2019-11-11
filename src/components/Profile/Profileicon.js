import React, { Component } from 'react'
import { Dropdown, Image } from 'semantic-ui-react'

import './Profileicon.css';

class ProfileIcon extends Component{
    constructor(props){
        super(props);
        this.state = {
            dropdownOpen: false
        }
    }

    onSignOut = () =>{
        const {onRouteChange} = this.props;
        onRouteChange('signout');
    }

    render(){
        const {user} = this.props;
        const trigger =  (
            <span>
                <p className="f4">{user.name} {user.surname} &nbsp;
                    <Image avatar src={'https://avatarfiles.alphacoders.com/893/thumb-89303.gif'} size="mini"/>
                </p>
            </span>
        )
    
        const options = [
            { key: 'profile', text: 'Profile', icon: 'user' },
            { key: 'settings', text: 'Settings', icon: 'settings' },
            { key: 'sign-out', text: 'Sign Out', icon: 'sign out', onClick:this.onSignOut}
          ]

        return(
            <div className="pa4 tc">
                <Dropdown
                trigger = {trigger}
                icon={null}
                options={options}
                direction="left"
                pointing="top right"
                />
            </div>
        );
    }
}

export default ProfileIcon;