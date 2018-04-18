import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

export default class Main extends Component {
  constructor(){
    super()
    this.state = {
      tag: "",
      data: [],
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this) 
  }

  handleChange(event){
    this.setState({
      tag: event.target.value
    })
  }
   
  handleSubmit(event){
    event.preventDefault()
    axios.get(`https://api.tumblr.com/v2/tagged?tag=${this.state.tag}&api_key=vmfganE2Y6NoZqI16yr11yxvLigBWuzv1HOdpa6Adp9NRZ4mOX`)
    .then(res => {
      console.log("response", res.data.response)
    })
  }
  
  render(){
    var information = this.state.data;
    console.log("see", information)
    
    return (
        <div className="container">
          <div className="title"> 
            <img className="loogo1" src="/button2.png" />
            <h1 className="h1"> Artistry </h1>
            <img className="loogo1" src="/button2.png" />
          </div>
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="labelinput">
              <label className="label"> Tag </label>     
              <input className="input" type="text" onChange={this.handleChange} placeholder="Name"/>
            </div>
           
            <button type="submit" className="button"> Search </button>
          </form>
          <div>
            {
              (information.length > 0) ? <div className="result3">
                  {
                    information.map((info, index) => {
                      return (
                          <div key={index} className="result2">
                            <h1>{info["photos"]["0"]}</h1>
                          </div>
                      )
                    })
                  }
                </div> : <h1 />
            }
          </div>
                
        </div>
    )
  }
}