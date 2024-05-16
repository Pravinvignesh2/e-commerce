import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import HomePage from './HomePage';
import Footer from './Footer';
import StarRating from './StarRating';


export default function ProductDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [rating,setRating]=useState({});

    useEffect(() => {

        console.log("product ", productId );
        axios.get(`https://fakestoreapi.com/products/${productId}`)
            .then(response => {
                setProduct(response.data);
                console.log(response.data);

                if( response.data.rating.rate){
                setRating(response.data.rating.rate)
                console.log("response from api"+response.data.rating.rate)
                }

                else{
                    console.log(" error ");
                }
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
            });
    }, [productId]);
    
    return (
        <>
            <HomePage />

            {/* <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Shop Detail</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="/AllProduct">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Shop Detail</li>
                </ol>
            </div> */}

            <div className="container-fluid py-5">
                <div className="container-fluid py-5">
                    <div className="row g-4 mb-5">
                        <div className="col-lg-8 col-xl-12 " style={{}}>
                            <div className="row g-6 "   style={{ maxWidth:'100%'}}>
                                <div className="col-lg-6" style={{height:'400px',marginTop:'170px'}}>
                                    {/* <div className="border rounded" style={{ backgroundColor:'black',height:'400px' ,marginLeft:'100px'}} > */}
                                        {product && <img src={product.image} className="img-fluid rounded" id="imge" alt={product.title} style={{ marginLeft:'190px',marginTop:'90px',maxWidth:'100%',maxHeight:'100%'}} />}
                                    {/* </div> */}
                                </div>
                                <div className="col-xxl-6" id="description" style={{height:'500px',marginTop:'170px'}}>
                                    {product && (
                                        <>
                                            <h4 className="fw-bold mb-3">{product.title}</h4>
                                            <p className="mb-3">Category: {product.category}</p>
                                            <h5 className="fw-bold ">${product.price}</h5>
                                            <small className='mt-0'>Inclusive of all taxes</small>
                                            <div className="d-flex mb-4" style={{}}>
                                              { product.rating && <StarRating rating={product.rating.rate} style={{ backgroundColor:'black', marginTop:'5px'}}/>}
                                               { product.rating && <span className="ms-2">{product.rating.count} reviews</span>}
                                            </div>
                                            <h4>Description:</h4>
                                            <p className="mb-4">{product.description}</p>
                                            <p className='m-0 fs-6 fw-bold'>Size:</p>
                                            <select className='d-flex block mb-4 w-25'>
                                                <option>Select</option>
                                                <option>S</option>
                                                <option selected>M</option>
                                                <option>L</option>
                                                <option>XL</option>
                                                <option>XXL</option>

                                            </select>
                                            <a href="#" className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
}
