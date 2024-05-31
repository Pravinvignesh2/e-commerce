import {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import HomePage from './HomePage';
import Footer from './Footer';
import { useSelector, useDispatch } from 'react-redux';
import { id, count , amount, cartAll, allProduct } from './slice';
import Payment from './Payment';

export default function Ecom()
{
 
  // const [cartProducts, setcartProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [products1, setProducts1] = useState([]); 

  // const [formData, setFormData] = useContext(contextCreate);
  const ID = useSelector((s)=> s.id.value);
  const cartProducts= useSelector((s)=>s.cart.value);
  const allProducts = useSelector((s)=>s.allProducts.value);
  const [Quantity, setQuantity] = useState({});
  const [dispatchArray, setDispatchArray] = useState([]);

  console.log("cartProduct",dispatchArray);
  // console.log("API",cartProducts);

  const dispatch=useDispatch();
 

  
    // console.log("formdataaaaa "+ JSON.stringify(cartProducts));
    //console.log("lengthhhhh "+ Object.keys(formData).length);

  

   useEffect(
    ()=>{
      const v = dispatchArray.length>0 ? dispatchArray.length : 0;
      if( v>0){
        console.log("dispatch ",dispatchArray);
        dispatch(cartAll(dispatchArray));
      }
   },[dispatchArray])

  useEffect(
    ()=>{
      
      const v = cartProducts.length>0 ? cartProducts.length : 0;
      if( v>0){
        
        const fetchProducts = async ()=>{

          const productData = [];

          cartProducts.map(
            (item)=>{
                
                console.log("item",item);
                const exists = allProducts.find((allProductsItem) => allProductsItem.id == item.productId);
                console.log("products",products);
                const index = products.findIndex((exist) => exist && exist.id== exists.id);
                console.log("exista1",exists);
                
               if( exists ){
                // setProducts(products.push(exists));//push
                if( index == -1){
                  setProducts([...products,exists]);
                  console.log("exista",exists);
                  return productData.push(exists);
                }
               
               }
            }
          )

           
           console.log("productData ",productData);

           const initialQuantities = productData.flat().reduce((acc, curr) => {
            acc[curr.id] = 1;
            return acc;
          }, {});
          console.log("itnitialllll  "+JSON.stringify(initialQuantities))
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
        
      
      
    },[cartProducts]
  )
  
  // const [Quantity, setQuantity] = useState({});
  const [price,setPrice] = useState({})
  const [initPrice , setInitPrice] = useState({});
  const [total, setTotal] = useState(0);
  
  // const ecomObj = useState({});  

  console.log("price "+ Quantity)  
  // console.log("total "+ JSON.stringify(total)) 
  // console.log("initprice "+ JSON.stringify(initPrice))
  console.log("products",products);

  useEffect(
    ()=>{
      dispatch(amount(total))
    },[total]
  );

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
    
     setQuantity({...Quantity,[i] : Quantity[i]+1});
     add(i);
  }
    
  const minus =(i)=>{
      console.log("qqqq ",Quantity[i]);
      if(Quantity[i]>0){
         setQuantity({...Quantity, [i] : Quantity[i]-1});
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
                      {/* {console.log("title ",i.title)} */}
                      <Link to={`/Allproduct/${i.title}/${i.id}`}>  <div class="d-flex align-items-center">
                            <img src={i.image} class="img-fluid me-5 rounded-circle" style={{width: "80px", height: "80px"}} alt=""/>
                        </div>
                      </Link> 
                    </th>
                    <td>
                        <p class="mb-0 mt-4">{i.title}</p>
                        {console.log(i.price)}
                        
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
                            <input type="text" id={i.id} class="form-control form-control-sm text-center border-0" style={{backgroundColor:"transparent"}} value={Quantity[i.id]} readOnly/>
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
                          <div class="loading"  style={{marginTop: "190px"}}>
                              <div class="loader"></div>
                          </div>
                        )}
                  </tbody>
                 </table> 
            
        </div>
    </div>
</div>


<div class="mt-5" styel={{marginTop:"10px" , backgroundColor:"grey"}}>
                    {/* <input type="text" class="border-0 border-bottom rounded me-5 py-3 mb-4" placeholder="Coupon Code"/> */}
                    {/* <button class="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button">Apply Coupon</button> */}
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
                                <p class="mb-0 pe-4">${parseFloat(total ).toFixed(2)}</p>
                                
                            </div>
                            <Link to="/CheckoutForm" class="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button">Proceed Checkout</Link>
                        </div>
                    </div>
                </div>
              <Footer></Footer>
 </>          
         

  )

          

}


            //  const productData = await Promise.all(
               
            //   cartProducts.map( (product)=>{
            //     // console.log("product "+JSON.stringify(product));
              
            //    return  Promise.all(
            //       product.products.map(

            //         async (product)=>{
            //           const response = await axios.get(`https://fakestoreapi.com/products/${product.productId}`);
            //           return response.data;
            //         }
            //       )
            //      )
                 
            //     }
                
            //    )
            //        );

            //const productData = await Promise.all(

              // cartProducts.map(
              //   product => {
              //     console.log("productId ",product.productId);
              //     // return Promise.all(
              //       async ()=>{
              //         const response = await axios.get(`https://fakestoreapi.com/products/${product.productId}`);
              //         console.log("reponse ",response.data);
              //         // setProducts(response.data);
              //       }
                  // )
                //}
              //)
            //)
            
            // productData();

            // const productData = async () => {
            //     return await Promise.all(cartProducts.map(this.getSingleProductInfo));
            // }

            // const getSingleProductInfo = async (product) => {                
            //     return await axios.get(`https://fakestoreapi.com/products/${product.productId}`)
            //       .then(response => {
            //             response.json();
            //             console.log("Response: " + response.json());
            //         }
            //       );
            // }




            //    api for user cart ,unnecessary

            // axios.get(`https://fakestoreapi.com/carts/user/${ID}`)
      // .then(
      //   (response) => {
      //     console.log("response ",response.data);
      //     response.data.map(
      //       data => {
      //         data.products.map(
      //           item => {
                  
      //             setDispatchArray(dispatchArray => {
      //               const existingIndex = dispatchArray.findIndex(items => items.productId === item.productId);
      //               console.log("existing",existingIndex);
      //               if (existingIndex !== -1) {
      //                   // If the product already exists, update its quantity
      //                   const newArray = [...dispatchArray];
      //                   console.log("new",newArray);
      //                   setQuantity(
      //                     Quantity=>({
      //                        ...Quantity,
      //                        [newArray[existingIndex].ProductId]:Quantity[newArray[existingIndex].productId]+1
      //                     }
      //                   )
      //                   );
                        
      //                   return [...newArray,{"productId":newArray[existingIndex].productId , "quantity": newArray[existingIndex].quantity+1}];
      //               } else {
      //                   // If the product doesn't exist, add it to the array
      //                   return [...dispatchArray, {"productId": item.productId, "quantity": item.quantity}];
      //               }
      //           });

                 
      //           }
      //         )
      //       }
      //     )
