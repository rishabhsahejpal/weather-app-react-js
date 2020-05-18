import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Weather from './components/Weather'
import Documentation from './components/pages/Documentation';

function App()  {
  return (
	    <div className="main-app">
		    <Router>		
		    	<Route exact path='/' render={props =>(
		    		<React.Fragment>
						<Weather />
		    		</React.Fragment>
		    	)}	/>
		    	<Route path='/docs' component={Documentation}/>		
			</Router>
	    </div>


			
  );
}

export default App;
