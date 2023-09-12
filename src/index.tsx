import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalStyle } from './GlobalStyle';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </Provider>
);
