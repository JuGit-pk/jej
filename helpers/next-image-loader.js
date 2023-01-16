import { API_URL } from "../config/constants";

export const nextLoader = ({ src }) => {
  return `${API_URL}${src}`;
};
