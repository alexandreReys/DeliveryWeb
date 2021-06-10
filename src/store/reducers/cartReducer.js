const INITIAL_STATE = {
    item: [],
    addedItems: [], // id, description, quantity, price, image
    quantityOfItems: 0,
    subtotal: 0,
    shipping: 0,
    total: 0,
    paymentType: "",
    changeValue: 0,
};

/////////////////////////////////////////////////////////////////////
export default function cartReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "ACTION_CART_RESET":
            return actionCartReset(state);

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
    };
};

const actionSelectProduct = (state, { product }) => {
    return {
        ...state,
        item: product,
    };
};

// TESTE PROMOÇÃO POR QUANTIDADE
const actionAddToCart = (state, { itemToAdd }) => {
    const { price, stateAddedItem } = getPrice( state.addedItems, itemToAdd );
    
    if (stateAddedItem) {
        stateAddedItem.quantity += itemToAdd.quantity;
        stateAddedItem.price = price;
        const subt = getSubtotal( state.addedItems );
    
        return {
            ...state,
            shipping: itemToAdd.shippingTax,
            quantityOfItems: state.quantityOfItems + itemToAdd.quantity,
            subtotal: subt,
            total: (subt + itemToAdd.shippingTax),
        };
    } else {
        const itemToAddTotal = price * itemToAdd.quantity;
        itemToAdd.price = price;
    
        return {
            ...state,
            addedItems: [...state.addedItems, itemToAdd],
            shipping: itemToAdd.shippingTax,
            quantityOfItems: state.quantityOfItems + itemToAdd.quantity,
            subtotal: state.subtotal + itemToAddTotal,
            total: (state.subtotal + itemToAdd.shippingTax) + itemToAddTotal,
        };
    };
    
    function getPrice( stateAddedItems, itemToAdd ) {
        const promotionalQtty = itemToAdd.quantityProductVariation;

        const stateAddedItem = stateAddedItems.find((item) => item.id === itemToAdd.id);
        const qtty = !stateAddedItem ? itemToAdd.quantity : itemToAdd.quantity + stateAddedItem.quantity;

        const price = promotionalQtty > 0 && qtty > 1 && qtty >= promotionalQtty 
            ? itemToAdd.priceProductVariation 
            : itemToAdd.productPrice
        ;
    
        return { price, stateAddedItem };
    };

    function getSubtotal( stateAddedItems ) {
        return stateAddedItems.reduce( 
            (acc, it) => acc + (it.price * it.quantity), 0 
        );
    };
};

const actionSubFromCart = (state, { itemToSub }) => {
    const promotionalQtty = itemToSub.quantityProductVariation;

    const stateAddedItem = state.addedItems.find((item) => item.id === itemToSub.id);

    if (stateAddedItem) {
        if (stateAddedItem.quantity === 1) return { ...state };

        const totalQtty = stateAddedItem.quantity - itemToSub.quantity;
        const price = promotionalQtty > 0 && totalQtty > 1 && totalQtty >= promotionalQtty 
            ? itemToSub.priceProductVariation 
            : itemToSub.productPrice
        ;

        stateAddedItem.quantity -= itemToSub.quantity;
        stateAddedItem.price = price;

        const subt = getSubtotal( state.addedItems );

        return {
            ...state,
            shipping: itemToSub.shippingTax,
            quantityOfItems: state.quantityOfItems - itemToSub.quantity,
            subtotal: subt,
            total: subt + itemToSub.shippingTax,
        };
    };

    function getSubtotal( stateAddedItems ) {
        return stateAddedItems.reduce( 
            (acc, it) => acc + (it.price * it.quantity), 0 
        );
    };
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

