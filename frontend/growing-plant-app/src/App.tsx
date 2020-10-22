import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './stores/reducers';
import i18n from './i18n/i18n';
import { I18nextProvider } from 'react-i18next';
import { Theming } from './themes/Theming';


function App(): JSX.Element {
  const store = createStore(reducers, applyMiddleware(thunk));

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Theming/>
      </I18nextProvider>
    </Provider>
  );
}

export default App;
