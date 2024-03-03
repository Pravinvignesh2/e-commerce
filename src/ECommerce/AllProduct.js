import {useState, useEffect} from 'react';
import {useLocation} from 'react';
import axios from 'axios';
import HomePage from './HomePage';
import { Link } from 'react-router-dom';
import Footer from './Footer';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import StarRating from './StarRating';



export default function AllProduct(props){

    const [AllProduct, setAllProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    

    useEffect(
        ()=>{
           axios.get('https://fakestoreapi.com/products')
           .then(
            (response)=>{
                //    console.log(response);
                   setAllProduct(response.data);
            }
           )
           .catch((error)=>{ console.log("error" + error)});
           
           fetch('https://fakestoreapi.com/products/categories')
            .then(response => response.json())
            .then(json => {
                // console.log(json);
                setCategories(json);
            });
        },[]
    );


const productsPerPage = 5;
const [currentPage, setCurrentPage] = useState(1);
const [currentPageProducts , setCurrentPageProducts] = useState([]);

useEffect(
    ()=>{

        const lastIndex = currentPage * productsPerPage;
        const firstIndex = lastIndex - productsPerPage;

        const currentProducts = AllProduct.slice(firstIndex, lastIndex);

        setCurrentPageProducts(currentProducts);
    },[currentPage,AllProduct]
)

// console.log( "current products"+ JSON.stringify(currentPageProducts));

useEffect(() => {
    console.log("AllProduct:", AllProduct);
    console.log("currentPageProducts:", currentPageProducts);
}, [AllProduct, currentPageProducts]);

const paginate = page => setCurrentPage(page);

return (
    <>
    <>
       <HomePage ></HomePage>
       
    </>
    { AllProduct.length>0 && currentPageProducts.length>0 ? (
        <>
    
    <div id="paginateDiv">
    <button   id="leftButton" onClick={()=> setCurrentPage(currentPage-1)}  disabled={currentPage === 1}> L </button>

    <div id="Allproduct">
       
        {
            currentPageProducts.map(
                (i)=>{
                 return (
                 <>
                    <Link to={`/Allproduct/${i.id}`}>
                         <div class="col-md-6 col-lg-4 col-xl-3 border border-secondary" id="ProductElement">
                                <div class="rounded position-relative fruite-item">
                                    <div class="fruite-img image-container " id="imge1">
                                        <img src={i.image} class="img-fluid w-100 rounded-top" id="ecomimg" alt=""/>
                                    </div>
                                    <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{top: "10px", left: "10px"}}>
                                    {categories.includes(i.category) ? i.category : 'Other'}
                                    </div>
                                    <div class="p-4  border-top-0 rounded-bottom">
                                        <h4 id="title">{i.title}</h4>
                                        <div className="d-flex mb-4">
                                                <StarRating rating={i.rating.rate} />
                                                <span className="ms-2">{i.rating.count} reviews</span>
                                            </div>
                                        {/* <p>{i.description}</p> */}
                                        <div class="d-flex justify-content-between flex-lg-wrap" id="price-bottom">
                                            <p  class="price text-dark fs-5 fw-bold mb-0">${i.price}</p>
                                            <a href="#" class="btn border border-secondary rounded-pill px-3 text-primary" ><i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                    </Link>

                
                
                         </>)
                }
            )
        }
    </div>
    <button  id="rightButton" onClick={()=> setCurrentPage(currentPage+1)}  disabled={currentPage===Math.ceil(AllProduct.length / productsPerPage)}>R</button> 
    </div>
        
    </>              
    ):null
    }

    { AllProduct.length>0 && currentPageProducts.length>0 &&
     
          
          <div id="paginate-container">
              
            
               
               {   (Array.from({ length: Math.ceil(AllProduct.length / productsPerPage) }, (_, index) => (
                  
                     <div id="loppButtonDiv">  <button id="loopButton" onClick={() => paginate(index + 1)}>{index + 1}</button></div>
                  
            )))}

           
          </div>
     
   }
     {/* </>
    ):null
    } */}
    <Footer></Footer>
    </>
)
}