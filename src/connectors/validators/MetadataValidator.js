import axios from 'axios'

export class MetadataValidator {

  constructor(fields, required_fields) {
    this.fields = fields
    this.required_fields = required_fields
  }

  validate(url, props) {
    props.dispatch(props.change("metadata", {}))
    return new Promise((resolve, reject) => {
      var config = {
        headers: {'Access-Control-Allow-Origin': '*'}
      };
      axios.get(url).then((response) => {
        //check if all required fields are present
        for (var i = 0; i < this.required_fields.length; i++) {
          if(!response.data[this.required_fields[i]]){
            return reject({ "metadata_url": 'Required attributes are missed' })
          }
        }
        //we need only allowed fields.
        let metadata = {};
        for (var i = 0; i < this.fields.length; i++) {
          metadata[this.fields[i]] = response.data[this.fields[i]]
        }
        //redux-form has a bug in asyncValidate - https://github.com/erikras/redux-form/issues/3895
        //so we had to dispatch change from here
        props.dispatch(props.change("metadata", metadata))
        resolve()
      })
      .catch((error) => {
        let error_msg = "Failed to load metadata file."
        let details = ""
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          details = ` Status code: ${error.response.status}`
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          details = " No response was received"
        }
        reject({ "metadata_url": `${error_msg}${details}` })
      });
    })
  }
}
