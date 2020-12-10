import React from 'react';
import { BrowserRouter, Route, Redirect, Switch  } from 'react-router-dom';
import Home from './pages/home';
import Vote from './pages/vote';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/voting" component={Vote} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
