import React from 'react';
import ReactDOM from 'react-dom';

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
				<div className='row'>
					<div className='col-sm-6'>
						<div className='well'>
							<Widget update={this.update.bind(this)}>
								I <Heart color="orange"/> React
							</Widget>
						</div>
					</div>
					<div className='col-sm-6'>
						<ul className='well'>
							<li>Text: {txt}</li>
							<li>Cat: {cat}</li>
							<li>State: {this.state.txt}</li>
							<li>EventTester component: <EventTester /></li>
						</ul>
					</div>
				</div>
				<div className='row'>
					<div className='col-sm-12'>
						<div className='panel panel-default'>
							<div className='panel-heading'>RefTester component:</div>
							<div className='panel-body'>
								<RefTester />
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

class RefTester extends React.Component {
	constructor () {
		super();
		this.state = {}
	}

	update () {
		this.setState({
			a: this.a.value,
			b: this.refs.b.value,
			c: ReactDOM.findDOMNode(this.c).value,
			d: this.d.refs.input.value
		});
	}

	render () {
		return (
			<div>
				<div>
					<label className='pullLeft'>Assigning 'node' to 'a'</label>
					<input className='pullLeft' ref={node => this.a = node} onChange={this.update.bind(this)}/>
					<span> > {this.state.a}</span>
				</div>
				<div>
					<label>Via reference 'b'</label>
					<input ref="b" onChange={this.update.bind(this)}/>
					<span> > {this.state.b}</span>
				</div>
				{/*will access components' DOM*/}
				<div>
					<label>Assigning 'component' to 'c'</label>
					<Input1
						ref={component => this.c = component}
						update={this.update.bind(this)}/>
					<span> > {this.state.c}</span>
				</div>
				<div>
					<label>Assigning 'component' to 'd' but accessing via refs in a component</label>
					{/*will have access to refs of components*/}
					<Input2
						ref={component => this.d = component}
						update={this.update.bind(this)}/>
					<span> > {this.state.d}</span>
				</div>
			</div>
		)
	}
}

// test input component
class Input1 extends React.Component {
	render () {
		return <input onChange={this.props.update}/>
	}
}
class Input2 extends React.Component {
	render () {
		return <span><input ref="input" onChange={this.props.update}/></span>
	}
}
// default properties for app
App.defaultProps = {
	txt: 'default txt property',
	cat: 'default cat prop'
};


export default App;
