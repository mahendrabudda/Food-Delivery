import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const url = "http://localhost:3000";
  const [food_list , setFoodList] = useState([])

  // ✅ Restore token when app loads
  useEffect(() => {
    
    async function loadData(){
        
        await fetchFoodList();
        if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"))
    }
    }
    loadData();
  }, []);

  // 🛒 Add to cart
  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  // ❌ Remove from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  // 💰 Total cart value
  const getTotalCartAmount = () => {
    let TotalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let item_info = food_list.find((product) => product._id === item);
        TotalAmount += item_info.price * cartItems[item];
      }
    }
    return TotalAmount;
  };

  const fetchFoodList = async() =>{
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data)
  }

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
