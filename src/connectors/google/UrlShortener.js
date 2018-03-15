import axios from 'axios'

const SHORTENER_API_URL = "https://www.googleapis.com/urlshortener/v1/url"

export class UrlShortener {

  static shorten(url, api_key) {
    console.log(url + "  " + api_key)
    return new Promise((resolve, reject) => {
      axios.post(`${SHORTENER_API_URL}?key=${api_key}`, {"longUrl": url}).then((response) => {
        resolve(response.data.id)
      }).catch((error) => {
        reject("Failed to shorten url")
      })
    })
  }

}
