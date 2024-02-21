import Ecom from "./Ecom";
import HomePage from "./HomePage";
import AllProduct from "./AllProduct";
<<<<<<< HEAD

import Register from "./Register";

import Login from "./Login";

=======
import Register from "./Register";
import Login from "./Login";
>>>>>>> 0c80ff10fd7e1d5a05676f1491684f009e24fea1
import {Routes, Route} from 'react-router-dom';
import ProductDetail from "./ProductDetails";



export default function RouterPage()
{
    return (

<<<<<<< HEAD
         

=======
          <Routes>
                {/* <Route path="/" element={<Register></Register>}></Route> */}
>>>>>>> 0c80ff10fd7e1d5a05676f1491684f009e24fea1
        
                {/* <Route path="/" element={<HomePage></HomePage>}></Route> */}
                <Route path="/AllProduct" element={<AllProduct></AllProduct>}></Route>
                <Route path="/Login" element={<Login></Login>}></Route>
                <Route path="/" element={<Login></Login>}></Route>
                <Route path="/Register" element={<Register></Register>}></Route>
                <Route path="/HomePage" element={<HomePage></HomePage>}></Route>
                <Route path="/Ecom" element={<Ecom></Ecom>}></Route>
                <Route path="/AllProduct/:productId" element={<ProductDetail></ProductDetail>}></Route>
           </Routes>
    )
}