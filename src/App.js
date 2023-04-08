import React from 'react';
import ReactDOM from 'react-dom';
  
let dataList = [];
class randomQuotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      quote: "",
      author: "",
      color: ""
    };
    this.setQuote = this.setQuote.bind(this);
    this.getQuote = this.getQuote.bind(this);
    this.getRandomColor = this.getRandomColor.bind(this);
  }
  componentDidMount(){
    fetch("https://type.fit/api/quotes")
    .then((response) => response.json())
    .then((data) => {
       dataList = data;
       this.getQuote();
    });
  }
  getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#8';
    for (let i = 0; i < 5; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  // Add handleChange() and submitMessage() methods here
  getQuote(){
    let randomNum = Math.floor(Math.random() * dataList.length);
    let color = this.getRandomColor();
    this.setQuote(dataList[randomNum],color);
  }

  setQuote(data,color){
    this.setState ({
      quote: '"' + data.text + '"',
      author: data.author,
      color:color
    })
  }
  render() {
    return (
      <div style= {{backgroundColor: this.state.color}} id='parent'>
        <div id='quote-box'>
          <p id='text' style= {{color: this.state.color}}> {this.state.quote} </p>
          <div className='footer'>
            <p id='author' style= {{color: this.state.color}}> ~ {this.state.author}</p> 
            <div className='lower'>
              <a id='tweet-quote' style= {{color: this.state.color}} target='_top' href='https://twitter.com/home'>Tweet</a>
              <button id='new-quote' style= {{color: this.state.color,backgroundColor: "black"}} onClick = {this.getQuote}  className='btn btn-default'>New Quote</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default randomQuotes;
