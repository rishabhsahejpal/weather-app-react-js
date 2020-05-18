import React, { Component } from 'react'

export class RecentSearches extends Component {
    state = {
        searchesEmpty: true,
        searches: []
    }

    upDateSearches = (city)=>{

        let len = this.state.searches.length;
        if( len >= 0 && len < 5 ) this.addSearch(city.toUpperCase());
        else if(len >= 5) this.removeAndAddSearch(city.toUpperCase());
    }

    addSearch = (city)=>{
        let newArray = this.state.searches.concat(city);
        this.setState({
            searches : newArray
        })
        //Set searchesEmpty to true
        if(this.state.searchesEmpty) this.setState({searchesEmpty : !this.state.searchesEmpty})
    }

    removeAndAddSearch = (city)=>{
        let newArray = this.state.searches;
        newArray.shift();
        newArray = newArray.concat(city);
        this.setState({
            searches: newArray
        })
        //Set searchesEmpty to true
        if(this.state.searchesEmpty) this.setState({searchesEmpty : !this.state.searchesEmpty})
    }

    resetSearches = ()=>{
        this.setState({
            searchesEmpty : true,
            searches : []
        });
    }
    
    addLis = ()=>{
        let lisToShow = [];//Use array for JSX

        if(!this.state.searchesEmpty){
            const {searches} = this.state;
            searches.forEach( (li,i) => {
                lisToShow.push(<li key={i}><a href="." onClick={this.handleSubmit}>{li}</a></li>)
            });

        }
        //Return empty or return with lis
        return lisToShow
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        this.props.handleSubmit(e.target.innerHTML,true);
    }

    render() {
        //Fill In lis
        const lis = this.addLis();

        if(this.state.searchesEmpty)
            return(
                <div className="recent-searches uc bold d-flex justify-content-start align-items center">
                    <p className="mb-0 mt-1">Your Recent Searches:</p>
                    <p className="mb-0 mt-1">No new searches. Enter a city name above and hit "SEARCH".</p>
                </div>
            )

        else
            return (
               <div className="recent-searches uc bold d-flex justify-content-start align-items center">
                    <div className="d-flex flex-grow">
                        <p className="mb-0 mt-1">Your Recent Searches:</p>
                        <ul className="d-flex mb-0 pl-0 align-items-center justify-content-start flex-grow">
                            {lis}
                        </ul>
                        <span className="clear align-self-end" onClick={this.resetSearches}>x</span>
                    </div>

                </div>
            )

                        // <li><a href="." onClick={this.handleSubmit}>Vancouver</a></li>

                        // <li><a href="." onClick={this.handleSubmit}>toronto</a></li>

                        // <li><a href="." onClick={this.handleSubmit}>New Delhi</a></li>

                        // <li><a href="." onClick={this.handleSubmit}>Perth</a></li>

                        // <li><a href="." onClick={this.handleSubmit}>Surrey</a></li>

    }
}

export default RecentSearches
