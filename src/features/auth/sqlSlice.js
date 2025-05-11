import { createSlice } from "@reduxjs/toolkit"

const initialState={
    response:null
}

const sqlSlice=createSlice({
name:"sql",
initialState,
reducers:{
    storeresponse:(state,action)=>{
        state.response=action.payload
    }
}    
})

export const {storeresponse}=sqlSlice.actions
export default sqlSlice.reducer