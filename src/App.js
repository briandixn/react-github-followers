import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      user: ''
    }
  }
//console.log(res.json())
apiCall(e){
  console.log(e)
  console.log("clicked")
  e.preventDefault();
  fetch(`https://api.github.com/users/${this.state.user}/followers`)
  .then(res => {
    if (!res.ok){
      return console.log("failed");
    }
    return res.json()



  }).then (data => {
    console.log(data)
    this.setState({items: data})
  })
}

handleChange(event){
  this.setState({user: event.target.value})
  console.log(this.state.user);
}
///handles the next page of calls
nextcall(e){
  console.log("button pushed");
  console.log(e)
  console.log("clicked")
  e.preventDefault();
  fetch(`https://api.github.com/users/${this.state.user}/followers?page=2`)
  .then(res => {
    if (!res.ok){
      return console.log("failed");
    }
    return res.json()



  }).then (data => {
    console.log(data)
    this.setState({items: data})
  })
}

  render() {
    const lists = this.state.items.map((item, i) => (

      <li key={i}> {item.login}</li>
    ))
    return (
      <div className="App">
        <h1> github app for searching for followers</h1>
        <form onSubmit= {(e) => this.apiCall(e)}>
        <input type="text" name="user" value={this.state.user} onChange={this.handleChange.bind(this)}></input>
        <button type="submit" value="submit">get github data</button>
        <button onClick= {(e) => this.nextcall(e)}>next page</button>
        </form>

        <ul>
        {lists}
        </ul>
      </div>
    );
  }
}

export default App;
