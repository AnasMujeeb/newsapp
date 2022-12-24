import React, { Component } from 'react'
import Loader from './Loader.jsx';
import NewsItem from "./NewsItem.jsx"

export default class News extends Component {
  
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }
  async componentDidMount() {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=e1d5f921911a46f48022936125f06baa&pageSize=9`
    this.setState({
      loading :true
    })
    const data = await fetch(url)
    const parsedData = await data.json()
    console.log(parsedData)
    this.setState({
      articles: parsedData.articles,
      loading: false
    })
  }
 
  async preBtnHandler(){
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=e1d5f921911a46f48022936125f06baa&page=${this.state.page-1}&pageSize=9`
    this.setState({
      loading :true
    })
    const data = await fetch(url)
    const parsedData = await data.json()
    this.setState ({
      articles : parsedData.articles,
      loading : false,
      page : this.state.page - 1
    })
  }
  async nextBtnHandler(){
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=e1d5f921911a46f48022936125f06baa&page=${this.state.page + 1}&pageSize=9`
    this.setState({
      loading :true
    })

    const data = await fetch(url)
    const parsedData = await data.json()

    this.setState({
      articles: parsedData.articles,
      loading: false,
      page : this.state.page + 1
    })
  
   
    
  }

  render() {


    return (
      <>
      {
        this.state.loading ? 
       <Loader/>
        : <>
        <div className='container my-4'>
        <h1>News App</h1>
        <div className='d-flex flex-row justify-content-around flex-wrap'>
          {this.state.articles.map(obj => (
            <NewsItem name={obj.title} description={obj.description} url={obj.url} urlToImage={obj.urlToImage} />
          ))
          }
        </div>
        <div className='d-flex justify-content-between '>

        <button disabled={this.state.page <= 1 ? true : false} type="button" class="btn btn-dark" onClick={()=>this.preBtnHandler()}>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(68/9) ? true : false} type="button" class="btn btn-dark" onClick={()=>this.nextBtnHandler()}>Next &rarr;</button>
       
        </div>
      </div>

        </>
        
      }
      
      </>
    )
  }
}
