import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export default class News extends Component {
    articles= [
        {
            "source": {
                "id": "al-jazeera-english",
                "name": "Al Jazeera English"
            },
            "author": "Al Jazeera",
            "title": "Afghanistan beats Pakistan for first time in T20I cricket series",
            "description": "Afghanistan and Pakistan met seven times in total with Pakistan always coming out on top – until the match on Friday.",
            "url": "http://www.aljazeera.com/news/2023/3/25/afghanistan-beats-pakistan-for-first-time-in-t20i-cricket-series",
            "urlToImage": "https://www.aljazeera.com/wp-content/uploads/2023/03/AP22308418907883.jpg?resize=1200%2C675",
            "publishedAt": "2023-03-25T03:04:36Z",
            "content": "Afghanistan has defeated Pakistan in a T20 International (T20I) marking the Afghan sides first win in four T20Is against Pakistan.\r\nThe cricket teams have met seven times in all, playing three previo… [+2859 chars]"
        },
        {
            "source": {
                "id": "espn-cric-info",
                "name": "ESPN Cric Info"
            },
            "author": null,
            "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
            "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
            "publishedAt": "2020-04-27T11:41:47Z",
            "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
        },
        {
            "source": {
                "id": "espn-cric-info",
                "name": "ESPN Cric Info"
            },
            "author": null,
            "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
            "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
            "publishedAt": "2020-03-30T15:26:05Z",
            "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
        }
    ]
    
constructor(props){
    super();
    this.state = {
        articles: this.articles,
        loading: false,
        page:1
    }
}
async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=d7d03996e8484cea80abb3760149b805&page=1&pageSize=${this.props.pagesize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData= await data.json()
    this.setState({articles: parsedData.articles,totalResults:parsedData.totalResults, loading :false})
}
 handleprevclick=async()=>{
    console.log("previous");
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=d7d03996e8484cea80abb3760149b805&page=${this.state.page-1}&pageSize=${this.props.pagesize}`;
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

    
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=d7d03996e8484cea80abb3760149b805&page=${this.state.page+1}&pageSize=${this.props.pagesize} `;
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
        <h2>NewsMonkey-Top Headlines</h2>
        {this.state.loading && <Spinner/>}
       
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem  title={element.title.slice(0,45)} description={element.description.slice(0,88)} imageUrl={element.urlToImage} newsUrl={element.url} />
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
