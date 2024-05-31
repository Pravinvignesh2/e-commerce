
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import HomePage from './HomePage';
import Footer from './Footer';
import { useSelector, useDispatch } from 'react-redux';
import { id, count, amount, cartAll, cart, deleteItemFromCart, allProducts, cartToCheck, checkoutCart,increment,
    decrement, checkoutSlice, amount1 } from './slice';
import Payment from './Payment';

export default function EcomRedux() {
    const cartProducts = useSelector((s) => s.cart.value);
    const productsFromStore = useSelector((s) => s.allProducts.value);
    const dispatch = useDispatch();

    const fromCheck = useSelector((s) => s.cartToCheck.value || []);
    const [products, setProducts] = useState([]);
    const [price, setPrice] = useState({});
    const [Quantity, setQuantity] = useState({});
    const [totalAmount, setTotal] = useState(0);
    const [checkOut, setCheckOut] = useState(fromCheck);
    const [checkingCheckOut, setCheckingCheckOut] = useState([]);
    console.log("from ",fromCheck);
    console.log(checkingCheckOut);

    useEffect(()=>{
        const miniCheckOut =[];
        cartProducts.map(
 
            (cartProduct)=>{
                const index = productsFromStore.findIndex((item)=> item.id === cartProduct.productId);
                const checkOutProduct = checkOut.find((item)=> item.product.id === productsFromStore[index].id);
                
                miniCheckOut.push({
                    product:productsFromStore[index],
                    Quantity: checkOutProduct? checkOutProduct.Quantity : cartProduct.quantity,
                    price: checkOutProduct? checkOutProduct.price : productsFromStore[index].price,
                    total: checkOutProduct? checkOutProduct.total : totalAmount
                });

                
            }
            
        )
        setCheckOut(miniCheckOut);
        setCheckingCheckOut(miniCheckOut);
        functionForTotal();
    },[cartProducts])

    useEffect(()=>{
        functionForTotal();
        setCheckingCheckOut(fromCheck);
    },[fromCheck,checkOut])
    
    
    const functionForTotal = ()=>{
        const totalValue = checkOut.reduce(
            (acc,value)=>{
                acc+=(value.Quantity * value.price)
                return acc
            },0
        )
        if(totalAmount !== totalValue){
           setTotal(totalValue)
        }
    }

    useEffect(() => {
        const newCheckTotal = checkOut.map((item) => ({ ...item, total: totalAmount }));
        setCheckingCheckOut(newCheckTotal);
    }, [totalAmount]);
    //  console.log(totalAmount);
    // console.log(checkingCheckOut);
    
    useEffect(()=>{
        console.log(" checking ");
        dispatch(cartToCheck(checkingCheckOut))
        checkingCheckOut && checkingCheckOut.length ? (dispatch(amount(checkingCheckOut[0].total))):dispatch(amount(0))
    },[checkingCheckOut,totalAmount])
    

   const decre = (id)=>{
    dispatch(decrement(id))
   }
   const incre = (id)=>{
    dispatch(increment(id))
   }

    const deleteCart = (id) => {
        console.log(id);
        // setQuantity({});
        dispatch(deleteItemFromCart({ productId: id, quantity: 0 }));
    }

    return (
        <>
            <HomePage></HomePage>

            <div className="container-fluid py-5" style={{ Top: "10px" }}>
                <div className="container py-5">
                    <div className="table-responsive">
                        <table className="table">
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
                                {checkingCheckOut ? (
                                    checkingCheckOut.map(i => (
                                        <tr key={i.product.id}>
                                            <th scope="row">
                                                <Link to={`/Allproduct/${i.product.title}/${i.product.id}`}>
                                                    <div className="d-flex align-items-center">
                                                        <img src={i.product.image} className="img-fluid me-5 rounded-circle" style={{ width: "80px", height: "80px" }} alt="" />
                                                    </div>
                                                </Link>
                                            </th>
                                            <td>
                                                <p className="mb-0 mt-4">{i.product.title}</p>
                                            </td>
                                            <td>
                                                <p className="mb-0 mt-4">{i.product.price}</p>
                                            </td>
                                            <td>
                                                <div className="input-group quantity mt-4" style={{ width: "100px" }}>
                                                    <div className="input-group-btn">
                                                        <button className="btn btn-sm btn-minus bg-light border" onClick={() => { decre(i.product.id) }}>
                                                            <i className="fa fa-minus"></i>
                                                        </button>
                                                    </div>
                                                    <input type="text" id={i.product.id} className="form-control form-control-sm text-center border-0" style={{ backgroundColor: "transparent" }} value={i.Quantity} readOnly />
                                                    <div className="input-group-btn">
                                                        <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={() => {incre(i.product.id)}}>
                                                            <i className="fa fa-plus"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="mb-0 mt-4">{parseFloat((i.Quantity * i.price)).toFixed(2)}</p>
                                            </td>
                                            <td>
                                                <button className="btn btn-md rounded-circle bg-light border mt-4" onClick={() => { deleteCart(i.product.id) }}>
                                                    <i className="fa fa-times text-danger"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <div className="loading" style={{ marginTop: "190px" }}>
                                        <div className="loader"></div>
                                    </div>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="mt-5" style={{ marginTop: "10px", backgroundColor: "grey" }}>
                {/* <input type="text" class="border-0 border-bottom rounded me-5 py-3 mb-4" placeholder="Coupon Code"/>
                {/* <button class="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button">Apply Coupon</button> */}
            </div>
            <div className="row g-4 justify-content-end">
                <div className="col-8"></div>
                <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                    <div className="bg-light rounded">
                        <div className="p-4">
                            <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
                            <div className="d-flex justify-content-between mb-4">
                                <h5 className="mb-0 me-4">Subtotal:</h5>
                                {checkingCheckOut && checkingCheckOut.length>0 ? (<p className="mb-0">${parseFloat(checkingCheckOut[0].total).toFixed(2)}</p>):<p>0</p>}
                            </div>
                            <div className="d-flex justify-content-between">
                                <h5 className="mb-0 me-4">Shipping</h5>
                                <div className="">
                                    <p className="mb-0">Flat rate: $3.00</p>
                                </div>
                            </div>
                            <p className="mb-0 text-end">Shipping to Ukraine.</p>
                        </div>
                        <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                            <h5 className="mb-0 ps-4 me-4">Total</h5>
                            {checkingCheckOut && checkingCheckOut.length>0 ? (<p className="mb-0 pe-4">${parseFloat(checkingCheckOut[0].total).toFixed(2)}</p>):<p>0</p>}
                        </div>
                        <Link to="/CheckoutForm" className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button">Proceed Checkout</Link>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}



// ToSlice, setdirectToSlice] = useState(true);

//     console.log("cartproducts", cartProducts);
   
//     console.log("check ", checkOut);
//     console.log("qua ", Quantity);
    
//     console.log("direct", directToSlice);

//     console.log(total);

//     useEffect(() => {
//         const productsDetails = [];
//         let updatedTotal = 0;

//         if (cartProducts) {
//             cartProducts.forEach(cartItem => {
//                 const index = productsFromStore.findIndex(item => item.id == cartItem.productId);
                // const checkItemIndex = products.find(item => item.id == cartItem.productId);
                // console.log( " cart ",cartItem);
    //             if (index !== -1 ) {
    //                 productsDetails.push(productsFromStore[index]);

    //                 setPrice(price => ({
    //                     ...price,
    //                     [productsFromStore[index].id]: productsFromStore[index].price
    //                 }));

    //                 setQuantity(Quantity => ({
    //                     ...Quantity,
    //                     [productsFromStore[index].id]: cartItem.quantity
    //                 }));

    //                 updatedTotal += cartItem.quantity * productsFromStore[index].price;
    //             }
    //         });
    //         setTotal(updatedTotal);
    //     }
    //     setProducts(productsDetails);
    // }, [ ]);


    // useEffect(() => {
    //     if (checkOut.length > 0) {
    //         console.log("console ",checkOut);
    //         checkOut.forEach(item => {
    //             setPrice(price => ({
    //                 ...price,
    //                 [item.product.id]: item.product.price
    //             }));

    //             setQuantity(Quantity => ({
    //                 ...Quantity,
    //                 [item.product.id]: item.quantity
    //             }));

    //             setTotal(item.total);
    //         });
    //     }
    // }, []);


    //  useEffect(() => {
    //      console.log("bdvbjsnvjsbvjsvjsvjvjsjsnj");
    //     if (products.length > 0) {
    //         const updatedCheckOut = products.map(product => ({
    //             product,
    //             Quantity: Quantity[product.id],
    //             price: price[product.id],
    //             total
    //         }));
    //         console.log("updated ",updatedCheckOut);
    //         setCheckOut(updatedCheckOut);
            // console.log("dispatch", checkOut);
            // dispatch(cartToCheck(checkOut));
            
    //     }
    
    // }, [products,Quantity,price,total]);

    // useEffect(()=>{
    //     console.log("checking",checkOut);
    //     if(checkOut.length){
    //         console.log("checkoutttttt ");
    //          dispatch(cartToCheck(checkOut));
    //     }
        
    // },[checkOut])





