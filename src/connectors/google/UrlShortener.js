import axios from 'axios'

const SHORTENER_API_URL = "https://www.googleapis.com/urlshortener/v1/url"

export class UrlShortener {

  static shorten(url) {
    return new Promise((resolve, reject) => {
      axios.post(`${SHORTENER_API_URL}?key=${URLSHORTENER_API_KEY}`, {"longUrl": url}).then((response) => {
        resolve(response.data.id)
      }).catch((error) => {
        reject("Failed to shorten url")
      })
    })
  }

}
