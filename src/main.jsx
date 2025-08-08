import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Spinner from './views/spinner/Spinner';
import './utils/i18n';
import { CustomizerContextProvider } from './context/CustomizerContext';

import { Provider } from 'react-redux';
import {store} from './store/authStore';

async function deferRender() {
  ;
}

deferRender().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <CustomizerContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CustomizerContextProvider>,
  )
})
