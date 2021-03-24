import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import weatherReducer from "../features/Weather/weatherSlice"

export default configureStore({
    reducer: {
        counter: counterReducer,
        weather: weatherReducer,
    },
})
