import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component {
	render () {
		let txt = this.props.txt;
		return <div>{txt}</div>
	}
}

App.propTypes = {
	txt: React.PropTypes.string,
	cat: React.PropTypes.number.isRequired
};

App.defaultProps = {
	txt: 'this is default text'
};

ReactDom.render(
	<App cat={8}/>,
	document.getElementById('app'))

export default App;