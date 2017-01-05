import React from 'react';
import ReactDOM from 'react-dom';

const HOC = (InnerComponent) => class extends React.Component {
	constructor () {
		super();
		this.state = {
			count: 0
		}
	}

	update () {
		this.setState({
			count: this.state.count + 1
		})
	}

	componentWillMount () {
		console.log('ujeen ---->', 'HOC will mount');
	}

	render () {
		// we spreading props and state to InnerComponent props
		return (
			<InnerComponent
				{...this.props}
				{...this.state}
				update={this.update.bind(this)}
			/>
		)
	}
}

class MyLabel extends React.Component {
	componentWillMount () {
		console.log('ujeen ---->', 'HOCLabel will mount')
	}

	render () {
		return (
			<label onMouseMove={this.props.update}>={this.props.children}={this.props.count}</label>
		)
	}
}

const HOCLabel = HOC(MyLabel);

const HOCButton = HOC((props) => <button onClick={props.update}>{props.children} - {props.count}</button>);

class HigherOrderTester extends React.Component {
	render () {
		// example of creating react elements
		return React.createElement(
			'div',
			null,
			React.createElement(
				HOCButton,
				null,
				'button'
			),
			React.createElement(
				HOCLabel,
				null,
				'label'
			)
		)
	}
}

export default HigherOrderTester;
