import { createSlice } from "@reduxjs/toolkit"

const initialState={
    response:null
}

const xssSlice=createSlice({
name:"xss",
initialState,
reducers:{
    storeresponse:(state,action)=>{
        state.response=action.payload
    }
}    
})

export const {storeresponse}=xssSlice.actions
export default xssSlice.reducer