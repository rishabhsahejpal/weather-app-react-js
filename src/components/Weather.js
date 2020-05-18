import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import SearchBar from './SearchBar'
import Header from './Header'
import WeatherList from './WeatherList'
import Footer from './Footer'
import Nav from './Nav'
import axios from 'axios'
import RecentSearches from './RecentSearches'

const cityrequest = `${process.env.REACT_APP_REQUEST_URL}${process.env.REACT_APP_INITAL_CITY}&appid=${process.env.REACT_APP_API_KEY}`;

export class Weather extends Component {
    state = {
        weather : [],
        modeNight: false,
        modeHot: false,
        hasLoaded: false,
        errorOccurred : false,
    }

    // References to chiild elements
    recentSearchRef=React.createRef();
    weatherListRef = React.createRef();

    kelvinToFahreinheit(k){
        return ( (k*1.8) - 459.67)
    }

    changeToNight = ()=>{
        let d = new Date();
        let offset = d.getTimezoneOffset()*60000; //Use my own timezone to get UTC TIME in min
        let offsetNew = this.state.weather.timeOffset*1000; // in sec from API
        let actualTime = d.getTime() + offset + offsetNew;//Local offset + offset of city
        let split = new Date(actualTime).toString().split(' ');

        if(split[4]!== undefined){
            let hrs = split[4].toString().split(':')[0];
            if(hrs<=6 || hrs >= 18)
               return true;
           else return false;
        }
    }

    changeToHot = ()=>{
        if(this.state.weather.temperatureK > 298)//25C
            return true;
        else return false;
    }

    createStateValues = (data)=>{
        this.setState({
            weather:{
                heading: data.weather[0].main, 
                description: data.weather[0].description, 
                icon: data.weather[0].icon, 
                temperatureK: data.main.temp.toFixed(0), 
                temperatureC: (data.main.temp - 273).toFixed(2),
                temperatureF: this.kelvinToFahreinheit(data.main.temp).toFixed(0),
                feelslikeK: data.main.feels_like.toFixed(0), 
                feelslikeC: (data.main.feels_like -273).toFixed(2), 
                feelslikeF: this.kelvinToFahreinheit(data.main.feels_like).toFixed(0), 
                pressure: data.main.pressure/1000, 
                humidity: data.main.humidity,
                tempminK: data.main.temp_min,
                tempmaxK: data.main.temp_max,
                tempminF: this.kelvinToFahreinheit(data.main.temp_min).toFixed(0),
                tempmaxF: this.kelvinToFahreinheit(data.main.temp_max).toFixed(0),
                tempminC: (data.main.temp_min - 273).toFixed(2),
                tempmaxC: (data.main.temp_max - 273).toFixed(2),
                windspeed: data.wind.speed,
                country: data.sys.country,
                timeOffset : data.timezone,
                city: data.name 
            },
        })

    }

    handleSubmit = (cityEntered,recentSearch)=>{
        let getReq = `https://api.openweathermap.org/data/2.5/weather?q=${cityEntered}&appid=${process.env.REACT_APP_API_KEY}`;
        //Change hasLoaded to false
        this.setState({hasLoaded:false})
        axios.get(getReq)
                .then(res => {
                    //Give 2 sec to load everytihing
                    setTimeout( _=> {
                        this.createStateValues(res.data)
                        // change hasloded to true and errorOccurred as false                        
                        this.setState({hasLoaded: true, errorOccurred: false})
                        //Only Run if city exists
                        //Naigate one level
                        this.weatherListRef.current.resetTempNav();
                        // If its recentSearch === fale, clicked from search button
                        if(!recentSearch)
                            this.recentSearchRef.current.upDateSearches(cityEntered);
                    },2000)
                })
                .catch(e=>{
                    //Sent the error to weatherList, where we can edit the components
                    this.setState({
                        hasLoaded : true,
                        errorOccurred : true
                    })
                    console.log('Error',e)

                }) 
    }

    componentDidMount(){
        axios.get(cityrequest)
                .then(res => {
                    //SetTimeout
                    setTimeout(()=>{
                        this.createStateValues(res.data)
                        //Change hasLoaded state
                        this.setState({
                            hasLoaded : true
                        })
                    },2000);//Timer to let it load
                })
                .catch(e=>console.log('Error',e))
    }

    render() {
        const isNight = (this.changeToNight())?'night ':'';
        const isHot = (this.changeToHot())?'hot ':'';
        //It will be either hot or night, can't be together
        const classes = (isNight !== '')?`${isNight}wrapper`:`${isHot}wrapper`;
        
        return  (
        	<div className={classes}>
	            <div className='container top d-flex flex-column justify-content-center align-items-center'>
	                <Header />
                    <Nav classes={classes} nav={{home: ' active', doc : ''}}/>
	                <SearchBar handleSubmit={this.handleSubmit}/>
                    <RecentSearches ref={this.recentSearchRef} handleSubmit={this.handleSubmit} />
	                <WeatherList ref={this.weatherListRef} hasLoaded={this.state.hasLoaded} weather={this.state.weather} errorOccurred={this.state.errorOccurred}/>
	            </div>
	            <div className="container bottom d-flex justify-content-center align-items-center">
	                <Footer />
	            </div>
			</div>  
        )
    }
}


export default Weather
