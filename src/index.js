import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter} from 'react-router-dom';
import RouterPage from './ECommerce/RouterPage';
import { UserProvider } from './ECommerce/context';
import { Route , Router} from 'react-router-dom';
// import Register from './ECommerce/Register';
// import Header from './ECommerce/Header';
// import Ecom from './ECommerce/Ecom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(


 
      

  <React.StrictMode>
    <UserProvider>
              
    
    <BrowserRouter>
       <RouterPage></RouterPage>
       
    </BrowserRouter>
    </UserProvider>

    
    {/* <UserProvider>
              <Header />
              <Register></Register>
    </UserProvider> */}
      
  </React.StrictMode>
);