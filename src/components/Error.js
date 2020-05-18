import React, { Component } from 'react'

export class Error extends Component {
	
	render() {
        return (
			<div className="loader">
        		<p className='error'>Oops! No city found. Try again with another city, such as "Toronto" or "Paris" or "New Delhi"</p>
        	</div>
            )
    }
}

export default Error
