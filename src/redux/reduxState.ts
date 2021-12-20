import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { weatherReducer } from "./weatherReducer";


const reducers = combineReducers({
    weather: weatherReducer
})

type RootReducerType = typeof reducers
export type AppStateType = ReturnType<RootReducerType>

const store = createStore(reducers, applyMiddleware(thunk))

export default store