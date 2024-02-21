import {useState, useEffect} from 'react';
import axios from 'axios';
import HomePage from './HomePage';

export default function Ecom()
{
 
  const [APIData, setAPIData] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(
     ()=>{
      
      const api = async ()=>{
        
        axios.get('https://fakestoreapi.com/carts/1')
      .then(
        (response) => {
          
          setAPIData(response.data);
          
        }
      )
      .catch(()=>{console.log("error")})

      }
      api();
    },[]
     
    
    )

 

  useEffect(
    ()=>{
      
      const v = APIData ? Object.keys(APIData).length : 0;
      if( v>0){
        
        const fetchProducts = async ()=>{
             const productData = await Promise.all(
               
              APIData.products.map(
                async (prod) =>{

                 try{
                  
                  const response = await axios.get(`https://fakestoreapi.com/products/${prod.productId}`);
                  // console.log(response.data);
                  return response.data;
                 }

                 catch(error){
                  console.log("eroor");
                  return null;
                 }
                }
               )
             );

           setProducts(productData);
             
        }
        fetchProducts();
      }
        
      
      
    },[APIData]
  )
  
  

  console.log(products);
          
    
  return(

    <>
    <>
      <HomePage></HomePage>
    </>
    
    <div id="ecom">

        {products.map(
          (i) => {
            return (

              <div id="ecomelement">
                <div id="title"><label>Product: </label><p id="productname">{i.title}</p></div>
                <div> <img id="ecomimg" src={i.image} alt="hi"></img></div>
                <div> <h1>${i.price}</h1> </div>
                <div><p>{i.description}</p></div>
              </div>

            );
          }
        )}
      </div></>    

          )

}