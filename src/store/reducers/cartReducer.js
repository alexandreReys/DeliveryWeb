const INITIAL_STATE = {
    item: [],
    addedItems: [], // id, description, quantity, price, image
    quantityOfItems: 0,
    subtotal: 0,
    shipping: 0,
    total: 0,
    paymentType: "",
    changeValue: 0,
    comments: "",
    customerDistance: 0,
};

/////////////////////////////////////////////////////////////////////
export default function cartReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "ACTION_CART_RESET":
            return actionCartReset(state);

        case "ACTION_CART_RECALCULATE":
            return actionCartRecalculate(state, action);
    
        case "ACTION_SELECT_PRODUCT":
            return actionSelectProduct(state, action);

        case "ACTION_ADD_TO_CART":
            return actionAddToCart(state, action);

        case "ACTION_SUB_FROM_CART":
            return actionSubFromCart(state, action);

        case "ACTION_REMOVE_FROM_CART":
            return actionRemoveFromCart(state, action);

        case "ACTION_SELECT_PAYMENT_TYPE":
            return actionSelectPaymentType(state, action);

        case "ACTION_SET_COMMENTS":
            return actionSetComments(state, action);

        case "ACTION_SET_CUSTOMER_DISTANCE":
            return setCustomerDistance(state, action);
    
        default:
            return state;
    }
}

/////////////////////////////////////////////////////////////////////
const actionCartReset = (state) => {
    return {
        ...state,
        item: [],
        addedItems: [],
        quantityOfItems: 0,
        subtotal: 0,
        shipping: 0,
        total: 0,
        paymentType: "",
        changeValue: 0,
        comments: "",
        customerDistance: 0,
    };
};

const actionCartRecalculate = (state, { shippingTaxInfo }) => {
    
    if (!shippingTaxInfo.deliveryAreaDistance2) return state;
    if (!state.customerDistance) return state;

    const shippingTax = state.customerDistance <= shippingTaxInfo.deliveryAreaDistance2
        ? shippingTaxInfo.shippingTax2Settings
        : shippingTaxInfo.shippingTaxSettings;
    
    return {
        ...state,
        shipping: shippingTax,
        total: (state.subtotal + shippingTax),
    };
};

const actionSelectProduct = (state, { product }) => {
    return {
        ...state,
        item: product,
    };
};

// const actionAddToCart = (state, { itemToAdd }) => {
//     const { price, stateAddedItem } = getPrice( state.addedItems, itemToAdd );
    
//     if (stateAddedItem) {
//         stateAddedItem.quantity += itemToAdd.quantity;
//         stateAddedItem.price = price;
//         const subt = getSubtotal( state.addedItems );
    
//         return {
//             ...state,
//             shipping: itemToAdd.shippingTax,
//             quantityOfItems: state.quantityOfItems + itemToAdd.quantity,
//             subtotal: subt,
//             total: (subt + itemToAdd.shippingTax),
//         };
//     } else {
//         const itemToAddTotal = price * itemToAdd.quantity;
//         itemToAdd.price = price;
    
//         return {
//             ...state,
//             addedItems: [...state.addedItems, itemToAdd],
//             shipping: itemToAdd.shippingTax,
//             quantityOfItems: state.quantityOfItems + itemToAdd.quantity,
//             subtotal: state.subtotal + itemToAddTotal,
//             total: (state.subtotal + itemToAdd.shippingTax) + itemToAddTotal,
//         };
//     };
    
//     function getPrice( stateAddedItems, itemToAdd ) {
//         const promotionalQtty = itemToAdd.quantityProductVariation;

//         const stateAddedItem = stateAddedItems.find((item) => item.id === itemToAdd.id);
//         const qtty = !stateAddedItem ? itemToAdd.quantity : itemToAdd.quantity + stateAddedItem.quantity;

//         const price = promotionalQtty > 0 && qtty > 1 && qtty >= promotionalQtty 
//             ? itemToAdd.priceProductVariation 
//             : itemToAdd.productPrice
//         ;
    
//         return { price, stateAddedItem };
//     };

//     function getSubtotal( stateAddedItems ) {
//         return stateAddedItems.reduce( 
//             (acc, it) => acc + (it.price * it.quantity), 0 
//         );
//     };
// };

// const actionSubFromCart = (state, { itemToSub }) => {
//     const promotionalQtty = itemToSub.quantityProductVariation;

//     const stateAddedItem = state.addedItems.find((item) => item.id === itemToSub.id);

