import React, { Component } from 'react'

export class WeatherListMain extends Component {
    state = {
            useProps: true,
            type: null,
            unit: <React.Fragment>&#730;C</React.Fragment>
    }

    resetTempNav = ()=>{
        this.setState({
            useProps : true,
            unit : <React.Fragment>&#730;C</React.Fragment>

        })
    }
    
    changeValueTemp = (type)=>{
        if(type === 'F'){
             this.setState({
                temperature : this.props.data.weather.temperatureF,
                feelslike : this.props.data.weather.feelslikeF,
                useProps: false,
                unit : <React.Fragment>&#730;F</React.Fragment>,
                tempmin: this.props.data.weather.tempminF,
                tempmax: this.props.data.weather.tempmaxF,
            })
        }else if(type === 'K'){
             this.setState({
                temperature : this.props.data.weather.temperatureK,
                feelslike : this.props.data.weather.feelslikeK,
                useProps: false,
                unit : <React.Fragment> K</React.Fragment>,
                tempmin: this.props.data.weather.tempminK,
                tempmax: this.props.data.weather.tempmaxK,

             })
        }else if(type === 'C'){
             this.setState({
                temperature : this.props.data.weather.temperatureC,
                feelslike : this.props.data.weather.feelslikeC,
                useProps: false,
                unit: <React.Fragment>&#730;C</React.Fragment>,
                tempmin: this.props.data.weather.tempminC,
                tempmax: this.props.data.weather.tempmaxC,
            })
         }
    }

    decideMainImage = ()=>{
        const weatherCodes = ['Clouds','Thunderstorm','Clear','Snow','Rain','Drizzle'];
        const imageListClasses = [
            'fas fa-cloud',
            'fas fa-bolt',
            'fas fa-sun',
            'far fa-snowflake',
            'fas fa-cloud-showers-heavy',
            'fas fa-cloud-rain',
            'fas fa-question'];

        const {heading} = this.props.data.weather;

        let index = ''; 
        weatherCodes.forEach((elem,i)=>{
            if(elem === heading){ index = i; return true;}
        });

        if(index === '') index = 6; 
        return imageListClasses[index]
    }

    getDateNow = () =>{
        let d = new Date();
        let offset = d.getTimezoneOffset(); //Use my own timezone to get UTC TIME in min
        offset = offset * 60 *1000;//in millisecs
        let offsetNew = this.props.data.weather.timeOffset; // in sec from API
        offsetNew = offsetNew * 1000; //milliseconds
        let actualTime = d.getTime() + offset + offsetNew;//Local offset + offset of city
        let locationTime = new Date(actualTime).toString();
        const daysFull = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
        const daysHalf = ['Mon','Tues','Wed','Thu','Fri','Sat','Sun'];
        const monthHalf = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let split = locationTime.split(' ');

        let day = '';
        let month = '';
        let date = split[2];
        let year = split[3];
       
        for(let i=0;i<12;i++){
            if(split[1] === monthHalf[i]){
                if(i<9)
                    month = '0'+(i+1)
                else
                    month = i+1
            } 
        }

        for(let i=0;i<7;i++){
            if(split[0] === daysHalf[i])
                day = daysFull[i]
        }

        return {
            day,date,month,year
        }

    }  



    render() {
        const image = this.decideMainImage();
        const {day,date,month,year} = this.getDateNow(); 

        return (
                <div className="top-stack col-12 d-flex justify-content-center align-items-center">
                    <div className="col-12 col-md-3 side-info px-0 align-self-start">
                        <p className="day">{day}</p>
                        <p className="date">{date}/{month}/{year}</p>
                        <p className="humidity"><i className="fas fa-tint"></i>{this.props.data.weather.humidity}%</p>
                        <p className="pressure"><i className="fas fa-long-arrow-alt-down"></i>{this.props.data.weather.pressure} bars</p>
                        <p className="windspeed"><i className="fas fa-wind"></i>{this.props.data.weather.windspeed}<span className="lc">&nbsp;m/s</span></p>
                    </div>
                    <div className="col-12 col-md-9 main-info d-flex px-0">
                        <div className="col-12 col-sm-4 weather-info px-0 text-left">
                            <div className="main-symbol"><i className={image}></i></div>
                            <div className="description">{this.props.data.weather.description}</div>
                        </div>
                        <div className="col-12 col-sm-8 pl-2 weather-info text-left">
                            <ul className="min-max-temp mb-0 d-flex justify-content-center align-items-center">
                                <li><i className="fas fa-long-arrow-alt-down"></i>{this.state.useProps ? this.props.data.weather.tempminC:this.state.tempmin}&#730;</li>
                                <li><i className="fas fa-long-arrow-alt-up"></i>{this.state.useProps ? this.props.data.weather.tempmaxC:this.state.tempmax}&#730;</li>
                            </ul>
                            <p className="temperature"><i className="fas fa-thermometer-half"></i> {this.state.useProps ? this.props.data.weather.temperatureC:this.state.temperature}{this.state.unit}</p>
                            <p className="feelslike">Feels Like <span className="icon">~</span>{this.state.useProps ? this.props.data.weather.feelslikeC:this.state.feelslike}{this.state.unit}</p>
                        </div>
                    </div>  
                </div>
        )
    }
}

export default WeatherListMain
