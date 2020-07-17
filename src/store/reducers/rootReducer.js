import authReducer from "./authReducer";
import orderReducer from "./orderReducer";
import { combineReducers } from 'redux'
const rootReducer = combineReducers({
    auth: authReducer,
    order: orderReducer
});
export default rootReducer;