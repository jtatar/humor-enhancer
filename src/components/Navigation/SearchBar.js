import React, {Component} from 'react';
import _ from 'lodash'
import { Search } from 'semantic-ui-react'
import './SearchBar.css'

const initialState = { isLoading: false, results: [], value: '' }

class SearchBar extends Component{
    state = initialState;

    handleResultSelect = (e, { result }) => {
        const { onRouteChange, setUserInfo} = this.props;
        this.setState({ value: result.title })

        fetch(`https://tai-polsl-api.herokuapp.com/userprofile/${result.id}`,{
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            }
        })
        .then(resp => resp.json())
        .then(resp => {
            setUserInfo(resp);
            onRouteChange('getprofile')
        })
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value, results: [] })
            setTimeout(() => {
            if (this.state.value.length < 1) return this.setState(initialState)
            
            fetch(`https://tai-polsl-api.herokuapp.com/user/${value}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': window.sessionStorage.getItem('token')
                }
            })
            .then(resp => resp.json())
            .then(resp => {
                if(resp[0].id){
                    let results = []
                    resp.forEach(element => {
                        this.setState(state =>{
                            results = results.concat({
                                title: `${element.name} ${element.surname}`,
                                id: element.id
                            })
                            return{
                                results,
                            };
                        })
                    });
                }
            })

            this.setState({
                isLoading: false,
            })
            }, 300)
    }

    render(){
        const { isLoading, value, results } = this.state;
        return(
            <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                leading: true,
                })}
                results={results}
                value={value}
                {...this.props}
            />
        )
    }
}

export default SearchBar;