import React, { Component } from 'react';
import '../css/App.css';
import * as d3 from 'd3';
import Rcvsankey from './components/Rcvsankey';
import FontAwesome from 'react-fontawesome';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: null,
    };
  }





  componentDidMount() {
    const files = ["data/sankey.json"]
    //const types = [this.type3, this.type, this.type2, this.type]
    //const csvPattern = new RegExp(".csv$")
    //const jsonPattern = new RegExp(".json$")
    Promise.all(files.map((url,i) => d3.json(url)

    )).then(values => {
      this.setState({
        data: values[0],
      })
    })

  }
  render() {
    const {data} = this.state
    return (
      <div className="App">
         <div id="intro" className="container">
          <div id="title">
            <h1>How Ranked Choice Determined San Francisco's Next Mayor</h1>

            <p>Despite trailing over 10 points behind London Breed in the initial tally of voters' first choices, 
            Mark Leno took the lead on election night through a quirk of our voting system. Here's how he almost won. </p>

            <p> San Francisco uses a ranked-choice voting system, which also goes by instant-runoff or preferential voting. In the event that no candidate 
            receives a majority of first-choice votes, the candidate with least amount of votes is eliminated, and their votes are 
            redistributed among voters' 2nd and 3rd choices. If voters did not rank 2nd or 3rd choices, or if their 2nd or 3rd 
            choices have already been eliminated, their vote is considered exhausted. Candidates with the least amount of votes 
            are eliminated in rounds until one emerges with more than 50 percent of the vote.</p>

            <p> This graphic illustrates how each candidates' votes were redistributed with a sankey diagram. Despite the vast majority
            of Jane Kim's votes going to Leno, Breed managed to eke out the win after more ballots were counted. </p>

            <p> <FontAwesome name="fa-hand-pointer-o" className="fa-hand-pointer-o"/> Mouse over the connections to see how many votes were redistributed at each step. </p>
            
            

          </div>
        </div>

        <div id="article">

          <div className='graphic' id='graphic1'>
            <div className="viz" id="viz1">
              {data != null && <Rcvsankey data={data}/>}
            </div>
        
          </div>
        </div>
      </div>
    );
  }
}

export default App;
