import React, { useState, useEffect } from "react";
import noImage from "assets/img/no-image.png";
import { history } from "routes/history";
import { BsArrowRight } from "react-icons/bs";

import store from "store";
import BannerTop from "components/banner-top/BannerTop";
import AddressConfirmation from "components/modal/address-confirmation/addressConfirmation"

import * as categoryService from "services/categoryService";
import * as productService from "services/productService";
import * as settingsService from "services/settingsService";
import * as actions from "store/actions";
import * as utils from "utils";

import "./styles.css";

//////////////////////////////////////////////////////////////////////////////////////
const ShoppingList = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [banner, setBanner] = useState("");

    const [showAddressConfirmation, setShowAddressConfirmation] = useState(false);

    useEffect(() => {
        store.dispatch(actions.actionGetDeliveryAddress());
        store.dispatch(actions.actionAdminModuleDeactivate());

        (async function getSettings() {
            if (!banner) {
                if (!store.getState().defaultState.webBannerSettings) {
                    await settingsService.get();
                };
                setBanner(store.getState().defaultState.webBannerSettings);
            };
        })();

        (async function getCategoryList() {
            if (categories.length < 1) {
                if (store.getState().categoryState.categories.length < 1) {
                    await categoryService.get();
                };
                setCategories(store.getState().categoryState.categories);
            };
        })();

        (async function getProductList() {
            if (products.length < 1) {
                if (store.getState().vinhoState.products.length < 1) {
                    await productService.getProductsGroupedByCategory();
                };
                setProducts(store.getState().vinhoState.products);
            };
        })();
        
    }, [categories, products, banner]);
    
    ///////////////////////////////
    return (
        <div id="shopping-list" className="container-shopping-list">
            <AddressConfirmation 
                show={showAddressConfirmation} 
                close={ () => setShowAddressConfirmation(false) } 
                address={store.getState().deliveryAddressState}
            />
            <BannerTop banner={banner}/>
            <Categories categories={categories}/>
            <HeaderTop />
            <MainContent products={products} />
            <PageFooter />
        </div>
    );

    function HeaderTop () {
        return (
            <header style={{ marginTop: 20 }}>
                <h4>Faça sua escolha :</h4>
            </header>
        );
    };
};

function Categories ({ categories }) {
    return (
        <div className="categories">
            {!!categories && categories.map((category) => (
                <Category category={category} key={category.IdCategory} />
            ))}
        </div>
    );

    function Category ({ category }) {
        return (
            <div 
                className="category"
                onClick={() => {
                    store.dispatch(actions.actionSetProductCategory(category.DescriptionCategory));
                    history.push("/shopping-list-categ");
                }}
            >
                {utils.firstUpper(category.DescriptionCategory)}
            </div>
        )
    };
};

function MainContent ({ products }) {
    return (
        <main className="main-content">
            {products.length > 0 && products.map((it) => (
                <div className="category-row" key={it.category}>
                    <h3>{it.category}</h3>
                    <ProductRow categoryProducts={it.products} />
                </div>
            ))}
        </main>
    );

    function ProductRow ({ categoryProducts }) {
        return (
            <div className="products-container">
                {!!categoryProducts && categoryProducts.map((product) => (
                    <Product product={product} key={product.IdVinho} />
                ))}
                <SeeAll category={categoryProducts[0].TipoVinho} />
            </div>
        );
    
        function Product({ product }) {
            product = utils.adjustPromotionalPrice(product);
           
            const { precoVinho, precoAnterVinho } = utils.getPrice(product);
    
            return (
                <div
                    className="product"
                    key={product.IdVinho}
                    onClick={ () => productClick() }
                >
                    <div className="header">
                        {!!product.Imagem1Vinho && (
                            <img src={product.Imagem1Vinho} alt="loading ..." />
                        )}
                        {!product.Imagem1Vinho && <img src={noImage} alt="loading ..." />}
                    </div>
    
                    <hr />
    
                    <div className="title">
                        {utils.filterStringSize(35, product.DescricaoVinho)}
                    </div>
    
                    <PriceContainer product={product} precoAnterVinho={precoAnterVinho} precoVinho={precoVinho} />
                </div>
            );

            function productClick() {
                const param = {
                    id: product.IdVinho,
                    description: product.DescricaoVinho,
                    quantity: 1,
                    price: product.PrecoVinho,
                    image: product.Imagem1Vinho,

                    productPrice: product.PrecoVinho,
                    priceProductVariation: product.PriceProductVariation ? product.PriceProductVariation : 0,
                    quantityProductVariation: product.QuantityProductVariation ? product.QuantityProductVariation : 0,
                    descriptionVariation: product.DescriptionProductVariation,
                };

                store.dispatch(actions.actionSelectProduct(param));
                history.push("/selected-product");
            };
        };

        function PriceContainer({ product, precoAnterVinho, precoVinho }) {
            return (
                <div style={{ flexDirection: "row", marginTop: 6 }}>

                    <PromotionalText product={product} />

                    <DiscardedPrice price={precoAnterVinho} emPromocao={product.EmPromocaoVinho} />

                    <EffectivePrice price={precoVinho} />

                </div>
            );
            
            function PromotionalText({ product }) {
                if ( product.QuantityProductVariation > 0 ) {
                    return (
                        <div style={{ fontSize: "0.8rem", color: "red" }}>
                            {product.DescriptionProductVariation}
                        </div>
                    );
                };
        
                return null;
            };
            
            function DiscardedPrice({ price, emPromocao }) {
                if (!emPromocao) return null;
                
                return (
                    <div className="price-line">
                        {price}
                    </div>
                );
            };
    
            function EffectivePrice({ price }) {
                return (
                    <div className="price">
                        {price}
                    </div>
                );
            };
        };

        function SeeAll({ category }) {
            return (
                <div className="arrow-all">
                    <div className="circle">
                        <div
                            className="arrow"
                            onClick={() => {
                                store.dispatch(actions.actionSetProductCategory(category));
                                history.push("/shopping-list-categ");
                            }}
                        >
                            <BsArrowRight />
                        </div>
                    </div>
                    <div>
                        <div className="arrow-text">Ver todos</div>
                    </div>
                </div>
            );
        };
    };
    
};

function PageFooter () {
    return (
        <div className="page-footer">
            <a 
                href="#shopping-list"
                style={{fontSize: 20, fontWeight: "bold", cursor: "pointer"}}
            >
                Voltar ao topo
            </a>
        </div>
    );
};

export default ShoppingList;
