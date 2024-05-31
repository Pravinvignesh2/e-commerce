
import { configureStore } from '@reduxjs/toolkit';
import { nameReducer } from './slice'; 
import { idReducer } from './slice'; 
import { countReducer } from './slice';
import { amountReducer , emailReducer, contactReducer, cartReducer, allProductReducer, checkOutReducer} from './slice';

export default configureStore({
    reducer: {
        namebar1: nameReducer,
        id: idReducer,
        count: countReducer,
        amount:amountReducer,
        emailOfUser:emailReducer,
        contactOfUser:contactReducer,
        cart:cartReducer,
        cartAll:cartReducer,
        deleteItemFromCart:cartReducer,
        allProducts:allProductReducer,
        cartToCheck:checkOutReducer,
        checkoutCart:checkOutReducer,
        increment:checkOutReducer,
        decrement:checkOutReducer,
    },
});
