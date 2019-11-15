import React from 'react'
import ProfileIcon from '../Profile/Profileicon'

const Navigation = ({ onRouteChange, isSignedIn, user }) => {
    if (isSignedIn) {
        return (
            <nav style = {{display: 'flex', justifyContent: 'space-between'}}>
                <p onClick={() => onRouteChange('home')} className='f3 link dim black underline pa4 pointer'>Home</p>
                <ProfileIcon onRouteChange={onRouteChange} user={user}/>
            </nav>
        );
    } else {
        return(
            <nav style = {{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
                <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
            </nav>
        );
    }
}

export default Navigation;