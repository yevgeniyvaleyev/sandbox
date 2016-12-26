import React from 'react';

class App extends React.Component {
	constructor () {
		super();
		// represents a state of the component in React
		this.state = {
			txt: 'this is txt state'
		}
	}
	update (e) {
		// this method sets state in React
		this.setState({txt: e.target.value})
	}
	render() {
		let txt = this.props.txt;
		let cat = this.props.cat;
		return (
			<div>
				<Widget update={this.update.bind(this)}>
					I <Heart color="orange"/> React
				</Widget>
				<ul>
					<li>Text: {txt}</li>
					<li>Cat: {cat}</li>
					<li>State: {this.state.txt}</li>
					<li>EventTester component: <EventTester /></li>
				</ul>
			</div>
		)
	}
}

// props.children - does transclusion
const Widget = (props) => {
	return (
		<div>
			<input onChange={props.update} />
			<button>{props.children}</button>
		</div>
	)
};

class Heart extends React.Component {
	render () {
		return <span style={{color: this.props.color}}>&hearts;</span>
	}
}

App.propTypes = {
	txt: React.PropTypes.string,
	cat: React.PropTypes.number.isRequired
};

Heart.propTypes = {
	color(props, propName, component) {
		// validators for properties
		// try change property color
		if(!(propName in props)) {
			return new Error(`missing !${propName}!`);
		}
		if(props[propName].length < 3) {
			return new Error(`${propName} was too short!`);
		}
	}
};

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

// default properties for app
App.defaultProps = {
	txt: 'default txt property',
	cat: 'default cat prop'
};


export default App;