import React, {Component} from 'react';
import axios from "axios";

class AccountBalance extends Component {

    constructor(props){
        super(props);
        
    }


    
    render() {
        return (
            <div>
            <h3>Balance: {this.props.accountBalance} </h3>
            </div>            
        );
    }
}

export default AccountBalance;