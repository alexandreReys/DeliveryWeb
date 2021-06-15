import React, { useState } from "react";
import noImage from "assets/img/no-image.png";
import { BsArrowLeft } from "react-icons/bs";
import store from "store";
import { actionAddToCart } from "store/actions";
import { history } from "routes/history";
import * as masks from "utils/masks";

import "./styles.css";

const SelectedProduct = () => {
    const selectedProduct = store.getState().cartState.item;

    if (!selectedProduct.price) {
        history.push("/");
        return false;
    }

    return (
        <div id="selectedProduct" className="container-selected-product">
            <HeaderTop />
            <div className="container-product">
                <ProductImage selectedProduct={selectedProduct} />
                <ProductContent selectedProduct={selectedProduct} />
            </div>
        </div>
    );
};

//////////////////////////////////////////////////////////////////

const HeaderTop = () => {
    return (
        <header>
            <BsArrowLeft
                className="arrow-back-abs"
                onClick={() => {
                    history.push("/");
                }}
            />
        </header>
    );
};

const ProductImage = ({ selectedProduct }) => {
    return (
        <aside>
            {!!selectedProduct.image && <img src={selectedProduct.image} alt="" />}
            {!selectedProduct.image && <img src={noImage} alt="loading ..." />}
        </aside>
    );
};

const ProductContent = ({ selectedProduct }) => {
    const showPrice2 = !!selectedProduct.priceProductVariation;

    const [quantity, setQuantity] = useState(!showPrice2 ? 1 : 0);
    const [quantity2, setQuantity2] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(!showPrice2 ? 1 : 0);
    
    const selectedProductPrice = masks.moneyMask(selectedProduct.price);

    let priceProductVariation = "R$ 0,00";
    if (!!selectedProduct.priceProductVariation) priceProductVariation = masks.moneyMask(selectedProduct.priceProductVariation);

    let descriptionVariation = "Sem Promoção";  
    if (!!selectedProduct.descriptionVariation) descriptionVariation = selectedProduct.descriptionVariation;

    const clickOnButtonAdd = () => {
        if (quantity  > 0 ) updateCart(
            selectedProduct, 
            quantity, 
            selectedProduct.price
        );
        
        if (quantity2 > 0 ) updateCart(
            selectedProduct, 
            quantity2 * selectedProduct.quantityProductVariation, 
            selectedProduct.priceProductVariation
        );

        history.push("/");
        
        function updateCart(item, qtty, price) {
            store.dispatch(actionAddToCart({
                id: item.id,
                description: item.description,
                quantity: qtty,
                price: price,
                image: item.image,
                shippingTax: store.getState().defaultState.shippingTaxSettings,

                quantityProductVariation: item.quantityProductVariation,
                priceProductVariation: item.priceProductVariation,
                productPrice: item.productPrice,
            }));
        };
    };

    return (
        <content>
            <ProductDescription />
            <PromocionalPriceSelector />
            <DefaultPriceSelector />
            <ButtonAddToCart />
        </content>
    );

    function ProductDescription() {
        return (
            <h1 style={{marginBottom: 0}}>
                {selectedProduct.description}
            </h1>
        );
    };

    function PromocionalPriceSelector() {
        if (!showPrice2) return null;

        return (
            <div style={{marginTop: 30}}>
                <h4>{priceProductVariation}</h4>

                <h5 style={{color: 'red'}}>{descriptionVariation}</h5>
        
                <div className="qtty-box">
                    <div className="btn qtty-minus" onClick={onClickQttyMinus}>
                        -
                    </div>
    
                    <div className="qtty">
                        {quantity2}
                    </div>
    
                    <div className="btn qtty-plus" onClick={onClickQttyPlus}>
                        +
                    </div>
                </div>
            </div>
        );
        
        function onClickQttyMinus () {
            if (quantity2 <= 0) return;
                                
            const qtty = quantity2 - 1;
            setQuantity2(qtty);
            setTotalQuantity( quantity + ( qtty * selectedProduct.quantityProductVariation ) );
        };
    
        function onClickQttyPlus () {
            const qtty = quantity2 + 1;
            setQuantity2(qtty);
            setTotalQuantity( quantity + ( qtty * selectedProduct.quantityProductVariation ) );
        };
    
    };

    function DefaultPriceSelector() {
        return (
            <div style={{marginTop: 30}}>
                <h4 className="product-price">{selectedProductPrice}</h4>
        
                <div className="qtty-box">
                    <div className="btn qtty-minus" onClick={onClickQttyMinus}>
                        -
                    </div>
    
                    <div className="qtty">
                        {quantity}
                    </div>
    
                    <div className="btn qtty-plus" onClick={onClickQttyPlus}>
                        +
                    </div>
                </div>
            </div>
        ); 
        
        
        function onClickQttyMinus () {
            if(quantity <= !showPrice2 ? 1 : 0) return;
                            
            const qtty = quantity - 1;
            setQuantity(qtty);
            setTotalQuantity( qtty + ( quantity2 * selectedProduct.quantityProductVariation ) );
        };
    
        function onClickQttyPlus () {
            const qtty = quantity + 1;
            setQuantity(qtty);
            setTotalQuantity( qtty + ( quantity2 * selectedProduct.quantityProductVariation ) );
        };
    };

    function ButtonAddToCart() {
        return (
            <div>
                <label className="button-add" onClick={clickOnButtonAdd}>
                    {`Adicionar(${totalQuantity})`}
                </label>
            </div>
        );
    };

};

export default SelectedProduct;
