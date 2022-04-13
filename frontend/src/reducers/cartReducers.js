import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,

    CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'

export const cartReducer = (state ={cartItems:[], shippingAddress: {}}, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const exsistItem = state.cartItems.find(x => x.product === item.product)

            if (exsistItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => 
                        x.product === exsistItem.product ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems:[...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload )
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
        default:
            return state
    }
}