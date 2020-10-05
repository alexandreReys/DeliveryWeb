import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { history } from "routes/history";
import { FaPlus, FaSearch } from "react-icons/fa";
import { DebounceInput } from "react-debounce-input";

import CategoryForm from "./components/categoryForm/CategoryForm";
import CategoryItem from "./components/categoryItem/CategoryItem";
import store from "store";

import {
    actionAdminModuleActivate,
    actionCategoryAdd,
    actionCategoryList,
} from "store/actions";

// import { get, getByDescription, post, put, deleteById } from "services/categoryService";
import * as categoryService from "services/categoryService";

import "./styles.css";

const Category = ({ operacaoCategory }) => {
    const [loading, setLoading] = useState(true);
    const [loadingText] = useState(store.getState().defaultState.loadingText);
    const [categories, setCategories] = useState([]);
    const [searching, setSearching] = useState(false);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        store.dispatch(actionAdminModuleActivate());
        store.dispatch(actionCategoryList());
        getList();
    }, []);

    useEffect(() => {
        if (!loading) getByDescription(searchText);
        // eslint-disable-next-line
    }, [searchText]);

    const handlerListAddButton = () => {
        store.dispatch(actionCategoryAdd());
    };

    async function getList() {
        async function loadCategories() {
            setSearchText("");
            setLoading(true);
            const response = await categoryService.get();
            setLoading(false);
            setCategories(response);
        }
        loadCategories();
    };

    async function getByDescription(searchText) {
        async function loadByDescription(searchText) {
            setLoading(true);
            const response = await categoryService.getByDescription(searchText);
            setLoading(false);
            setCategories(response);
        }
        loadByDescription(searchText);
    };

    async function handleFormSaveButton(formData) {

        if (operacaoCategory === "add") {
            const dlman = categories.filter((category) => {
                return category.DescriptionCategory === formData.DescriptionCategory;
            });

            if (dlman === null || dlman.length === 0) {
                const response = await categoryService.post(formData);
                if (response.affectedRows > 0) getList();
            };
        };

        if (operacaoCategory === "edit") {
            const response = await categoryService.put(formData);
            if (!response) setCategories([]);
            else if (response.affectedRows > 0) {
                await getList();
            };
        };
    };

    const handlerDeleteButton = async (id) => {
        const r = window.confirm("Confirma Exclusão ??");
        if (r === true) {
            // Deletar no BD
            const response = await categoryService.deleteById(id);
            if (response.affectedRows > 0) await getList();
        }
    };
    
    const handleExit = () => {
        history.push("orders");
    };
    
    return (
        <div id="category">
            {(operacaoCategory === "list" || operacaoCategory === "delete") && (
                <div className="category-list">

                    <div className="header">
                        <div className="header-text">
                            Categorias de Produto
                        </div>
                    </div>

                    <div className="buttons">
                        <button className="button" onClick={() => handlerListAddButton()}>
                            Incluir
                        </button>

                        <button className="button" onClick={() => handleExit()}>
                            Sair
                        </button>
                    </div>

                    <div className="category-list-header">

                        <div></div>
                        <div
                            className="search-bar"
                            onClick={() => {
                                setSearching(!searching);
                                if (searching === true) setSearchText("");
                            }}
                        >
                            <FaSearch className="button-search" size={22} />
                            {/* Search */}
                        </div>
                    </div>

                    {searching && (
                        <div className="search-input">
                            <DebounceInput
                                className="input"
                                value={searchText}
                                minLength={2}
                                debounceTimeout={800}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <div className="search-cancel" onClick={() => setSearchText("")}>
                                X
                            </div>
                        </div>
                    )}

                    {/* loading text */}
                    {loading && (
                        <div id="loading">
                            <h5>{loadingText}</h5>
                        </div>
                    )}

                    {/* add button */}
                    {!loading && (
                        <>
                            <ul className="mt-3">
                                {categories.map((category) => (
                                    <CategoryItem
                                        key={category.IdCategory}
                                        category={category}
                                        onDelete={handlerDeleteButton}
                                    />
                                ))}
                            </ul>
                            <div className="btnMais">
                                <div className="col-3">
                                    <button
                                        className="btn btnCircular"
                                        onClick={() => {
                                            handlerListAddButton();
                                        }}
                                    >
                                        <i>
                                            <FaPlus />
                                        </i>
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            {(operacaoCategory === "add" || operacaoCategory === "edit") && (
                <div className="category-form">
                    <CategoryForm propSubmit={handleFormSaveButton} />
                </div>
            )}
        </div>
    );
};

export default connect((state) => ({
    operacaoCategory: state.categoryState.operacaoCategory,
}))(Category);
