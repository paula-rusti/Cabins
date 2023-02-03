const url = "http://localhost:8000"

class ApiClient {

  async fetchCabinsData(params) {
    const route = "/cabins"
    let fetchUrl = url + route + "?" + this.buildQueryString(params)
    try {
      const fetchResponse = await fetch(fetchUrl);
      return await this.unwrapResponseData(fetchResponse)
    } catch (e) {
      return Promise.reject(e)
    }

  }

  buildQueryString(params) {
    /*
    * params = {key1: str, key2: arr[str], ..}
    * */
    var queryString = Object.entries(params)
      .flatMap(
        ([key, value]) => {
          if (Array.isArray(value) && value !== []) {
            let ret_val = []
            value.forEach((value) => {
              ret_val.push(encodeURIComponent(key) + "=" + encodeURIComponent(value))
            })
            return ret_val
          }
          if (value === true) {
            return (encodeURIComponent(key));
          }
          return (encodeURIComponent(key) + "=" + encodeURIComponent(value));
        }
      )
      .join("&");
    return (queryString);
  }

  async unwrapResponseData(response) {
    return await response.json()
  }
}

export default new ApiClient()
