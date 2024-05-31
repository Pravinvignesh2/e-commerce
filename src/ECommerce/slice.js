import { createSlice } from '@reduxjs/toolkit';

const slice= createSlice({
    name:'namebar',
    initialState:{
        value:"",
    },
    reducers:{
        namebar1:(state,action)=>{
            state.value="";
            state.value+=action.payload
        }
          
    }
});


 const idSlice = createSlice({
    name: 'id',
    initialState: {
        value: 0,
    },
    reducers: {
        id: (state, action) => {
            state.value = action.payload;
        },
    },
});

const countOfEcom= createSlice({
    name:'count',
    initialState:{
        value:0,
    },
    reducers:{
         count:
            (state,action)=>{
                
                state.value=action.payload;
                
            
         }
    }
});

const emailuser=createSlice({

    name:'email',
    initialState:{
        value:"",
    },
    reducers:{
        emailOfUser:( state, action)=>{
            state.value="";
            
            state.value+=action.payload;
            // console.log("state ",state.value);
        }
    }
});

const contactuser=createSlice({

    name:'contact',
    initialState:{
        value:0,
    },
    reducers:{
        contactOfUser:( state, action)=>{
            state.value=action.payload;
        }
    }
});

const amount1= createSlice({

    name:'amount',
    initialState:{
        value:0,
    },
    reducers:{
        amount:(state,action)=>{
            state.value=action.payload;
        }
    }
})


const cartSlice = createSlice({
    name:'cart',
    initialState:{
        value:[],
    },
    reducers:{
        cart:(state,action)=>{
            
            // console.log("state ", action.payload);
            // console.log("initial",state.value);

            const newItem = action.payload;
            if(action.payload.productId === "no"){
                // console.log("state ", action.payload);
                state.value=[];
            }

            else{
                const find = state.value.findIndex( item => item.productId == newItem.productId);
                if( find !== -1 ){
                    // console.log(state.value[find].quantity);
                    state.value[find].quantity+=1;
                }

                else{
                    state.value.push({"productId":newItem.productId, "quantity": newItem.quantity});
                }
            }
            
        },
        cartAll:(state,action)=>{
                // console.log("cartState ",state.value);
                // console.log("cartaction ",action.payload);
                state.value=action.payload;
        },

        deleteItemFromCart:(state,action)=>{
            console.log(action.payload);
            const remainingCart = state.value.filter((item)=> action.payload.productId !== item.productId);
            state.value=remainingCart;
            console.log(remainingCart);
        }
    }
})

const allProductSlice = createSlice({
    name:'allProduct',
    initialState:{
        value:[],
        
    },
    reducers:{
        allProducts:(state,action)=>{
             state.value=action.payload;
             console.log("allProducts 5",state.value);
        }
    }
})

// const checkoutSlice = createSlice({
//     name : 'checkOutSlice',
//     initialState:{
//         value:[],
        
//     },
//     reducers:{
//         cartToCheck: (state,action)=>{
//             console.log("dispatcgesd ",action.payload);
//             state.value=action.payload
//         },

//         increment:(state,action)=>{
//             console.log(action.payload);
//             console.log(state.value);
//             const temp = state.value;
//             const newValue = temp.map(
//                 (item)=>{
//                     console.log("item ",item);
//                     if(item.product.id==action.payload){
//                         return {...item,Quantity:item.Quantity+1,total:item.total + item.product.price};
//                     }
//                     else{
//                         return item;
//                     }
//                 }
//             )

//             state.value=newValue;
//         },
//         decrement:(state,action)=>{
//             console.log(action.payload);
//             console.log(state.value);
//             const newValue = state.value.map(
//                 (item)=>{
//                     if(item.product.id==action.payload){
//                         return {...item,Quantity:item.Quantity-1,total:item.total - item.product.price};
//                     }
//                     else{
//                         return item;
//                     }
//                 }
//             )
//             state.value=newValue;
//         }
//     }
// })
const checkoutSlice = createSlice({
    name: 'checkOutSlice',
    initialState: {
        value: [],
    },
    reducers: {
        cartToCheck: (state, action) => {
            state.value = action.payload;
            // console.log("state ",state.value);
        },
        increment: (state, action) => {
            
            const newValue = state.value.map(item => 
                item.product.id === action.payload
                    ? { ...item, Quantity: item.Quantity + 1, total: item.total + item.product.price }
                    : item
            )

            const totalPrice = newValue.find((item)=> item.product.id === action.payload)

            state.value = newValue.map((item) => 
                ({ ...item, total:totalPrice.total})
            )
   
        },
        decrement: (state, action) => {
            const newValue = state.value.map(item => 
                item.product.id === action.payload
                 &&  item.Quantity>0  ? { ...item, Quantity: item.Quantity - 1, total: item.total - item.product.price }
                    : item
            )

            const totalPrice = newValue.find((item)=> item.product.id === action.payload)

            state.value = newValue.map((item) => 
                ({ ...item, total:totalPrice.total})
            )
               
        }
    }
});

export const {namebar1}=slice.actions;
export const {id}=idSlice.actions;
export const {count}=countOfEcom.actions;
export const {amount}=amount1.actions;
export const {emailOfUser}=emailuser.actions;
export const {contactOfUser}=contactuser.actions;
export const {cart,cartAll, deleteItemFromCart} = cartSlice.actions;
export const {allProducts} = allProductSlice.actions;
export const {cartToCheck, checkoutCart,increment,decrement} = checkoutSlice.actions;

export const nameReducer=slice.reducer;
export const idReducer=idSlice.reducer;
export const countReducer=countOfEcom.reducer;
export const amountReducer=amount1.reducer;
export const emailReducer=emailuser.reducer;
export const contactReducer=contactuser.reducer;
export const cartReducer=cartSlice.reducer;
export const allProductReducer=allProductSlice.reducer;
export const checkOutReducer = checkoutSlice.reducer;