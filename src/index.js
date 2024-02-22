import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter} from 'react-router-dom';
import RouterPage from './ECommerce/RouterPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(


 
      

  <React.StrictMode>
    <BrowserRouter>
       <RouterPage></RouterPage>
    </BrowserRouter>
  </React.StrictMode>
);