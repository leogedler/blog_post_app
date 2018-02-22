import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
import reducers from './reducers';
import promise from 'redux-promise';

import PostIndex from './components/posts_index';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>


    <BrowserRouter>
      <div>
        <Route path='/' component={PostIndex} />
        {/* <Route path='/post/new' component={PostNew} />
        <Route path='/post/:id' component={PostShow} /> */}
      </div>
    </BrowserRouter>

  </Provider>
  , document.querySelector('.container'));
  // <Router history={browserHistory} routes={routes} />