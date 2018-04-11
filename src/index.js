import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import StoryPage from './StoryPage';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const store = createStore(reducers);

ReactDOM.render(

  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/story" component={StoryPage} />
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </Provider>, document.getElementById('root'));