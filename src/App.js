import {BrowserRouter as Router, Route} from 'react-router-dom';
import CreateNote from './components/CreateNote';
import CreateUser from './components/CreateUser';
import Nav from './components/Nav';
import Notes from './components/Notes';


function App() {
  return (
    <Router >
      <Nav /> 
      
      <Route exact path="/" component={Notes}/>
      <Route exact path="/edit/:id" component={CreateNote}/>
      <Route exact path="/notes" component={CreateNote}/>
      <Route exact path="/users" component={CreateUser}/>
    </Router>
    
  );
}

export default App;
