import {useState, useEffect} from 'react';
import axios from 'axios';
import HomePage from './HomePage';

export default function Ecom()
{
 
  const [APIData, setAPIData] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(
     ()=>{
      
      const api = async ()=>{
        
        axios.get('https://fakestoreapi.com/carts/user/3')
      .then(
        (response) => {
          // console.log(response.data);
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
               
              APIData.map( (product)=>{
                // console.log("product "+JSON.stringify(product));
              
               return  Promise.all(
                  product.products.map(

                    async (product)=>{
                      const response = await axios.get(`https://fakestoreapi.com/products/${product.productId}`);
                      return response.data;
                    }
                  )
                 )
                 
                }
                
               )
                   );
            
            // console.log(JSON.stringify(productData)); 
           setProducts(productData.flat());
             
        }
        fetchProducts();
      }
        
      
      
    },[APIData]
  )
  
  

    console.log(APIData.length);
          
    
  return(

    <>
    <>
     {/* <style>{`body { background-color: ; }`}</style> */}
      <HomePage></HomePage>
    </>
    
    <div id="ecom">

        {products.map(
          (i) => {
            return (

              <div id="ecomelement">
                <div id="imge"> <img id="ecomimg" src={i.image} alt="hi"></img></div>
                <div id="description"> 
                       <div id="title"><p id="productname">{i.title}</p></div>
                      <div> <h1>${i.price}</h1> </div>
                      <div><p>{i.description}</p></div>
                      <div><button className='btn btn-info'>checkout</button></div>
                      
                 </div>
              </div>

            );
          }
        )}
      </div></>    

          )

}


