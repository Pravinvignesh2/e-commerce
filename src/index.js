import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter} from 'react-router-dom';
import Ecom from './ECommerce/Ecom';
import HomePage from './ECommerce/HomePage';
import RouterPage from './ECommerce/RouterPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<<<<<<< HEAD
  <React.StrictMode> 
    

=======
  <React.StrictMode>
      
>>>>>>> cad99bc7cb2f207adb5281e08a9230c5b1130ca3
    <BrowserRouter>
       {/* <HomePage></HomePage> */}
       <RouterPage></RouterPage>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
