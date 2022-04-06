const cart = [];

const handleCart = (state = cart, action) => {
  const product = action.payload;
  switch (action.type) {
    case "ADD":
      const exist = state.find((x) => x._id === product._id);
      if (exist) {
        return state.map((x) =>
          x._id === product._id ? { ...x, qty: x.qty + 1 } : x,
        );
      } else {
        const product = action.payload;
        return [...state, { ...product, qty: 1 }];
      }

    case "DEL":
      const exist1 = state.find((x) => x._id === product._id);
      console.log(exist1);
      if (exist1.qty === 1) {
        return state.filter((x) => x._id !== exist1._id);
      } else {
        return state.map((x) =>
          x._id === product._id ? { ...x, qty: x.qty - 1 } : x,
        );
      }
    default:
      return state;
  }
};

export default handleCart;
