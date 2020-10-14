import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { AppRouter } from './router/AppRouter';

function App(): JSX.Element {
  const store = createStore(reducers, applyMiddleware(thunk));

  return (
    <Provider store={store}>
      <AppRouter/>
    </Provider>
  );
}

export default App;
