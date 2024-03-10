import { configureStore } from '@reduxjs/toolkit';
import participantsReducer from '../reducers/redusers'

const store = configureStore ({
    reducer: participantsReducer
})


export default store 