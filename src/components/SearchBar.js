import React, { Component } from 'react'

export class SearchBar extends Component {
    state = {
        title: null,
    }

    changeValue =(e) =>{
        this.setState({title: e.target.value})
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        let cityEntered = this.state.title;
        // Send it to parent
        this.props.handleSubmit(cityEntered,false);

    }

    render() {
        return (
            <form method="GET" onSubmit={this.handleSubmit}>
                <input 
                name="search" 
                className="search-box" 
                placeholder="Enter city..." 
                onChange={this.changeValue}
                title={this.state.title}
                />
                <input type="submit" value="SEARCH"/>
            </form>
        )
    }
}

export default SearchBar
