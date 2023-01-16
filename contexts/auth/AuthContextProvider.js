import React, { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "./AuthContext";
import Cookies from "js-cookie";
import CartContext from "../../helpers/cart";
import { WishlistContext } from "../../helpers/wishlist/WishlistContext";

const AuthContextProvider = ({ children }) => {
  const router = useRouter();
  const cartContext = useContext(CartContext);
  const wishlistContext = useContext(WishlistContext);

  const clearCart = cartContext.clearCart;
  const clearWishlist = wishlistContext.clearWishlist;
  let userInStorage;
  if (typeof window !== "undefined") {
    userInStorage = JSON.parse(localStorage.getItem("user"));
  }
  const isUser = Cookies.get("user") && userInStorage?.jwt;

  const login = (user) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
    }
    Cookies.set("user", user.jwt);

    router.push("/");
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
    Cookies.remove("user");
    clearCart();
    clearWishlist();
    router.push("/");
  };
  return (
    <AuthContext.Provider
      value={{
        user: userInStorage,
        login,
        logout,
        Cookies,
        isUser,
        // signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
