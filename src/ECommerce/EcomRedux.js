import {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import HomePage from './HomePage';
import Footer from './Footer';
import { useSelector, useDispatch } from 'react-redux';
import { id, count , amount, cartAll, cart, allProducts, cartToCheck, checkoutSlice } from './slice';
import Payment from './Payment';

 export default function EcomRedux(){
    
    const cartProducts = useSelector((s) => s.cart.value);
    const productsFromStore = useSelector((s) => s.allProducts.value );
    const dispatch = useDispatch();
    
    const fromCheck = useSelector((s)=> s.cartToCheck.value || [] );
    const [products,setProducts] = useState([]);
    const [price,setPrice] = useState({});
    const [Quantity,setQuantity] = useState({});
    const [total,setTotal] = useState(0);
    const [checkOut, setCheckOut] = useState(fromCheck);
    console.log("cartproducts",cartProducts);
    console.log("products",products);
    console.log("from ",fromCheck);
    console.log("check ",checkOut);
    useEffect(
        ()=>{
        console.log("use");

        const productsDetails = [];

        // if( checkOut.length === 0  ){
            console.log(" userrrr ");
            if( cartProducts ){
                cartProducts.map(
                    (cartItem)=>{
                        const index = productsFromStore.findIndex((item)=> item.id == cartItem.productId);
                        console.log("redux",index);
                        if(index !== -1){
                            console.log("reduxproduct",productsFromStore[index]);
                            productsDetails.push(productsFromStore[index]);
                            
                            setPrice( price=> ({
                                ...price,
                                [productsFromStore[index].id] : productsFromStore[index].price
                            })
                            );
    
                            setQuantity( Quantity=> ({
                                ...Quantity,
                                [productsFromStore[index].id] : cartItem.quantity
                            })
                            );
    
                            setTotal(total => (
                                total+= productsFromStore[index].price
                            ))
                        }
    
                    }
                )
            }
            setProducts(productsDetails);
        // }

        // else{
        //     console.log("else ",fromCheck)
            
        //    if( fromCheck.length>0){
        //     const productDetails = [];
        //     fromCheck.map(
        //         (itemsFromCheck)=>{
        //             productDetails.push(itemsFromCheck.product);
        //                     setPrice( price=> ({
        //                         ...price,
        //                         [itemsFromCheck.product.id] : itemsFromCheck.product.price
        //                     })
        //                     );
    
        //                     setQuantity( Quantity=> ({
        //                         ...Quantity,
        //                         [itemsFromCheck.product.id] : itemsFromCheck.Quantity
        //                     })
        //                     );
    
        //                     setTotal(total => (
        //                         total+= itemsFromCheck.product.price
        //                     ));
        //                 }
        //             )

        //             setProducts(productDetails);
        //     console.log("productDetails ",products)
        //         }
        //     setCheckOut(fromCheck);
        // }
        
        
        },[ cartProducts]
    )

    useEffect(()=>{

        if(fromCheck.length>0){
             fromCheck.map(
                (item)=>{
                    setPrice( price=> ({
                        ...price,
                        [item.product.id] : item.product.price
                    })
                    );
            
                    setQuantity( Quantity=> ({
                        ...Quantity,
                        [item.product.id] : item.Quantity
                    })
                    );
            
                    setTotal(total => (
                        total+= item.product.price
                    ));
                }
             )
        }

    },[])

    const minus = (productIdFromFunct) => {
        setQuantity( Quantity => ({
            ...Quantity,[productIdFromFunct] : Quantity[productIdFromFunct]-1 
        }
     )
    )

        setTotal( total => {
            const find = products.findIndex((item)=> item.id == productIdFromFunct);
            return total=total - products[find].price;
        });
    }

    const plus = (productIdFromFunct) => {
        setQuantity( Quantity => ({
            ...Quantity,[productIdFromFunct] : Quantity[productIdFromFunct]+1 
        }
        )
    )
        setTotal( total => {
            const find = products.findIndex((item)=> item.id == productIdFromFunct);
            return total=total + products[find].price;
         });
    }

    useEffect(
        ()=>{
            console.log(" checkout ");

            if( products && checkOut){
                const updatedCheckOut = products.map(product => {
                    console.log(" checkout 1 ",checkOut);
                    const find = checkOut.findIndex(item => item.product.id === product.id);
                    console.log(" fint ",find);
                    if(find !== -1){
                        console.log("find=1", {"product": product, "Quantity": Quantity[product.id], "price": price[product.id], "total": total});
                        return {"product": product, "Quantity": Quantity[product.id] , "price": price[product.id], "total": total};
                    } 
                    else{
                        console.log("find", {"product": product, "Quantity": Quantity[product.id], "price": price[product.id], "total": total});
                        return {"product": product, "Quantity": Quantity[product.id], "price": price[product.id], "total": total};
                    }
            }
             
        );
        setCheckOut(updatedCheckOut);

        }
       },[ products, Quantity, price, total]
   )
    

    useEffect(
        ()=>{
            
            if( checkOut){
                dispatch(cartToCheck(checkOut));
            }
        },[ checkOut,products ]
    )
    // console.log("check ",checkOut);
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
    
                        {/* checkout - products */}
                       {  checkOut?   (
                         
                              checkOut.map(
                                (i)=>{
    
                          return(      
                         
                           
                        <tr key={i.product.id} >
                        <th scope="row"> 
                          
                           <Link to={`/Allproduct/${i.product.title}/${i.product.id}`}>  <div class="d-flex align-items-center">
                                <img src={i.product.image} class="img-fluid me-5 rounded-circle" style={{width: "80px", height: "80px"}} alt=""/>
                            </div>
                          </Link> 
                        </th>
                        <td>
                            <p class="mb-0 mt-4">{i.product.title}</p>
                            {/* {console.log(i.product.price)} */}
                            
                        </td>
                        <td>
                            <p class="mb-0 mt-4">{i.product.price}</p>
                        </td>
                        <td>
                            <div class="input-group quantity mt-4" style={{width: "100px"}}>
                                <div class="input-group-btn">
                                    <button class="btn btn-sm btn-minus bg-light border"  onClick={()=>{minus(i.product.id)}}>
                                    <i class="fa fa-minus"></i>
                                    </button>
                                </div>
                                <input type="text" id={i.product.id} class="form-control form-control-sm text-center border-0" style={{backgroundColor:"transparent"}} value={Quantity[i.product.id]} />
                                <div class="input-group-btn">
                                    <button class="btn btn-sm btn-plus rounded-circle bg-light border" onClick={()=>{plus(i.product.id)}}>
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p class="mb-0 mt-4">{parseFloat((Quantity[i.product.id]*price[i.product.id])).toFixed(2)}</p>
                        </td>
                        <td>
                            {/* <button class="btn btn-md rounded-circle bg-light border mt-4" onClick={deleteCart(i.id)}> */}
                                <i class="fa fa-times text-danger"></i>
                            {/* </button> */}
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
                        {/* <input type="text" class="border-0 border-bottom rounded me-5 py-3 mb-4" placeholder="Coupon Code"/>
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
                                <Link to="/Payment" class="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button">Proceed Checkout</Link>
                            </div>
                        </div>
                    </div>
                  <Footer></Footer>
     </>          
             
    
      )
}