// Add item to cart
export const addCart = (product) => {
  return {
    type: "ADD",
    payload: product,
  };
};

// delete item from cart
export const delCart = (product) => {
  return {
    type: "DEL",
    payload: product,
  };
};
