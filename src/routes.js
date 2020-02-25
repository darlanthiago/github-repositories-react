import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Repository from './pages/Repository';
import Main from './pages/Main';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/repositories/:repository" component={Repository} />
        <Redirect to="/" /> {/* NotFound Route */}
      </Switch>
    </BrowserRouter>
  );
}
