import React, { Component } from 'react';

import Shelf from '../Shelf';
import Filter from '../Shelf/Filter';
import GithubCorner from '../github/Corner';
import FloatCart from '../FloatCart';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <h1 style={{ textAlign: 'center' }}>
          Does this count as a visible change?
        </h1>
        <GithubCorner />
        <main>
          <Filter />
          <Shelf />
        </main>
        <FloatCart />
      </React.Fragment>
    );
  }
}

export default App;
