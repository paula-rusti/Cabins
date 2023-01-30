const url = "http://localhost:8000"

class ApiClient {

  async fetchCabins(params) {
    const route = "/cabins"
    let fetchUrl = url + route + "?" + this.buildQueryString(params)
    const res = await fetch(fetchUrl);
    return await res.json();
  }

  buildQueryString(params) {
    /*
    * params = {key1: str, key2: arr[str], ..}
    * */
    var queryString = Object.entries(params)
      .flatMap(
        ([key, value]) => {
          if (Array.isArray(value)) {
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
}

export default new ApiClient()
