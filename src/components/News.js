import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export default class News extends Component {
   
    
constructor(){
    super();
    this.state = {
        articles: [],
        loading: false,
        page:1
    }
}
async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=d7d03996e8484cea80abb3760149b805&page=1&pageSize=${this.props.pagesize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData= await data.json()
    this.setState({articles: parsedData.articles,totalResults:parsedData.totalResults, loading :false})
}
 handleprevclick=async()=>{
    console.log("previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=d7d03996e8484cea80abb3760149b805&page=${this.state.page-1}&pageSize=${this.props.pagesize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData= await data.json()
    this.setState({articles: parsedData.articles})
    this.setState({
        page:this.state.page-1,
        articles:parsedData.articles,
        loading :false
    })
}
handlenextclick=async()=>{
    console.log("next");
    if(!this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pagesize)){

    }
    else{

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=d7d03996e8484cea80abb3760149b805&page=${this.state.page+1}&pageSize=${this.props.pagesize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData= await data.json()
    this.setState({articles: parsedData.articles})
    this.setState({
        page:this.state.page+1,
        articles:parsedData.articles,
        loading :false
    })

}

}   
  render() {
    return (
        <>
      <div className="container my-3 text-center ">
        <h2 className="my-5">NewsFlash-Top Headlines</h2>
        {this.state.loading && <Spinner/>}
       
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem  title={element.title.slice(0,45)} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
          </div>
        })}
          <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handleprevclick}>&larr;Previous</button>
          <button disabled ={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pagesize)}type="button" class="btn btn-dark" onClick={this.handlenextclick}>Next&rarr;</button>
          </div>
     
        </div>
      </div>
      </>
    );
  }
}
