import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Result from './Result';
import { ClipLoader } from 'react-spinners';

//class Main is the main component that we can see in the browser
//tag is a string variable state that stores whatever user will input
//for telling user that the data is loading, loading state is used that will show the spinner when the data is getting loaded   
export default class Main extends Component {
  constructor(){
    super()
    this.state = {
      tag: "",
      data: [],
      loading: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this) 
  }

  //handleChange function will change the state of tag so it can store the data from user
  handleChange(event){
    this.setState({
      tag: event.target.value
    })
  }

  //handleSumbit function will send and axios request to Tumblr api to fetch data
  handleSubmit(event){
    event.preventDefault()
    this.setState({loading: true})
    axios.get(`https://api.tumblr.com/v2/tagged?tag=${this.state.tag}&api_key=vmfganE2Y6NoZqI16yr11yxvLigBWuzv1HOdpa6Adp9NRZ4mOX`)
    .then(res => {
      this.setState({data: res.data.response, loading: false})
    })
  }
  
  render(){
    //information is a variable having all the data from the end points
    var information = this.state.data;
    
    return (
        <div className="container">
          <div className="title">
            <h1> Search Your Tag Image </h1>
          </div>
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="labelinput">
              <label className="label"> Tag Name </label>     
              <input className="input" type="text" onChange={this.handleChange} placeholder="Name"/>
            </div>
            <ClipLoader color={'#123abc'} loading={this.state.loading} />
            <button type="submit" className="button"> Search </button>
          </form>
          <div className="imagesMain">
            {
              (information.length > 0) ? <Result data={this.state.data} tag={this.state.tag} /> : <h1 />
            }
          </div>
        </div>
    )
  }
}