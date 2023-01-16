import React, { useEffect, useState } from "react";
import "../public/assets/scss/app.scss";
import { ToastContainer } from "react-toastify";
import TapTop from "../components/common/widgets/Tap-Top";
// import MessengerCustomerChat from "react-messenger-customer-chat";
import CartContextProvider from "../helpers/cart/CartContext";
import { WishlistContextProvider } from "../helpers/wishlist/WishlistContext";
import FilterProvider from "../helpers/filter/FilterProvider";
import { CompareContextProvider } from "../helpers/Compare/CompareContext";
import { CurrencyContextProvider } from "../helpers/Currency/CurrencyContext";
import Helmet from "react-helmet";
import AuthContextProvider from "../contexts/auth/AuthContextProvider";

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../helpers/apollo";

import { QueryClient, QueryClientProvider } from "react-query";

export default function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState();
  const apolloClient = useApollo(pageProps);

  useEffect(() => {
    const path = window.location.pathname.split("/");
    const url = path[path.length - 1];
    document.body.classList.add("dark");

    let timer = setTimeout(function () {
      setIsLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // set header for bearer token
  const queryClient = new QueryClient();

  return (
    <>
      {/* using --start */}
      <QueryClientProvider client={queryClient}>
        <CartContextProvider>
          <AuthContextProvider>
            <WishlistContextProvider>
              {/* using --end */}
              <ApolloProvider client={apolloClient}>
                {isLoading ? (
                  <div className="loader-wrapper">
                    {url === "Christmas" ? (
                      <div id="preloader"></div>
                    ) : (
                      <div className="loader"></div>
                    )}
                  </div>
                ) : (
                  <>
                    {/* <MessengerCustomerChat
            pageId="2123438804574660"
            appId="406252930752412"
            htmlRef="https://connect.facebook.net/en_US/sdk.js"
          /> */}
                    <Helmet>
                      <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                      />
                      {/* <Head>
                    random  e store favicon from internet
                    <link
                      rel="icon"
                      type="image/x-icon"
                      href=""
                    /> 
                  </Head> */}
                      <title>
                        DRAZEN - Will be the best online store for you
                      </title>
                    </Helmet>
                    <div>
                      <CompareContextProvider>
                        <CurrencyContextProvider>
                          <FilterProvider>
                            <Component {...pageProps} />
                          </FilterProvider>
                        </CurrencyContextProvider>
                      </CompareContextProvider>
                      <ToastContainer />
                      <TapTop />
                    </div>
                  </>
                )}
              </ApolloProvider>
            </WishlistContextProvider>
          </AuthContextProvider>
        </CartContextProvider>
      </QueryClientProvider>
    </>
  );
}
