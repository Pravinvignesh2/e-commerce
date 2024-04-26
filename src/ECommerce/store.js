
import { configureStore } from '@reduxjs/toolkit';
import { nameReducer } from './slice'; 
import { idReducer } from './slice'; 
import { countReducer } from './slice';
import { amountReducer , emailReducer, contactReducer} from './slice';

export default configureStore({
    reducer: {
        namebar1: nameReducer,
        id: idReducer,
        count: countReducer,
        amount:amountReducer,
        emailOfUser:emailReducer,
        contactOfUser:contactReducer,
    },
});
