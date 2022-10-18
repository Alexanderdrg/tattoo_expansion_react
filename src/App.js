import { Container, Row } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import Product from './components/Product';
import NavbarComponent from './components/NavbarComponent';
import HeaderComponent from './components/HeaderComponent';

function App() {
  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <div>
        <HeaderComponent></HeaderComponent>
        <Product></Product>
      </div>
    </div>
  );
}

export default App;
