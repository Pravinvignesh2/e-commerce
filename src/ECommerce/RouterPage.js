import Ecom from "./Ecom";
import HomePage from "./HomePage";
import AllProduct from "./AllProduct";
<<<<<<< HEAD
import Register from "./Register";
=======
import Login from "./Login";
>>>>>>> cad99bc7cb2f207adb5281e08a9230c5b1130ca3
import {Routes, Route} from 'react-router-dom';



export default function RouterPage()
{
    return (
<<<<<<< HEAD
          <Routes>
                <Route path="/AllProduct" element={<AllProduct></AllProduct>}></Route> 
                <Route path="/" element={<Register></Register>}></Route>
=======
        
            <Routes>
                {/* <Route path="/" element={<HomePage></HomePage>}></Route> */}
                <Route path="/AllProduct" element={<AllProduct></AllProduct>}></Route>
                <Route path="/Login" element={<Login></Login>}></Route>
                <Route path="/" element={<Login></Login>}></Route>
>>>>>>> cad99bc7cb2f207adb5281e08a9230c5b1130ca3
                <Route path="/Ecom" element={<Ecom></Ecom>}></Route>
           </Routes>
    )
}