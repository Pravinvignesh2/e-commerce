import Ecom from "./Ecom";
import HomePage from "./HomePage";
import AllProduct from "./AllProduct";
import Register from "./Register";
import Login from "./Login";
import Header from "./Header";
import {Routes, Route} from 'react-router-dom';
import ProductDetail from "./ProductDetails";



export default function RouterPage()
{
    return (
          <Routes>

       

                {/* <Route path="/" element={<Register></Register>}></Route> */}
        
                <Route path="/" element={<AllProduct></AllProduct>}></Route>

                <Route path="/AllProduct" element={<AllProduct></AllProduct>}></Route>
                <Route path="/Login" element={<Login></Login>}></Route>
                {/* <Route path="/" element={<Login></Login>}></Route> */}
                <Route path="/Register" element={<Register></Register>}></Route>
                <Route path="/Header" element={<Header></Header>}></Route>
                <Route path="/HomePage" element={<HomePage></HomePage>}></Route>
                <Route path="/Ecom" element={<Ecom></Ecom>}></Route>
                <Route path="/AllProduct/:productId" element={<ProductDetail></ProductDetail>}></Route>
           </Routes>
    )
   
   }