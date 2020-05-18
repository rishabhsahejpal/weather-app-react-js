import React, { Component } from 'react'

export class WeatherListHeader extends Component {
    constructor(props){
        super(props)
        this.state = {
            celActive: true,
            fahActive: false,
            kelActive: false
        }
    }

    resetTempNav =()=>{
        this.setState({
            celActive: true,
            fahActive: false,
            kelActive: false
        })
    }

    changeActive = (e)=>{
        e.preventDefault();
        let type;
        //DEcide the type of button clicked
        if(e.target.classList.contains('F')){
            type = 'F';
            this.setState({
                celActive: false,
                fahActive: true,
                kelActive: false 
            });
        }
        else if(e.target.classList.contains('C')){
            type = 'C';
            this.setState({
                celActive: true,
                fahActive: false,
                kelActive: false 
            });
        }
        else if(e.target.classList.contains('K')){
            type = 'K';
            this.setState({
                celActive: false,
                fahActive: false,
                kelActive: true 
            });
        }

        // Send type to parent
        this.props.changeTemp(type);

    }

	render() {
        let c = this.state.celActive?'active ':' '
        let f = this.state.fahActive?'active ':' '
        let k = this.state.kelActive?'active ':' '

        return (
				<div className="top-stack col-12 d-flex justify-content-between align-items-center">
                    <h3>{this.props.data.weather.city}, {this.props.data.weather.country}</h3>
                    <ul className="d-flex">
                        <li><i className="fas fa-caret-right"></i></li>
                        <li><a className={k+"tempHooks K"} onClick={this.changeActive} href=".">&#730;K</a></li>
                        <li><a className={f+"tempHooks F"} onClick={this.changeActive} href=".">&#730;F</a></li>
                        <li><a className={c+"tempHooks C"} onClick={this.changeActive} href=".">&#730;C</a></li>
                    </ul>
                </div>
            )
    }
}

export default WeatherListHeader
