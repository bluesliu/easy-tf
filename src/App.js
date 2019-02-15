import React, { Component } from 'react';
import BlockTest from "./test/BlockTest";
import ContentTest from "./test/ContentTest";
import TextFieldTest from "./test/TextFieldTest";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<BlockTest/>*/}
        <TextFieldTest/>
      </div>
    );
  }
}

export default App;
