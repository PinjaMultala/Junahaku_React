import React, { Component } from "react";


class Clock extends React.Component {
	
	constructor(props) {
		
		super(props)
		
		this.state = {
			time: new Date()
		}
		
	}
	
	componentDidMount() {
		
		setInterval(this.update, 1000)
		
	}
	
	update = () => {
		
		this.setState({
			time: new Date()
		})
		
	};
	
	render() {
		
		const h = this.state.time.getHours()
		const m = this.state.time.getMinutes()
		const s = this.state.time.getSeconds()
		
		return (
            <div className="clock__box">
		
			<p className="clock__style">{h % 24}:{(m < 10 ? '0' + m : m)}:{(s < 10 ? '0' + s : s)}</p>
		</div>
		)
		
	}
	
}

// render(
// <Clock />, document.getElementById('mount'))

export default Clock;