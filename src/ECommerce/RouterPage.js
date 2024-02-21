import Ecom from "./Ecom";
import HomePage from "./HomePage";
import AllProduct from "./AllProduct";
import Register from "./Register";
import Login from "./Login";
<<<<<<< HEAD



=======
>>>>>>> 4022bcb2f7cffc293f4c5d94d11a29db4094029d
import {Routes, Route} from 'react-router-dom';
import ProductDetail from "./ProductDetails";



export default function RouterPage()
{
<<<<<<< HEAD
    return 
          <Routes>
                {/* <Route path="/" element={<Register></Register>}></Route> */}

=======
    return (

         

          <Routes>
                {/* <Route path="/" element={<Register></Register>}></Route> */}
>>>>>>> 4022bcb2f7cffc293f4c5d94d11a29db4094029d
        
                {/* <Route path="/" element={<HomePage></HomePage>}></Route> */}
                <Route path="/AllProduct" element={<AllProduct></AllProduct>}></Route>
                <Route path="/Login" element={<Login></Login>}></Route>
                <Route path="/" element={<Login></Login>}></Route>
                <Route path="/Register" element={<Register></Register>}></Route>
                <Route path="/HomePage" element={<HomePage></HomePage>}></Route>
                <Route path="/Ecom" element={<Ecom></Ecom>}></Route>
                <Route path="/AllProduct/:productId" element={<ProductDetail></ProductDetail>}></Route>
           </Routes>
   
}