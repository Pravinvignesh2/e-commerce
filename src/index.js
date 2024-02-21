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

  <React.StrictMode> 
    


  
      

    <BrowserRouter>
       {/* <HomePage></HomePage> */}
       <RouterPage></RouterPage>
    </BrowserRouter>
  </React.StrictMode>
);

