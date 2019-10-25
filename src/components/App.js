import React, { Component } from 'react';
import AppTemplate from './AppTemplate';
//import Counter from './Counter';
import CounterContainer from 'containers/CounterContainer';
import TodosContainer from 'containers/TodosContainer';

class App extends Component {
  render() {
    return (
      <AppTemplate
        counter={<CounterContainer />}
        todos={<TodosContainer />}
      />
    );
  }
}

export default App;
