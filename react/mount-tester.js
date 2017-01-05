import React from 'react';
import ReactDOM from 'react-dom';
import Heart from './heart';

class MountTester extends React.Component {
  constructor () {
    super();
  }

  /**
  * this will mount heard componen tinside target container
  */
  mount () {
    ReactDOM.render(<Heart color="red"/>, document.getElementById('mount-test'));
  }

  /**
  * unmounts heard from target container
  */
  unmount () {
    ReactDOM.unmountComponentAtNode(document.getElementById('mount-test'));
  }

  getHeartStyles () {
    return {
      fontSize: '30px'
    }
  }

  render (test) {
    return (
      <div>
        <span id='mount-test' style={this.getHeartStyles()}></span>
        <button onClick={this.mount.bind(this)}>Mount heart</button>
        <button onClick={this.unmount.bind(this)}>Unmount heart</button>
      </div>
    )
  }
}

export default MountTester;
