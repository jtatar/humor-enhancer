import React, {Component} from 'react';
import _ from 'lodash'
import { Search, Grid } from 'semantic-ui-react'
import './SearchBar.css'

const initialState = { isLoading: false, results: [], value: '' }

const source = _.times(5, () => ({
    title: 'Adam malysz',
  }))

class SearchBar extends Component{
    state = initialState;

    handleResultSelect = (e, { result }) => this.setState({ value: result.title })

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })
            setTimeout(() => {
            if (this.state.value.length < 1) return this.setState(initialState)

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = (result) => re.test(result.title)

            this.setState({
                isLoading: false,
                results: _.filter(source, isMatch),
            })
            }, 300)
    }

    render(){
        const { isLoading, value, results } = this.state
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