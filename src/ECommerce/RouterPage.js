import Ecom from "./Ecom";
import HomePage from "./HomePage";
import AllProduct from "./AllProduct";
import Register from "./Register";
import {Routes, Route} from 'react-router-dom';



export default function RouterPage()
{
    return (
          <Routes>
                <Route path="/AllProduct" element={<AllProduct></AllProduct>}></Route> 
                <Route path="/" element={<Register></Register>}></Route>
                <Route path="/Ecom" element={<Ecom></Ecom>}></Route>
           </Routes>
    )
}