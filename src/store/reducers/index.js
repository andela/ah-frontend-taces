import {
    createStore,
    combineReducers,
    compose,
    applyMiddleware
} from "redux"
import thunk from "redux-thunk";

// combine all reducers into one root reducer
const rootReducer = combineReducers({
    //this is where key valure pairs of reducers should be placed
})

// creates a store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const Store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default Store;
