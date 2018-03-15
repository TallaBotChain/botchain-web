import axios from 'axios'

export class MetadataValidator {

  constructor(required_fields) {
    this.required_fields = required_fields
  }

  //fetch metadata from url.
  static fetch(url, props){
    return new Promise((resolve, reject) => {
      axios.get(url).then((response) => {
        let metadata = JSON.stringify(response.data, null, 2)
        props.dispatch(props.change("metadata", metadata))
        resolve()
      }).catch((error) => {
        resolve()
      })
    })
  }

  validate(metadata) {
    try {
      metadata = JSON.parse(metadata)
    } catch (e) {
      return "is not valid JSON";
    }

    for (var i = 0; i < this.required_fields.length; i++) {
      if(!metadata[this.required_fields[i]]){
        return 'Required attributes are missed'
      }
    }

    return undefined
  }
}
