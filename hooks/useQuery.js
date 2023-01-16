import { useContext } from "react";
import { request, GraphQLClient } from "graphql-request";
import { useQuery as useRQuery } from "react-query";
import { GRAPHQL_API_URL } from "../config/constants";
import { AuthContext } from "../contexts/auth/AuthContext";

const useQuery = (key, query, variables, options) => {
  const { isUser, Cookies } = useContext(AuthContext);
  const client = new GraphQLClient(GRAPHQL_API_URL, {
    headers: {
      authorization: `Bearer ${isUser && Cookies.get("user")}`,
    },
  });

  if (isUser) {
    const fetchData = async () => {
      const data = await client.request(query, variables);
      return data;
    };
    console.log("CALLING With USER", key);
    return useRQuery(key, fetchData, options);
  } else {
    const fetchData = async () => {
      const data = await request(GRAPHQL_API_URL, query, variables);
      return data;
    };
    console.log("CALLING WithOut USER", key);

    return useRQuery(key, fetchData, options);
  }
};

export default useQuery;
