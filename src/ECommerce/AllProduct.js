import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import Footer from './Footer';
import HomePage from './HomePage';
import { useLocation } from 'react-router-dom';
import {useParams} from 'react-router';
import {useDispatch} from 'react-redux';
import {allProducts as allProductsFromSlice, cart} from './slice';

export default function AllProduct(props) {
    const [allProducts, setAllProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
    const [currentPageProducts, setCurrentPageProducts] = useState([]);
    const [searchInput,setSearchInput]= useState("");

    

    const dispatch = useDispatch();

    // const location = useLocation();
    
    // const searchValue = location.state?.value || 'All';
    // console.log("search ",searchValue);
    console.log("all ",allProducts);

    const searchValue1 = useParams();
    // console.log(searchValue1.searchProduct, " search ");

    const [searchValue, setSearchValue] = useState("");

    useEffect(
        ()=>{

            if(searchValue1 !== null || searchValue1 !== undefined){
                
                setSearchValue(searchValue1.searchProduct.toLowerCase());
                // console.log("search:",searchValue);
            }   
                }, [searchValue1]
    )
    

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(response => {
                // console.log(" api ");
                setAllProducts(response.data);
                dispatch(allProductsFromSlice(response.data));

                // console.log(" api ",allProducts);
                setFilteredProducts(response.data);
            })
            .catch(error => console.log("error " + error));

        fetch('https://fakestoreapi.com/products/categories')
            .then(response => response.json())
            .then(json => {
                setCategories(json);
            });
    }, [ searchValue ]);

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
            console.log(filteredProducts);
        } else {
            const filtered = allProducts.filter(product => product.category === category);
            setFilteredProducts(filtered);
        }
        setCurrentPage(1); // Reset current page when filters change
    };

    useEffect(
        ()=>{
            
            // console.log(" hi " ,searchValue);
            if(searchValue=="" || searchValue=='all'){
                // console.log(" hi 1 " ,searchValue);
                filterByCategory('All');
            }
            else{
                console.log("faaa ",allProducts);
                const filtered = allProducts.filter(product =>
                    product.title.toLowerCase().includes(searchValue) ||
                    product.description.toLowerCase().includes(searchValue ||
                    product.category.toLowerCase().includes(searchValue) )
                );
                // console.log("before clearing - " + JSON.stringify(filtered));

                if( filtered.length >0 ){
                    // console.log(" filtered ");
                    setFilteredProducts(filtered);
                }   else{
                    // console.log("all");
                    filterByCategory('All')
                }
       
                
            }
        },[searchValue, allProducts]
    )

    // search
    const handleSearchInput= (e)=>{
          setSearchInput(e.target.value);
    }
    const searchProducts = ()=>{
    
        setSearchValue(searchInput);
    }

    // Filter products by minimum rating
    const filterByRating = (minRating) => {
        const filtered = allProducts.filter(product => product.rating.rate >= minRating);
        setFilteredProducts(filtered);
        setCurrentPage(1); // Reset current page when filters change
    };
     
    const filterByPrice = (maxPrice) => {
        const filtered = allProducts.filter(product => parseFloat(product.price) >= maxPrice);
        setFilteredProducts(filtered);
        setCurrentPage(1); // Reset current page when filters change
    };

    //add to cart

    const addToCart = (cartid)=>{
         const find = allProducts.findIndex((item) => item.id===cartid);
         console.log("add ",allProducts[find].id, allProducts[find].quantity);
         dispatch(cart({"productId":allProducts[find].id, "quantity":1}));
    }

    return (
        <>   
                <HomePage />
             
            
            <div className="container-fluid" id="container" style={{ marginTop:"10px" }}>
                 {/* search button */}

                 <div id="searchDivInAllProduct" style={{marginLeft:"auto",marginRight:"auto", gridGap:"15px"}}>
                                 <input type="text" id="searchTab" value={searchInput} onChange={handleSearchInput} placeholder="search products"  ></input>
                                 <button type="submit" id="searchButton" onClick={searchProducts}>search</button>
               </div>
                {/* filter */}
            
                <div className='filterForPhone' >
                    {/* <button className="filterButton" >Filter</button> */}
                    <select onChange={(e) => filterByCategory(e.target.value)}  style={{}}>
                                    <option value="All">All</option>
                                    {categories.map(category => (
                                       (()=>{
                                         const bgColor =  "#" + Math.floor(Math.random() * 16777251).toString(16).padStart(6, '0');
                                         console.log(bgColor);
                                        return (
                                            <option key={category} value={category} style={{backgroundColor:bgColor,padding:"10px",opacity:"0.5"}}>{category}</option>
                                        );
                                       })()
                                    ))}
                     </select>
                </div>

                <div className="row" id="allProductStyle" style={{ marginTop: '10px' }}>

                    {/* Filter part */}
                    <div className="col-md-3 col-sm-3 filter-options" id="filter" style={{marginTop:'150px'}}>
                        <div>
                            <h3 style={{marginBottom:'20px', marginLeft:'110px'}}>Filter</h3>
                            <div className='category'>
                                <h4 className='filter-heading'>Category:</h4>

                                <select onChange={(e) => filterByCategory(e.target.value)}>
                                    <option value="All">All</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            <div className='min-rating'  >
                                <h4 className='filter-heading'>Rating:</h4>
                                <input type="number" min="0" max="5" step="1" onChange={(e) => filterByRating(parseFloat(e.target.value))} style={{marginLeft:'31px'}}/>
                            </div>

                            <div className='max-price'  >
                                <h4 className='filter-heading'>Price:</h4>
                                <input type="number" min="0" step="0.01" onChange={(e) => filterByPrice(parseFloat(e.target.value))}  style={{marginLeft:'45px'}}/>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-9">
                        {/* Display products */}
                        <div className="row" id='Allproduct'>
                            {currentPageProducts.map(product => (
                                <div key={product.id} className="col-md-6 col-lg-4 col-xl-3" id="ProductElement">
                                    <Link to={`/Allproduct/${searchValue}/${product.id}`}>
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
                                                        <button className="btn border border-secondary rounded-pill px-3 text-primary" onClick={()=>{addToCart(product.id)}} ><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</button>
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
            <Footer style={{bottom:"0"}}/>
        </>
    );
    
}