import React, {Component} from 'react';
import axios from "axios";
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';
import ReactDOM from 'react-dom';
import "./style.css";

class Debits extends Component {

    constructor(props){
        super(props);
        this.state={            
            debits: this.props.debits,
            newAmount: "",
            newDescription: "",
        }
    }
    

    printAllQueries = () => {
        
        let output = []; //output collector
        
        //map and select query results        
        output = this.props.debits.map(deb => 
        <div className="debit-result">             
            <div className="description">{deb.description}</div>
            <div className="amount">{deb.amount}  </div>
            <div className="date">{deb.date}  </div>                   
        </div>)          
        
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
        this.props.addDebit(Number(this.state.newAmount), this.state.newDescription);               
      }


    render() {
        const debitOutput = this.printAllQueries();
        return (
            
            <div >
                <h1>Debits</h1>
                <AccountBalance accountBalance={this.props.accountBalance}/>

                <br></br>
                <Link to="/">HOME</Link>

                
                <div>
                    <h3>New Debit Entry:</h3>
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

                <div className="debit-activity">
                <div className="debit-result"> 
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
                    {debitOutput}                
                </div>
            </div>
            
        );
    }
}

export default Debits;