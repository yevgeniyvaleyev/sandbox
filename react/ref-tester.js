import React from 'react';
import ReactDOM from 'react-dom';

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

	getStyles () {
		return `
		.ref-tester input {
			width: 30px;
		}
		`;
	}

	render () {
		return (
			<div className='ref-tester'>
				<style>{this.getStyles()}</style>
				<div className='row'>
					<label className='col-sm-8'>- Assigning 'node' to 'a'</label>
					<div className='col-sm-4'>
						<input ref={node => this.a = node} onChange={this.update.bind(this)}/>
						<span> > {this.state.a}</span>
					</div>
				</div>
				<div className='row'>
					<label className='col-sm-8'>- Via reference 'b'</label>
					<div className='col-sm-4'>
						<input ref="b" onChange={this.update.bind(this)}/>
						<span> > {this.state.b}</span>
					</div>
				</div>
				{/*will access components' DOM*/}
				<div className='row'>
					<label className='col-sm-8'>- Assigning 'component' to 'c'</label>
					<div className='col-sm-4'>
						<Input1
							ref={component => this.c = component}
							update={this.update.bind(this)}/>
						<span> > {this.state.c}</span>
					</div>
				</div>
				<div className='row'>
					<label className='col-sm-8'>- Assigning 'component' to 'd' but
						accessing via refs in a component</label>
					<div className='col-sm-4'>
						{/*will have access to refs of components*/}
						<Input2
							ref={component => this.d = component}
							update={this.update.bind(this)}/>
						<span> > {this.state.d}</span>
					</div>
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

export default RefTester;
