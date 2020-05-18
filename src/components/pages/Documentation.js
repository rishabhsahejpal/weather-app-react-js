import React,{Component} from 'react'
import Footer from '../Footer'
import Nav from '../Nav'

class Documentation extends Component{

	render(){

		let classes = '';
		if(this.props.classes === undefined)
			classes = `wrapper`;
		else
			classes = `${this.props.classes}wrapper`;

		return(
	    <div className="main-app">
        	<div className={classes}>
	            <div className='container top d-flex flex-column justify-content-center align-items-center'>
	                <Nav nav={{home: '', doc : ' active'}}/>
					<div className="documentation">
						<h1 className="bold uc">Documentation for Weather App(<span className="lc">v</span>1.0.0)</h1>
						<p>This is the doucmentaiton for weather application <i>v1.0.0</i>. The application uses the OpenWeatherMap <a href="https://openweathermap.org/current">API</a> 
						 &nbsp;for obtaining current weather data and weather conditions for over <strong>150,000</strong> cities all over the world.
						Current weather is frequently updated based on global models and data from more than <strong>40,000</strong> weather stations.</p>
						<p>The application takes city names as input irrespecitve of the case(uppercase or lowercase or a mix of both, eg. tORontO will work 
							as will TORONTO and toronto, all are valid inputs), 
						such as <strong>"Toronto"</strong> or <strong>"Paris"</strong>(without the quotes). Enter the <strong>city</strong> and press submit and various parameters
						will be displayed. Some of them are temperature, humidity and many more will be presented in the panel.</p>
						<p>The application also presents different <strong>hues</strong> based on time of the day, lighter for daytime and darker for night mode. For hot temperatures, the application returns
						with orange-ish color tone. There is also a feature in the application to view temperature in Kelvins, Celsius and Fahrenheits. Furthermore, 
						the application also shows different images for different weather conditions, namely cloudy, rain, snow, clear, drizzle, thunderstrom and shows&nbsp;
						<strong>"?"</strong> sign for any weather condtion with icon unavailable.</p>
						<h3 className="bold uc">Steps to use the application</h3>
						<p className="list">1. Go to the home page of the application</p>
						<p className="list">2. Locate the input field at the top of the page</p>
						<p className="list">3. Enter the city name, irrespecitve of the case of the word</p>
						<p className="list">4. The results will be shown after the loading ends</p>
						<p className="list">5. The results which are shown as: Temperature(different units available), Feels-like temperature, Minimum and Maximum Temperatures for the day, Pressure(bars), Humidity(%), Date and Day at the location. </p>
						<p className="note">Note: Be on lookout for error message, if displayed, which means that city was invalid. In that case, Enter the name again or try different city.</p>
					</div>
	            </div>
	            <div className="container bottom d-flex justify-content-center align-items-center">
	                <Footer />
	            </div>
			</div>              
	    </div>
		)

	}
}

export default Documentation;