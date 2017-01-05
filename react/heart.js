import React from 'react';
import ReactDOM from 'react-dom';

class Heart extends React.Component {
	// fires only once in the begining
	componentWillMount () {
		console.log('ujeen ---->', 'Heart: will mount')
	}

	// fires once a component mounted
	componentDidMount () {
		console.log('ujeen ---->', 'Heart: component did mount')
	}

	// fires once a component unmounted
	componentWillUnmount () {
		console.log('ujeen ---->', 'Heart: component unmounted')
	}

	render () {
		console.log('ujeen ---->', 'Heart: render');
		return <span style={{color: this.props.color}}>&hearts;</span>
	}
}

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

export default Heart;
