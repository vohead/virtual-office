import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'typeface-roboto';
import 'normalize-css';

import reducers from './reducers';
import App from './App';
import StoryPage from './StoryPage';
import MuiShowcase from './MuiShowcase';

const store = createStore(reducers);

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Switch>
				<Route path="/story" component={StoryPage} />
				<Route path="/mui" component={MuiShowcase} />
				<Route path="/" component={App} />
			</Switch>
		</Router>
	</Provider>,
	document.getElementById('root')
);
