import React from 'react';
import ReactDOM from 'react-dom';

class UpdateTester extends React.Component {
	constructor () {
		super();
		this.state = {
			value: 0
		};
	}

	add () {
		this.setState({
			value: this.state.value + 1
		});
	}

	substract () {
		this.setState({
			value: this.state.value - 1
		});
	}

	render () {
		return (
			<div>
				<button onClick={this.add.bind(this)}>+</button>
				<button onClick={this.substract.bind(this)}>-</button>
				<UpdateTesterScreen val={this.state.value} />
			</div>
		)
	}
}

class UpdateTesterScreen extends React.Component {
	constructor () {
		super();
		this.state = {
			increasing: false
		};
	}

	/**
	 * is triggered when component receives new props
	 */
	componentWillReceiveProps (property) {
		this.setState({
			increasing: property.val > this.props.val
		});
	}

	/**
	 * checker whether visual representation should update
	 * prevents rerender of the component
	 */
	shouldComponentUpdate (nextProps, nextState) {
		// it update only when next prop is aliquot to 2
		return nextProps.val % 2 === 0;
	}

	/**
	 * Indicates when component was rerendered/updated
	 */
	componentDidUpdate (prevProp) {
		console.log('ujeen ----> prevProp : ', prevProp.val);
	}

	getStyle () {
		return {
			color: this.state.increasing ? 'red' : 'blue'
		}
	}

	render () {
		return (
			<b style={this.getStyle()}> > {this.props.val}</b>
		)
	}
}

export default UpdateTester;
