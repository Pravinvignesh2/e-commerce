import { Link } from 'react-router-dom';
import AllProduct from './AllProduct';
import Header from './Header';

export default function HomePage(props)
{
    

    return (
        <>
            <Header></Header>
        </>
        
        // <div id="HomePage">
        //     {/* <div id="headerdiv"> */}
        //        <header>
        //             <Link to="/AllProduct"><p>AIMPP</p></Link>
                 
        //             <input type="text" className='form-control' placeholder="Search product" ></input>
        //             <button className="btn">Search</button> 

        //             <Link to="/Login" style={{float:"right"} }className="login-anchor">Login</Link>
        //             {/* <p>{props.name}</p> */}

        //             {/* <Link to="/Login">login</Link> */}
        //             <Link to="/Ecom" className='cart'><i class="fa fa-shopping-cart fa-xl" aria-hidden="true"></i></Link>


        //         </header>
        //         {/* </div> */}
        //         <div class="col-xl-6 col-lg-7">
        //             <nav class="header__menu">
        //                 <ul>
        //                     <li class="active"><Link to="/AllProduct">Home</Link></li>
        //                     <li><a href="#">Women’s</a></li>
        //                     <li><a href="#">Men’s</a></li>
        //                     <li><a href="#">Pages</a>
        //                         <ul class="dropdown">
        //                             <li><a href="./product-details.html">Product Details</a></li>
        //                             {/* <li><a href="./shop-cart.html">Shop Cart</a></li> */}
        //                             <li><a href="./checkout.html">Checkout</a></li>
        //                             <li><a href="./blog-details.html">Blog Details</a></li>
        //                         </ul>
        //                     </li>
        //                     <li><a href="./blog.html">Blog</a></li>
        //                     <li><a href="./contact.html">Contact</a></li>
        //                 </ul>
        //             </nav>
        //         </div>

             

        //        {/* <footer>
        //           <p id="footer">copyrights&copy</p>
        //        </footer> */}
        // </div>

    )
}