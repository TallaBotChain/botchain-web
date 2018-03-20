import React from 'react'

class SearchResults extends React.Component {

  render() {
    if (this.props.isFetching) {
      return (<h4>Retrieving Results. Please wait...</h4>)
    }
    if (this.props.bots.length == 0) {
      return (<h4>No results were found for query: <b>{this.props.query}</b></h4>)
    }

    return (
      <div>
        <h4>Results for query: <b>{this.props.query}</b></h4>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {this.props.bots.map((bot, i) => (
              <tr key={i}>
                <td>{bot.id}</td>
                <td>{bot.name}</td>
                <td>{bot.description}</td>
                <td>{bot.tags.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default SearchResults;
