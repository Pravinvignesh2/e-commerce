import { createSlice } from '@reduxjs/toolkit';

const slice= createSlice({
    name:'namebar',
    initialState:{
        value:"",
    },
    reducers:{
        namebar:(state,action)=>{
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

export const {namebar}=slice.actions;
export const {id}=idSlice.actions;
export const {count}=countOfEcom.actions;
export const nameReducer=slice.reducer;
export const idReducer=idSlice.reducer;
export const countReducer=countOfEcom.reducer;