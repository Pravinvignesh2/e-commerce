import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HomePage from './HomePage';
import Footer from './Footer';

export default function AllProduct1(props) {
    const [allProducts, setAllProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(response => {
                setAllProducts(response.data);
            })
            .catch(error => {
                console.error("Error fetching products: ", error);
            });
    }, []);

    // Logic to get current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            <HomePage />
            <div id="Allproduct">
                {currentProducts.map(i => (
                    <div key={i.id} className="col-md-6 col-lg-4 col-xl-3 border border-secondary" id="ProductElement">
                        <Link to={`/Allproduct/${i.id}`}>

{/* <div id="ProductElement">
     <div id="title"><p id="productname">{i.title}</p></div>
     <div className="image-container">
         <img id="ecomimg" src={i.image} alt="Product" />
     </div>                           
     <div className="price"> <h1>${i.price}</h1> </div>

  </div> */}
  <div class="col-md-6 col-lg-4 col-xl-3 border border-secondary" id="ProductElement">
         <div class="rounded position-relative fruite-item">
             <div class="fruite-img image-container " id="imge1">
                 <img src={i.image} class="img-fluid w-100 rounded-top" id="ecomimg" alt=""/>
             </div>
             {/* <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{top: "10px", left: "10px"}}>
             {categories.includes(i.category) ? i.category : 'Other'}
             </div> */}
             <div class="p-4  border-top-0 rounded-bottom">
                 <h4 id="title">{i.title}</h4>
                 {/* <p>{i.description}</p> */}
                 <div class="d-flex justify-content-between flex-lg-wrap" id="price-bottom">
                     <p  class="price text-dark fs-5 fw-bold mb-0">${i.price}</p>
                     <a href="#" class="btn border border-secondary rounded-pill px-3 text-primary" ><i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                 </div>
             </div>
         </div>
     </div>
</Link>

                    </div>
                ))}
            </div>
            {/* Pagination */}
            <nav>
                <ul className="pagination">
                    {Array.from({ length: Math.ceil(allProducts.length / productsPerPage) }, (_, index) => (
                        <li key={index} className="page-item">
                            <button onClick={() => paginate(index + 1)} className="page-link">{index + 1}</button>
                        </li>
                    ))}
                </ul>
            </nav>
            <Footer />
        </>
    );
}
