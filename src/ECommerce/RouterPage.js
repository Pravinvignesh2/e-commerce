import Ecom from "./Ecom";
import HomePage from "./HomePage";
import AllProduct from "./AllProduct";
import {Routes, Route} from 'react-router-dom';



export default function RouterPage()
{
    return (
          <Routes>
                {/* <Route path="/" element={<HomePage></HomePage>}></Route> */}
                <Route path="/" element={<AllProduct></AllProduct>}></Route>
                <Route path="/Ecom" element={<Ecom></Ecom>}></Route>
           </Routes>
    )
}