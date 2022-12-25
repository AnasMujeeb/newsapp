import React, { Component } from 'react'
import Loader from './Loader.jsx';
import NewsItem from "./NewsItem.jsx"
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
  
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResult : 0
    }
  }
  async componentDidMount() {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=e1d5f921911a46f48022936125f06baa&pageSize=9`
    this.setState({
      loading :true
    })
    const data = await fetch(url)
    const parsedData = await data.json()
    console.log(parsedData.articles.length)
    this.setState({
      articles: parsedData.articles,
      loading: false,
      totalResult : parsedData.totalResult
    })
  }
 
  // async preBtnHandler(){
  //   const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=e1d5f921911a46f48022936125f06baa&page=${this.state.page-1}&pageSize=9`
  //   this.setState({
  //     loading :true
  //   })
  //   const data = await fetch(url)
  //   const parsedData = await data.json()
  //   this.setState ({
  //     articles : parsedData.articles,
  //     loading : false,
  //     page : this.state.page - 1
  //   })
  // }
  // async nextBtnHandler(){
  //   const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=e1d5f921911a46f48022936125f06baa&page=${this.state.page + 1}&pageSize=9`
  //   this.setState({
  //     loading :true
  //   })

  //   const data = await fetch(url)
  //   const parsedData = await data.json()
    
  //   this.setState({
  //     articles: parsedData.articles,
  //     loading: false,
  //     page : this.state.page + 1
  //   })
  // }
  async fetchMoreData(){
    this.setState({
      page : this.state.page + 1
    })
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=General&apiKey=e1d5f921911a46f48022936125f06baa&page=${this.state.page}&pageSize=9`
    const data = await fetch(url)
    const newData = await data.json()
    console.log(newData.articles)
    this.setState({
      articles: this.state.articles.concat(newData.articles),
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
          <InfiniteScroll 
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4 className='container text-center'>Loading...</h4>}
          >
        <div className='d-flex flex-row justify-content-around flex-wrap'>
          {this.state.articles.map(obj => (
            <NewsItem name={obj.title} description={obj.description} url={obj.url} urlToImage={obj.urlToImage} />
            ))
          }
        </div>
          </InfiniteScroll>
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
