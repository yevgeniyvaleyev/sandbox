import React from 'react';
import ReactDOM from 'react-dom';

class FilteredIterator extends React.Component {
	constructor () {
		super();
		this.state = {
			items: []
		};
	}

	componentWillMount () {
		fetch('https://swapi.co/api/people/?format=json')
		.then(response => response.json())
		.then(({results: items}) => this.setState({items}))
		// here we directly access results field json and set items with one name,
		// because items filed  of state is the same (es6)
	}

	filter (event) {
		this.setState({filter: event.target.value});
	}

	filterItems (items) {
		return items.filter(item =>
			item.name
			.toLowerCase()
			.includes(this.state.filter.toLowerCase())
		)
	}

	getListStyle () {
		return {
			'maxHeight': '50px',
			'overflowY': 'auto',
			border: '1px dashed #ccc'
		}
	}

	render () {
		let items = this.state.filter ? this.filterItems(this.state.items) : this.state.items;
		return (
			<div>
				Filter: <input type='text' onChange={this.filter.bind(this)} />
			<ul style={this.getListStyle()}>
			{items.map(item =>
				<li key={item.name}>{item.name}</li>
			)}
			</ul>
			</div>
		)
	}
}

export default FilteredIterator;
