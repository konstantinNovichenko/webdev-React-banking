import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Debits from './components/Debits';
import Credits from './components/Credits';
import axios from "axios";

class App extends Component{
  constructor()
  {
    super();
    this.state = {
      accountBalance: 0,
      credits: [],
      debits: [],      

      currentUser: {
        userName: 'john_wick',
        memberSince: '08/23/99',
      }
    }
  }

  componentDidMount(){
    //get data from API
    axios
    .get("https://moj-api.herokuapp.com/debits")
    .then((response) =>{            
        this.setState({debits: response.data}); //store the fetched data   
        this.updateAccountBalance(); //update account balance
    })
    .catch((err) => console.log(err)); //send an error message to the console     

    axios
    .get("https://moj-api.herokuapp.com/credits")
    .then((response) =>{            
        this.setState({credits: response.data}); //store the fetched data   
        this.updateAccountBalance(); //update account balance
        })
     .catch((err) => console.log(err)); //send an error message to the console        
     
  }

  //check all credits and debits and update account balance
  updateAccountBalance = () =>{
    let totalCredit = 0;
    let totalDebit = 0;

    
    for(let i = 0; i < this.state.debits.length; i++)
    {
      totalDebit += this.state.debits[i].amount;
    }
    
    for(let i = 0; i < this.state.credits.length; i++)
    {
      totalCredit += this.state.credits[i].amount;
    }   


    this.setState({accountBalance: (totalCredit - totalDebit).toFixed(2)});    
  }


  //log in template
  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }


  //add new debit entry
  addDebit = (newAmount, newDescription) => {
    
    let d = new Date();  
    let newEntry = {
      amount: newAmount,
      date: d.toISOString(),
      description: newDescription
    };   

    this.state.debits.push(newEntry);
    this.updateAccountBalance();    //update account balance
  }

  //add new credit entry
  addCredit = (newAmount, newDescription) => {
    
    let d = new Date();  
    let newEntry = {
      amount: newAmount,
      date: d.toISOString(),
      description: newDescription
    };   

    this.state.credits.push(newEntry);
    this.updateAccountBalance();    //update account balance
  }
  
  render(){
    //componenets
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (<UserProfile userName={this.state.currentUser.userName}
    memberSince={this.state.currentUser.memberSince}/>);
    const LogInComponent = () => (<LogIn user={this.state.currentUser} 
      mockLogIn={this.mockLogIn} {...this.props}/>);
    const DebitsComponent = () => (<Debits accountBalance={this.state.accountBalance} 
    debits={this.state.debits} addDebit={this.addDebit}/>);
    const CreditsComponent = () => (<Credits accountBalance={this.state.accountBalance}
    credits={this.state.credits} addCredit={this.addCredit}/>);

    return(
      <Router>
        <Switch>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
        </Switch>        
      </Router>      
    );
  }
    
  
  
}

export default App;
