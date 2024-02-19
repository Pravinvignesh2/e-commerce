import {Link} from 'react-router-dom';
import AllProduct from './AllProduct';
export default function HomePage()
{

    return (
        <div id="HomePage">
               <header>
                  <input type="text" placeholder="search product" ></input>
                  <span><button>search</button></span>
               </header>
               <nav>
                   <button><Link to="/"  >Home</Link></button>
                   <button><a  >Products</a></button>
                   <button><a  >Contacts</a></button>
                   <button className="cart" ><Link to="/Ecom">cart</Link></button>
               </nav>
               {/* <div>
                    <AllProduct></AllProduct>
               </div> */}
                
               {/* <footer>
                  <p id="footer">copyrights&copy</p>
               </footer> */}
        </div>
    )
}