//     if (stateAddedItem) {
//         if (stateAddedItem.quantity === 1) return { ...state };

//         const totalQtty = stateAddedItem.quantity - itemToSub.quantity;
//         const price = promotionalQtty > 0 && totalQtty > 1 && totalQtty >= promotionalQtty 
//             ? itemToSub.priceProductVariation 
//             : itemToSub.productPrice
//         ;

//         stateAddedItem.quantity -= itemToSub.quantity;
//         stateAddedItem.price = price;

//         const subt = getSubtotal( state.addedItems );

//         return {
//             ...state,
//             shipping: itemToSub.shippingTax,
//             quantityOfItems: state.quantityOfItems - itemToSub.quantity,
//             subtotal: subt,
//             total: subt + itemToSub.shippingTax,
//         };
//     };

//     function getSubtotal( stateAddedItems ) {
//         return stateAddedItems.reduce( 
//             (acc, it) => acc + (it.price * it.quantity), 0 
//         );
//     };
// };



const actionAddToCart = (state, { itemToAdd }) => {

    var newState;
    
    // const stateAddedItem = state.addedItems.find((item) => item.id === itemToAdd.id);
    const stateAddedItem = state.addedItems.find((item) => item.id === itemToAdd.id && item.price === itemToAdd.price );
    
    // const qtty = !stateAddedItem ? itemToAdd.quantity : itemToAdd.quantity + stateAddedItem.quantity;
    // const price = itemToAdd.quantityVariation > 0 && qtty >= itemToAdd.quantityVariation 
    //     ? itemToAdd.priceVariation 
    //     : itemToAdd.price
    // ;
    
    const price = itemToAdd.price;
    const itemToAddTotal = price * itemToAdd.quantity;
    const efectiveShippingTax = itemToAdd.shippingTax;

    if (stateAddedItem) {
        stateAddedItem.quantity += itemToAdd.quantity;
        stateAddedItem.price = price;
        const subt = state.addedItems.reduce( (acc, item) => acc + (item.price * item.quantity), 0);
        newState = {
            ...state,
            shipping: efectiveShippingTax,
            quantityOfItems: state.quantityOfItems + itemToAdd.quantity,
            subtotal: subt,
            total: (subt + efectiveShippingTax),
        };
    } else {
        itemToAdd.price = price;   //  PREÇO PROMOC. POR QTDE
        newState = {
            ...state,
            addedItems: [...state.addedItems, itemToAdd],
            shipping: efectiveShippingTax,
            quantityOfItems: state.quantityOfItems + itemToAdd.quantity,
            subtotal: state.subtotal + itemToAddTotal,
            total: (state.subtotal + efectiveShippingTax) + itemToAddTotal,
        };
    };
    return newState;
};

const actionSubFromCart = (state, { itemToSub }) => {
    const stateAddedItem = state.addedItems.find((item) => item.id === itemToSub.id);
    let itemTotal = itemToSub.price * itemToSub.quantity;

    if (stateAddedItem) {
        if (stateAddedItem.quantity === 1) {
            return { ...state };
        }

        stateAddedItem.quantity -= itemToSub.quantity;
        return {
            ...state,
            shipping: itemToSub.shippingTax,
            quantityOfItems: state.quantityOfItems - itemToSub.quantity,
            subtotal: state.subtotal - itemTotal,
            total: (state.subtotal + state.shipping) - itemTotal,
        };
    }
};




const actionRemoveFromCart = (state, { itemToRemove }) => {
    const removedItem = state.addedItems.find(
        (item) => item.id === itemToRemove.id
    );
    let itemTotal = removedItem.price * removedItem.quantity;

    if (removedItem) {
        return {
            ...state,
            addedItems: state.addedItems.filter(
                (item) => item.id !== itemToRemove.id
            ),
            quantityOfItems: state.quantityOfItems - removedItem.quantity,
            subtotal: state.subtotal - itemTotal,
            total: state.subtotal - itemTotal + state.shipping,
        };
    }
    return { ...state };
};

const actionSelectPaymentType = (state, { paymentTypeData }) => {
    return {
        ...state,
        paymentType: paymentTypeData.paymentType,
        changeValue: paymentTypeData.changeValue,
    };
};

const actionSetComments = (state, { comments }) => {
    return {
        ...state,
        comments,
    };
};

const setCustomerDistance = (state, { customerDistance }) => {
    return {
      ...state,
      customerDistance,
    };
};
