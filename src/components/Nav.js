import React, { Component } from 'react'

export class Loader extends Component {
	
	render() {
		console.log(this.props);
        return (
			<nav className="main-nav">
				<ul>
					<li><a className={`nav-links${this.props.nav.home}`} href="/">Home</a></li>	
					<li><a className={`nav-links${this.props.nav.doc}`} href="/docs">Documentation</a></li>	
				</ul>
        	</nav>
            )
    }
}

export default Loader
