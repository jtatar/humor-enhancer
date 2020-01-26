import React from 'react'
import ProfileIcon from '../Profile/Profileicon'
import SearchBar from './SearchBar'
import { Search, Grid } from 'semantic-ui-react'

const Navigation = ({ onRouteChange, isSignedIn, user, toggleModal }) => {
    if (isSignedIn) {
        return (
            <nav style = {{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{display:'flex', justifyContent: 'flex-start'}}>
                    <p onClick={() => onRouteChange('home')} className='f3 link dim black underline pa4 pointer'>Home</p>
                    <div className='pa3'>
                        <SearchBar/>
                    </div>
                </div>
                <ProfileIcon onRouteChange={onRouteChange} user={user} toggleModal={toggleModal}/>
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