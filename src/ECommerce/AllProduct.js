import {useState, useEffect} from 'react';
import axios from 'axios';
import HomePage from './HomePage';

export default function AllProduct(){

    const [AllProduct, setAllProduct] = useState([]);

    useEffect(
        ()=>{
           axios.get('https://fakestoreapi.com/products')
           .then(
            (response)=>{
                   console.log(response);
                   setAllProduct(response.data);
            }
           )
           .catch((error)=>{ console.log("error" + error)})
        },[]
    );


return (
    <>
    <>
       <HomePage></HomePage>
    </>
    <div id="Allproduct">
       
        {
            AllProduct.map(
                (i)=>{
                 return (
                       <div id="ProductElement">
                            <div id="title"><p id="productname">{i.title}</p></div>
                            <div className="image-container">
                                <img id="ecomimg" src={i.image} alt="Product" />
                            </div>                           
                            <div className="price"> <h1>${i.price}</h1> </div>
                     
                            {/* <div> <h1>${i.price}</h1> </div> */}
                            {/* <div><p>{i.description}</p></div> */}
                         </div>
                 )
                }
            )
        }
    </div></>
)
}