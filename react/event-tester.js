import React from 'react';
import ReactDOM from 'react-dom';

/**
* This component is designed to show event handling in React
*/
class EventTester extends React.Component {
	constructor () {
		super();
		this.state = {currentEvent: '---'};
		this.update = this.update.bind(this);
	}

	update (e) {
		this.setState({currentEvent: e.type});
	}

	render () {
		return (
			<div>
				<textarea
					onKeyPress={this.update}
					onCopy={this.update}
					onCut={this.update}
					onPaste={this.update}
					onBlur={this.update}
					onFocus={this.update}
					onDoubleClick={this.update}
					onTouchStart={this.update}
					onTouchMove={this.update}
					onTouchEnd={this.update}
					cols="10"
					rows="1"
					></textarea>
				<div> > {this.state.currentEvent}</div>
			</div>
		)
	}
}

export default EventTester;
