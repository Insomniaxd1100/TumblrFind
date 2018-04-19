import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Result class is a component that shows the result that user get from api endpoints
//for pagination, there is a state called currentPage to show current page 
//Also for how much data to show on one page, there is a state called dataPerPage
export default class Result extends Component {
  constructor(){
    super()
    this.state = {
      currentPage: 1,
      dataPerPage: 12
    } 
    //the event handling function is bind with 'this'. Actually, now in ES6 we don't need to bind any function. It is done itself
    this.handleClick = this.handleClick.bind(this)
  }

  //handleClick function that will keep track which page i being rendered
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
   
  render(){
    var information = this.props.data
    var currentTodos = [];
    var pageNumbers = [];
    var informations = information.filter((i) => {
      if(i.type == "photo") return i
    })

    var currentPage = this.state.currentPage;
    var dataPerPage = this.state.dataPerPage;
      
    //indexOfFirstTodo is index of first image
    //indexOfLastTodo is index of last image
    const indexOfLastTodo = currentPage * dataPerPage;
    const indexOfFirstTodo = indexOfLastTodo - dataPerPage;
    currentTodos = informations.slice(indexOfFirstTodo, indexOfLastTodo);
    
    //pageNumbers is an array of all the pages
    for (let i = 1; i <= Math.ceil(informations.length / dataPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
        <div className="container">
            {
              (informations.length > 0) ? <div className="result3">
                <h1 className="posts">{this.props.tag}</h1>
                <div className="result1">
                  {
                    currentTodos.map((info, index) => {
                      return (
                        <div key={index} className="result2">
                          <a href={info.post_url} target="_blank"><img className="imageList" src={info.photos[0]["alt_sizes"][1]["url"]} /></a>
                          <a className="link" href={info.post_url} target="_blank"><h3 className="name">Blog name : { info["blog_name"] }</h3></a>
                        </div>
                      )
                    })
                  }
                </div>
                <div className="page-numbers">
                  {
                    pageNumbers.map(number => {
                      return (
                          <button className="page-button" key={number} id={number} onClick={this.handleClick}>{number}</button>
                      )
                    })
                  }
                </div>
              </div> : <h1 />
            }
        </div>
    )
  }
}