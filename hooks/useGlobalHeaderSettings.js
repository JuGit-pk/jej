import { useQuery } from ".";
import { GET_GLOBAL_HEADER_SETTINGS } from "../gql/queries";

const useGlobalHeaderSettings = () => {
  const { data, loading, error } = useQuery(
    "global-header-settings",
    GET_GLOBAL_HEADER_SETTINGS
  );
  return { data, loading, error };
};

export default useGlobalHeaderSettings;
