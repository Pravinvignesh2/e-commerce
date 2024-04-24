import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter} from 'react-router-dom';
import RouterPage from './ECommerce/RouterPage';
import { UserProvider } from './ECommerce/context';
import { Route , Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './ECommerce/store';
// import Register from './ECommerce/Register';
// import Header from './ECommerce/Header';
// import Ecom from './ECommerce/Ecom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(


 
      

  <React.StrictMode>
    <Provider store={ store }>
              
    
    <BrowserRouter>
       <RouterPage></RouterPage>
       
    </BrowserRouter>
    </Provider>

    
    {/* <UserProvider>
              <Header />
              <Register></Register>
    </UserProvider> */}
      
  </React.StrictMode>
);