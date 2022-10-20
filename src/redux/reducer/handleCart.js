const cart = [];

const handleCart = (state = cart, action) => {
    const product = action.payload;

    switch(action.type){
        case "ADDITEM":
            // Check if product is already exist
            const exist = state.find((x)=> x.id === product.id);
            if (exist){
                // increase the quantity
                return state.map((x)=>
                x.id === product.id ? {...x, qty: x.qty + 1} : x
                );
            }else{
                const product = action.payload;
                return[
                    ...state,
                    {
                        ...product,
                        qty: 1,
                    }
                ]
            }
            break;
        
        case "DELETEITEM":
            const exits1 = state.find((x) => x.id === product.id);
            if(exits1.qty === 1){
                return state.filter((x) => x.id !== exits1.id);
            }else{
                return state.map((x) => 
                    x.id === product.id ? {...x, qty: x.qty-1}: x
                );
            }
            break;

        default:
            return state;
            break; 
    }
}

export default handleCart;