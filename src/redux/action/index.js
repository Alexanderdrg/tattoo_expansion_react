// For add item to cart

export const addToCart = (product) => {
    return{
        type: "ADDITEM",
        payload: product
    }
}

// For delete item to cart
export const deleteFromCart = (product) => {
    return{
        type: "DELETEITEM",
        payload: product
    }
}