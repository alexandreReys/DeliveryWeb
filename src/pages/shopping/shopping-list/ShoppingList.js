import React, { useState, useEffect } from "react";
import noImage from "assets/img/no-image.png";
import { history } from "routes/history";
import { BsArrowRight } from "react-icons/bs";

import * as productService from "services/productService";
import * as settingsService from "services/settingsService";
import * as actions from "store/actions";
import * as utils from "utils";
import * as masks from "utils/masks";
import store from "store";

import "./styles.css";

//////////////////////////////////////////////////////////////////////////////////////
const ShoppingList = () => {
    const [products, setProducts] = useState([]);
    const [baner, setBaner] = useState("");

    useEffect(() => {
        store.dispatch(actions.actionGetDeliveryAddress());
        store.dispatch(actions.actionAdminModuleDeactivate());

        (async function getProductList() {
            const data = await productService.getProductsGroupedByCategory();
            if (data) { setProducts(data) };

            await settingsService.get();
            setBaner(store.getState().defaultState.webBannerSettings);
        })();

    }, []);

    const BannerTop = () => {
        return (
            <div className="img-container">
                <img className="img-fluid" src={baner} alt="" />
            </div>
        );
    };
    const HeaderTop = () => {
        return (
            <header style={{ marginTop: 20 }}>
                <h4>Faça sua escolha :</h4>
            </header>
        );
    };

    ///////////////////////////////
    return (
        <div id="shopping-list" className="container-shopping-list">
            <BannerTop />
            <HeaderTop />
            <MainContent products={products} />
        </div>
    );
};


//////////////////////////////////////////////////////////////////////////////////////

const MainContent = ({ products }) => {
    return (
        <main>
            {products.length > 0 && products.map((it) => (
                <div className="category-row" key={it.category}>
                    <h4>{it.category}</h4>
                    <ProductRow categoryProducts={it.products} />
                </div>
            ))}
        </main>
    );
};

const ProductRow = ({ categoryProducts }) => {
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

        var precoVinho, precoAnterVinho;

        if (product.EmPromocaoVinho && product.PrecoVinho >= 100) {
            precoVinho = masks.numberMask(product.PrecoVinho)
        } else {
            precoVinho = masks.moneyMask(product.PrecoVinho)
        };

        if (product.EmPromocaoVinho && product.PrecoPromocionalVinho >= 100) {
            precoAnterVinho = masks.moneyMaskSpaceless(product.PrecoAnterVinho)
        } else {
            precoAnterVinho = masks.moneyMask(product.PrecoAnterVinho)
        };

        return (
            <div
                className="product"
                key={product.IdVinho}
                onClick={() => {
                    const param = {
                        id: product.IdVinho,
                        description: product.DescricaoVinho,
                        quantity: 1,
                        price: product.PrecoVinho,
                        image: product.Imagem1Vinho,
                    };
                    store.dispatch(actions.actionSelectProduct(param));
                    history.push("/selected-product");
                }}
            >
                <div className="header">
                    {!!product.Imagem1Vinho && (
                        <img src={product.Imagem1Vinho} alt="loading ..." />
                    )}
                    {!product.Imagem1Vinho && <img src={noImage} alt="loading ..." />}
                </div>

                <hr />

                <div className="title">
                    {utils.filterStringSize( 35, product.DescricaoVinho )}
                </div>

                <content>

                    {!!product.EmPromocaoVinho &&
                        <>
                            <div className="price-line">{precoAnterVinho}</div>
                            <div className="price">{precoVinho}</div>
                        </>
                    }

                    {!product.EmPromocaoVinho &&
                        <>
                            <div className="price" style={{ marginTop: 4 }}>{precoVinho}</div>
                        </>
                    }

                </content>
            </div>
        );
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


export default ShoppingList;
