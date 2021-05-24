import { Component } from "react";
import { HTTP_REQ } from "../common/constants";

class RestClient extends Component {
  static get(config) {
    const { url, headers } = config;

    return fetch(url, {
      method: HTTP_REQ.GET,
      headers,
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => err);
  }
}

export default RestClient;
