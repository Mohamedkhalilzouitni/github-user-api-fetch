
import React from 'react';
import './App.css';
import axios from 'axios';

const CardList = (props) => {
  return (
    <div>
      {props.profiles.map(profile => <Card key={profile.id} {...profile} />)}
    </div>
  );
}

class Card extends React.Component {
render() {
  const profile = this.props;
  return (
    <div className="github-profile">
      <img src={profile.avatar_url} alt='github profile avatar'/>
      <div className="info">
        <div className="name">{profile.name}</div>
        <div className="company">{profile.company}</div>
      </div>
    </div>
  );
}
}

class Form extends React.Component {  
state = {userName: ''};
handleSubmit = async (event) => {
  event.preventDefault();
  const profile = await axios.get(`https://api.github.com/users/${this.state.userName}`);
  this.props.append(profile.data);
  this.setState({userName: ''});
};  
render() {   
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            placeholder="Type github username"
            value={this.state.userName}
            onChange={event => this.setState({userName:event.target.value})}
            required 
            />
          <button>Search</button>
        </form>
      </div>
    )
  }
}

class App extends React.Component {
  title = 'The GitHub Cards App';
  state = {
      profiles: []
  };
  addNewProfile = (profile) => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profile]
    }));
    console.log(profile);
  };
  render() {
    return (
      <div>
        <div className="header">{this.title}</div>
        <Form append={this.addNewProfile} />
        <CardList profiles={this.state.profiles}/>
      </div>
    );
  }	
}

// ReactDOM.render(
// <App title="The GitHub Cards App" />
// );


export default App;
