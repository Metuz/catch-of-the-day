import React from 'react';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';

import loadSamples from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  constructor() {
    super();
    this.addFish = this.addFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    // getinitialState
    this.state = {
      fishes: {},
      order: {}
    };
  }

  componentWillMount(){
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });

    // check if ther is any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    // update app components order state
    if(localStorage) {
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUnmoun() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextStage) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextStage.order));
  }

  addFish(fish) {
    // update fish state
    console.log(fish)
    const fishes = {...this.state.fishes};
    // add a new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // set fish state
    this.setState({ fishes });
  }

  updateFish(key, updateFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updateFish;
    this.setState({ fishes });
  }

  removeFish(key) {
    const fishes = {...this.state.fishes};
    fishes[key] = null;
    this.setState({ fishes });
  }

  loadSamples() {
    this.setState({
      fishes: loadSamples
    });
  }

  addToOrder(key) {
    // copy order state
    const order = {...this.state.order};
    // add order to state
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  }

  removeFromOrder(key) {
    const order = {...this.state.order};
    delete order[key];
    this.setState({ order });
  }

  render() {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline="Fresh Seafood Market"/>
          <ul className='list-of-fish'>
            {
              Object
                .keys(this.state.fishes)
                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
            }
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}/>
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
          loadSamples={this.loadSamples}
          fishes={this.state.fishes} />
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}
export default App;
