import Top from './components/pages/Top'
import Meeting from './components/pages/Meeting'
import Meeting2 from './components/pages/Meeting2'
import Meeting3 from './components/pages/Meeting3'
import Meeting4 from './components/pages/Meeting4'
import Header from './components/Header';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
const BrowserRouter = require("react-router-dom").BrowserRouter;
const Route = require("react-router-dom").Route;
const Link = require("react-router-dom").Link;

const App = () => {
  return (
    <div className='field'>
      <Header></Header>
      <BrowserRouter>
          
        <Route exact path="/" component={Top} />
        
        <Route exact path="/enter" component={Meeting} />
        <Route exact path="/enter2" component={Meeting2} />
        <Route exact path="/enter3" component={Meeting3} />
        <Route exact path="/enter4" component={Meeting4} />
      </BrowserRouter>


    </div>
  );
}

export default App;
