import React from 'react';
import ReactDOM from 'react-dom';
import MountTester from './mount-tester';
import Heart from './heart';
import EventTester from './event-tester';
import RefTester from './ref-tester';
import UpdateTester from './update-tester';
import FilteredIterator from './filtered-iterator';
import HigherOrderTester from './higher-order-component-test';

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

	// fires every time state changed
	render() {
		let txt = this.props.txt;
		let cat = this.props.cat;
		// method render call every time
		return (
			<div>
				<div className='row'>
					<div className='col-sm-4'>
						<div className='well'>
							<Widget update={this.update.bind(this)}>
								I <Heart color="orange"/> React
							</Widget>
						</div>
					</div>
					<div className='col-sm-4'>
						<ul className='well'>
							<li>Text: {txt}</li>
							<li>Cat: {cat}</li>
							<li>State: {this.state.txt}</li>
							<li>EventTester component: <EventTester /></li>
						</ul>
					</div>
					<div className='col-sm-4'>
						<div className='panel panel-default'>
							<div className='panel-heading'>RefTester component:</div>
							<div className='panel-body'>
								<RefTester />
							</div>
						</div>
					</div>
				</div>
				<div className='row'>
					<div className='col-sm-4'>
						<div className='panel panel-default'>
							<div className='panel-heading'>Mounting component:</div>
							<div className='panel-body'>
								<MountTester />
							</div>
						</div>
					</div>
					<div className='col-sm-4'>
						<div className='panel panel-default'>
							<div className='panel-heading'>Update tester:</div>
							<div className='panel-body'>
								<UpdateTester />
							</div>
						</div>
					</div>
					<div className='col-sm-4'>
						<div className='panel panel-default'>
							<div className='panel-heading'>Filtered iterator:</div>
							<div className='panel-body'>
								<FilteredIterator />
							</div>
						</div>
					</div>
				</div>
				<div className='row'>
					<div className='col-sm-4'>
						<div className='panel panel-default'>
							<div className='panel-heading'>HOC tester:</div>
							<div className='panel-body'>
								<HigherOrderTester />
							</div>
						</div>
					</div>
					<div className='col-sm-4'>
						<div className='panel panel-default'>
							<div className='panel-heading'>-:</div>
							<div className='panel-body'>

							</div>
						</div>
					</div>
					<div className='col-sm-4'>
						<div className='panel panel-default'>
							<div className='panel-heading'>-:</div>
							<div className='panel-body'>

							</div>
						</div>
					</div>
				</div>
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

App.propTypes = {
	txt: React.PropTypes.string,
	cat: React.PropTypes.number.isRequired
};

// default properties for app
App.defaultProps = {
	txt: 'default txt property',
	cat: 'default cat prop'
};


export default App;
