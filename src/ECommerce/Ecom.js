import {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import HomePage from './HomePage';
import Footer from './Footer';

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

           const initialQuantities = productData.flat().reduce((acc, curr) => {
            acc[curr.id] = 1;
            return acc;
          }, {});
          setQuantity(initialQuantities);

          const initialPrice = productData.flat().reduce(
            (acc,curr) =>{
              acc[curr.id] = parseFloat(curr.price.toFixed(2));
              return acc;
            },{}
          )

          const totalPrice = productData.flat().reduce(
            (acc,curr)=>{
                 acc+=curr.price;
                 return acc;
            },0
          )
          setTotal(totalPrice);
          setPrice(initialPrice);
          setInitPrice({...initialPrice});
             
        }
        fetchProducts();
      }
        
      
      
    },[APIData]
  )
  
  const [quantity, setQuantity] = useState({});
  const [price,setPrice] = useState({})
  const [initPrice , setInitPrice] = useState({});
  const [total, setTotal] = useState(0);

  console.log("price "+ JSON.stringify(price))  
  console.log("total "+ JSON.stringify(total)) 
  console.log("initprice "+ JSON.stringify(initPrice))

  const totalFunctionAdd = (i)=>{
       return setTotal(total+ initPrice[i]);
  }

  const totalFunctionSub = (i)=>{
       return setTotal(total - initPrice[i]);
  }
 
  
 const add = (i)=>{
   if(price[i]>0){
    
     price[i] += initPrice[i];
     setPrice({...price, [i]: price[i]});
     totalFunctionAdd(i);
     
   } 
 }

 const Sub = (i)=>{
  if(price[i]>0){
  price[i] -= initPrice[i]; 
  setPrice({...price, [i]:price[i]});
  totalFunctionSub(i);
  
  }
}
  const plus = (i)=>{
    
     setQuantity({...quantity,[i] : quantity[i]+1});
     add(i);
  }
    
  const minus =(i)=>{
      if(quantity[i]>1){
         setQuantity({...quantity, [i] : quantity[i]-1});
        //  setPrice({...price, [i] : price[i]/ parseInt(quantity[i])});
        Sub(i);
      }
  }

    

  const deleteCart = (i) =>{

    axios.delete(`https://fakestoreapi.com/carts/${i}`)
    .then(
      ()=>{}
    ).catch((error)=>{ console.log(error)})
  }
          
    
  return(

    <>
    <>
     
      <HomePage></HomePage>
    </>
    
   
           




<div class="container-fluid py-5"  style={{marginTop:"100px" }}>
    <div class="container py-5">
        <div class="table-responsive">
            <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Products</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>

                        
                   {  products?   (
                          products.map(
                            (i)=>{

                      return(      
                     
                       
                    <tr key={i.id} >
                    <th scope="row">
                      <Link to={`/Allproduct/${i.id}`}>  <div class="d-flex align-items-center">
                            <img src={i.image} class="img-fluid me-5 rounded-circle" style={{width: "80px", height: "80px"}} alt=""/>
                        </div>
                      </Link> 
                    </th>
                    <td>
                        <p class="mb-0 mt-4">{i.title}</p>
                        {console.log(i.title)}
                    </td>
                    <td>
                        <p class="mb-0 mt-4">{i.price}</p>
                    </td>
                    <td>
                        <div class="input-group quantity mt-4" style={{width: "100px"}}>
                            <div class="input-group-btn">
                                <button class="btn btn-sm btn-minus bg-light border"  onClick={()=>{minus(i.id)}}>
                                <i class="fa fa-minus"></i>
                                </button>
                            </div>
                            <input type="text" id={i.id} class="form-control form-control-sm text-center border-0" style={{backgroundColor:"transparent"}} value={quantity[i.id]} readOnly/>
                            <div class="input-group-btn">
                                <button class="btn btn-sm btn-plus rounded-circle bg-light border" onClick={()=>{plus(i.id)}}>
                                    <i class="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <p class="mb-0 mt-4">{parseFloat(price[i.id]).toFixed(2)}</p>
                    </td>
                    <td>
                        <button class="btn btn-md rounded-circle bg-light border mt-4" onClick={deleteCart(i.id)}>
                            <i class="fa fa-times text-danger"></i>
                        </button>
                    </td>
                
                </tr>
                
                            )
                            }
                          )
                        
                        ):(
                          <div class="loading">
                              <div class="loader"></div>
                          </div>
                        )}
                  </tbody>
                 </table> 
            
        </div>
    </div>
</div>


<div class="mt-5" styel={{marginTop:"10px" , backgroundColor:"grey"}}>
                    <input type="text" class="border-0 border-bottom rounded me-5 py-3 mb-4" placeholder="Coupon Code"/>
                    <button class="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button">Apply Coupon</button>
                </div>
                <div class="row g-4 justify-content-end">
                    <div class="col-8"></div>
                    <div class="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                        <div class="bg-light rounded">
                            <div class="p-4">
                                <h1 class="display-6 mb-4">Cart <span class="fw-normal">Total</span></h1>
                                <div class="d-flex justify-content-between mb-4">
                                    <h5 class="mb-0 me-4">Subtotal:</h5>
                                    <p class="mb-0">${parseFloat(total).toFixed(2)}</p>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <h5 class="mb-0 me-4">Shipping</h5>
                                    <div class="">
                                        <p class="mb-0">Flat rate: $3.00</p>
                                    </div>
                                </div>
                                <p class="mb-0 text-end">Shipping to Ukraine.</p>
                            </div>
                            <div class="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                <h5 class="mb-0 ps-4 me-4">Total</h5>
                                <p class="mb-0 pe-4">${parseFloat(total + 3).toFixed(2)}</p>
                            </div>
                            <button class="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button">Proceed Checkout</button>
                        </div>
                    </div>
                </div>
            
              <Footer></Footer>
 </>          
         

  )

          

}


