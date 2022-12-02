import axios from "axios";
import { apiKey } from "../config";
export default class Search {
  constructor(query) {
    this.query = query;
  }
  async getResult() {
    const options = {
      method: "GET",
      url: "https://api.spoonacular.com/recipes/complexSearch",
      params: { apiKey: apiKey, number: 100, query: this.query },
    };
    try {
      const res = await axios.request(options);
      this.result = res.data.results;
    } catch (error) {
      alert(error);
    }
  }
}
