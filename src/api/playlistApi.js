import { defaultHeaders as headers } from "../common/config";
import { API, BASE_URL } from "../common/constants";
import RestClient from "./restClient";

export const getAllAlbumsApi = () => {
  const config = { headers };
  config.url = `${BASE_URL}${API.ALBUMS}`;

  return RestClient.get(config);
};
