export const productReducer = (state: any, action: any) => {
    switch (action.type) {
        case "product/fetch": state.products = action.payload
            break;
        case "product/add": state.products.push(action.payload)
            break;
        case "product/remove": state.products = state.products.filter((item: any) => item.id !== action.payload)
            break;
        case "product/update": state.products = state.products.map((item: any) => item.id === action.payload.id ? action.payload : item)
            break;
        default: return state
    }
}