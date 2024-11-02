/* eslint-disable no-unreachable */
import { createContext, useReducer } from 'react';

export const magazin = createContext();
const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,

  cart: {
    AdresseLivraison: localStorage.getItem('AdresseLivraison')
      ? JSON.parse(localStorage.getItem('AdresseLivraison'))
      : {},
    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : '',
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      //add cart item

      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    case 'CART_SUPP_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'Connection':
      return { ...state, userInfo: action.payload };
    case 'DECONNECTER':
      return {
        ...state,
        userInfo: [null],
        cart: {
          cartItems: [],
          AdresseLivraison: {},
          payementMethod: '',
        },
      };
    case 'save_Adresse_Livraison':
      return {
        ...state,
        cart: {
          ...state.cart,
          AdresseLivraison: action.payload,
        },
      };
    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
      };
    case 'CART_CLEAR':
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    default:
      return state;
  }
}
export function MagazinProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <magazin.Provider value={value}>{props.children}</magazin.Provider>;
}
