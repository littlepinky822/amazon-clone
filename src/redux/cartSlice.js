import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    productsNumber: 0
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    // use to modify the state once action has came in
    reducers: {
        addToCart: (state, action) => {
            // check if in product array
            const addProductExists = state.products.find((product) => product.id === action.payload.id);
            if (addProductExists) {
                addProductExists.quantity += parseInt(action.payload.quantity);
            } else {
                state.products.push({...action.payload, quantity: parseInt(action.payload.quantity)});
            }
            state.productsNumber = state.productsNumber + parseInt(action.payload.quantity);
        },
        removeFromCart: (state, action) => {
            // Find the product removing from the array
            const productToRemove = state.products.find((product) => product.id === action.payload); // payload = id
            // Remove the quantity from the product number
            state.productsNumber = state.productsNumber - productToRemove.quantity;
            // Fins index of the product receiving
            const index = state.products.findIndex((product) => product.id === action.payload);
            // Remove form the array
            state.products.splice(index, 1);
        }
    }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;