// import { configureStore } from '@reduxjs/toolkit';
// import nameReducer from './slice';
// import idReducer from './idSlice'
// export default configureStore({
//     reducer:{
//         namebar:nameReducer,
//         id:idReducer,
//     },
// });

import { configureStore } from '@reduxjs/toolkit';
import { nameReducer } from './slice'; 
import { idReducer } from './slice'; 
import { countReducer } from './slice';

export default configureStore({
    reducer: {
        namebar: nameReducer,
        id: idReducer,
        count: countReducer,
    },
});
