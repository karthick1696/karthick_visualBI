import { defaultHeaders as headers } from "../common/config";
import { API, BASE_URL } from "../common/constants";
import RestClient from "./restClient";

export const getAllSongsApi = () => {
  const config = { headers };
  config.url = `${BASE_URL}${API.PHOTOS}`;

  return RestClient.get(config);
};
