import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import HomePage from './HomePage';

export default function ProductDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${productId}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
            });
    }, [productId]);

    return (
        <>
            <HomePage />

            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Shop Detail</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Shop Detail</li>
                </ol>
            </div>

            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="row g-4 mb-5">
                        <div className="col-lg-8 col-xl-9">
                            <div className="row g-4">
                                <div className="col-lg-6">
                                    <div className="border rounded">
                                        {product && <img src={product.image} className="img-fluid rounded" alt={product.title} />}
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    {product && (
                                        <>
                                            <h4 className="fw-bold mb-3">{product.title}</h4>
                                            <p className="mb-3">Category: {product.category}</p>
                                            <h5 className="fw-bold mb-3">${product.price}</h5>
                                            <div className="d-flex mb-4">
                                                {/* Add star rating here */}
                                            </div>
                                            <h4>Description:</h4>
                                            <p className="mb-4">{product.description}</p>
                                            <a href="#" className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                                        </>
                                    )}
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            /var/folders/0m/v6__mlcn3m79ncx9tvhscrvc0000gp/T/com.apple.useractivityd/shared-pasteboard/items/7BD08654-86A4-4508-876D-8F386F84DC28/6829dd9c2fcc6801253faecefd1b14560c92e033.rtfd
        </>
    );
}
