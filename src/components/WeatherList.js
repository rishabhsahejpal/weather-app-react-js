import React, { Component } from 'react'
import WeatherListHeader from './WeatherListHeader'
import WeatherListMain from './WeatherListMain'
import Loader from './Loader'
import Error from './Error'


export class WeatherList extends Component {
    
    // References to chiild elements, try with state as it becomes null if not used the first time
    weatherListMainRef = React.createRef();
    weatherListHeaderRef = React.createRef();

    changeTemp = (type)=>{
        this.weatherListMainRef.current.changeValueTemp(type)
    }

    resetTempNav = ()=>{
        //Navigate to 2nd level
        if(this.weatherListMainRef.current !== null)
            this.weatherListMainRef.current.resetTempNav();
        if(this.weatherListHeaderRef.current !== null)
            this.weatherListHeaderRef.current.resetTempNav();
    }

    render() {
        if(this.props.hasLoaded && !this.props.errorOccurred){
        return (

            <div className="info-container info-wrapper text-center d-flex flex-column justify-content-start">
                <WeatherListHeader ref={this.weatherListHeaderRef} data={this.props} changeTemp={this.changeTemp} />
                <WeatherListMain ref={this.weatherListMainRef} data={this.props} changeTemp={this.changeTemp}/>
            </div>
        )}else if(this.props.errorOccurred){
        return (
            <div className="info-container info-wrapper text-center d-flex flex-column justify-content-start">
                <Error />
            </div>
        )}else if(!this.props.hasLoaded){
            return (
            <div className="info-container info-wrapper text-center d-flex flex-column justify-content-start">
                <Loader />
            </div>
            )
        }

    }
}

export default WeatherList
