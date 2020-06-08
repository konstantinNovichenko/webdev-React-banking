import React, {Component} from 'react';
import axios from "axios";
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';

class Credits extends Component {

    constructor(props){
        super(props);
        this.state={            
            credits: this.props.credits,            
            newAmount: "",
            newDescription: "",
        }
    }
    

    printAllQueries = () => {
        let output = []; //output collector
        
        //map and select query results        
        output = this.props.credits.map(cred => 
        <div className="credit-result">             
            <div className="description">{cred.description}</div>
            <div className="amount">{cred.amount}  </div>
            <div className="date">{cred.date}  </div>                   
        </div>)               
        
        //render query results
        return output;        
    }

    handleChangeAmount = (e) => { 
        const inputValue = e.target.value;    
        this.setState({newAmount: inputValue})
      }

    handleChangeDesc = (e) => { 
        const inputValue = e.target.value;    
        this.setState({newDescription: inputValue})
      }
    
    handleSubmit = (e) => {
        e.preventDefault()     

        //send new entry values to parent
        this.props.addCredit(Number(this.state.newAmount), this.state.newDescription);               
      }

    render() {

        let creditOutput = this.printAllQueries();
        return (
            
            <div >
                <h1>Credits</h1>
                <AccountBalance accountBalance={this.props.accountBalance}/>

                <br></br>
                 <Link to="/">HOME</Link>
                
                <div>
                    <h3>New Credit Entry:</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="description">Description</label>
                            <input type="text" name="description" onChange={this.handleChangeDesc}/>
                        </div>
                        <div>
                            <label htmlFor="amount">Amount</label>
                            <input type="number" step=".01" name="amount" onChange={this.handleChangeAmount}/>
                        </div>
                        
                        <button>Add</button>
                    </form>
                </div>

                <div className="credit-activity">
                    <div className="credit-result"> 
                        <div className="description">
                            <h3>Description</h3>
                        </div>
                        <div className="amount">
                            <h3>Amount</h3>
                        </div>
                        <div className="date">
                            <h3>Date</h3>
                        </div>
                    </div> 
                    {creditOutput}
                </div>
            </div>          
            
        );
    }
}

export default Credits;