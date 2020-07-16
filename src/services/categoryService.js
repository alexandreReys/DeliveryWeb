export const getCategoriesAll = () => {
  let categories = [];
  try {
    // categories = await api.get("/delivery-order");
    categories = {
      data: [
        {
          idCategory: 1,
          descriptionCategory: "Cervejas",
        },
        {
          idCategory: 2,
          descriptionCategory: "Destilados",
        },
        {
          idCategory: 3,
          descriptionCategory: "Vinhos",
        },
      ],
    };
  } catch (error) {
    console.error("ErrorMessage: ", error);
    return null;
  }

  // store.dispatch(actionGetCategories(categories.data));

  return categories.data;
};
