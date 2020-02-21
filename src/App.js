import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Join from './components/join'
import Chat from './components/chat'

function App() {
  return (
    <Router>
        <Route exact path="/" component={Join}/>
        <Route  path="/chat" component={Chat}/>
    </Router>
  );
}

export default App;
