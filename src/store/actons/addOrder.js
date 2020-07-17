
import { db } from '../../services/firebase';
export const addOrder = (order) => {
    return (dispatch, getState) => {
        db.collection('orders')
            .add(order)
        dispatch({ type: "ADD_ORDER", order })
    }
}