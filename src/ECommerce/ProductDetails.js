import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import HomePage from './HomePage';

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(
    () => {
            axios.get(`https://fakestoreapi.com/products/${productId}`)
            .then(
            (response) => {
                console.log(response)
                setProduct(response.data);
            }
            )
            .catch(error => {
                console.error('Error fetching product details:', error);
            });
        }, [productId]);

  return (
    <>
    <>
        <HomePage></HomePage>
    </>
        <div className="product-detail">
        {product ? (
            <div className="product-info">
            <h2 className="product-title">{product.title}</h2>
            <img className="product-image" src={product.image} alt={product.title} />
            <p className="product-description">{product.description}</p>
            <p className="product-price">Price: ${product.price}</p>
            </div>
        ) : (
            // <p className="loading-message">Loading...</p>
            <div class="loading">
                <div class="loader"></div>
            </div>
        )}
         <div class="text-center">
            <button class="btn btn-info my-3">Add to cart</button>
        </div>
        <div class="text-center">
            <button class="btn btn-info my-3">Buy Now</button>
        </div>
        </div>
       
    </>);
}


