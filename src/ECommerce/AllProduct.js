import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import Footer from './Footer';
import HomePage from './HomePage';

export default function AllProduct(props) {
    const [allProducts, setAllProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
    const [currentPageProducts, setCurrentPageProducts] = useState([]);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(response => {
                setAllProducts(response.data);
                setFilteredProducts(response.data);
            })
            .catch(error => console.log("error" + error));

        fetch('https://fakestoreapi.com/products/categories')
            .then(response => response.json())
            .then(json => {
                setCategories(json);
            });
    }, []);

    useEffect(() => {
        const lastIndex = currentPage * productsPerPage;
        const firstIndex = lastIndex - productsPerPage;
        const currentProducts = filteredProducts.slice(firstIndex, lastIndex);
        setCurrentPageProducts(currentProducts);
    }, [currentPage, filteredProducts]);

    const paginate = page => setCurrentPage(page);


    // Filter products by category
    const filterByCategory = (category) => {
        if (category === 'All') {
            setFilteredProducts(allProducts);
        } else {
            const filtered = allProducts.filter(product => product.category === category);
            setFilteredProducts(filtered);
        }
        setCurrentPage(1); // Reset current page when filters change
    };

    // Filter products by minimum rating
    const filterByRating = (minRating) => {
        const filtered = allProducts.filter(product => product.rating.rate >= minRating);
        setFilteredProducts(filtered);
        setCurrentPage(1); // Reset current page when filters change
    };

// useEffect(() => {
//     console.log("AllProduct:", AllProduct);
//     console.log("currentPageProducts:", currentPageProducts);
// }, [AllProduct, currentPageProducts]);

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
                  
                     <div id="loopButtonDiv">  <button id="loopButton" onClick={() => paginate(index + 1)}>{index + 1}</button></div>
                  
            )))}


    // Filter products by maximum price
    const filterByPrice = (maxPrice) => {
        const filtered = allProducts.filter(product => product.price <= maxPrice);
        setFilteredProducts(filtered);
        setCurrentPage(1); // Reset current page when filters change
    };

    return (
        <>
            <HomePage />
            <div className="container-fluid" style={{ marginTop: '160px' }}>
                <div className="row">
                    <div className="col-md-3 filter-options">
                        <div>
                            <h3 style={{marginBottom:'20px'}}>Filter</h3>
                            <div className='category'>
                                <h4 className='filter-heading'>Category:</h4>
                                <select onChange={(e) => filterByCategory(e.target.value)}>
                                    <option value="All">All</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='min-rating'>
                                <h4 className='filter-heading'>Minimum Rating:</h4>
                                <input type="number" min="0" max="5" step="1" onChange={(e) => filterByRating(parseFloat(e.target.value))} />
                            </div>
                            <div className='max-price'>
                                <h4 className='filter-heading'>Maximum Price:</h4>
                                <input type="number" min="0" step="0.01" onChange={(e) => filterByPrice(parseFloat(e.target.value))} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        {/* Display products */}
                        <div className="row" id='Allproduct'>
                            {currentPageProducts.map(product => (
                                <div key={product.id} className="col-md-6 col-lg-4 col-xl-3" id="ProductElement">
                                    <Link to={`/Allproduct/${product.id}`}>
                                        <div className="border border-secondary mb-4 rounded">
                                            <div className="rounded position-relative fruite-item">
                                                <div className="fruite-img image-container " id="imge1">
                                                    <img src={product.image} className="img-fluid w-100 rounded-top" id="ecomimg" alt="" />
                                                </div>
                                                <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: "0", left: "10px" }}>
                                                    {categories.includes(product.category) ? product.category : 'Other'}
                                                </div>
                                                <div className="p-4 border-top-0 rounded-bottom">
                                                    <h4 id="title">{product.title}</h4>
                                                    <div className="d-flex mb-4">
                                                        <StarRating rating={product.rating.rate} />
                                                        <span className="ms-2">{product.rating.count} reviews</span>
                                                    </div>
                                                    <div className="d-flex justify-content-between flex-lg-wrap" id="price-bottom">
                                                        <p className="price text-dark fs-5 fw-bold mb-0">${product.price}</p>
                                                        <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary" ><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        {/* Pagination */}
                        <div className="d-flex justify-content-center mt-4">
                            {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
                                <button key={index} className="btn btn-secondary me-2" onClick={() => paginate(index + 1)}>{index + 1}</button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}