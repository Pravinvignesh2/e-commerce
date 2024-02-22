import Ecom from "./Ecom";
import HomePage from "./HomePage";
import AllProduct from "./AllProduct";
import Register from "./Register";
import Login from "./Login";
<<<<<<< HEAD

=======
>>>>>>> 99d2a91af5d3f1d3732ef906f16196c5f4431081
import {Routes, Route} from 'react-router-dom';
import ProductDetail from "./ProductDetails";



export default function RouterPage()
{
    return (
          <Routes>
<<<<<<< HEAD
       
=======
                {/* <Route path="/" element={<Register></Register>}></Route> */}
        
                <Route path="/" element={<AllProduct></AllProduct>}></Route>
>>>>>>> 99d2a91af5d3f1d3732ef906f16196c5f4431081
                <Route path="/AllProduct" element={<AllProduct></AllProduct>}></Route>
                <Route path="/Login" element={<Login></Login>}></Route>
                {/* <Route path="/" element={<Login></Login>}></Route> */}
                <Route path="/Register" element={<Register></Register>}></Route>
                <Route path="/HomePage" element={<HomePage></HomePage>}></Route>
                <Route path="/Ecom" element={<Ecom></Ecom>}></Route>
                <Route path="/AllProduct/:productId" element={<ProductDetail></ProductDetail>}></Route>
           </Routes>
    )
   
   )}