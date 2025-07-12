import './App.css';
import NavBar from './components/NavBar';
import ProductGrid from './components/ProductGrid';
import {productsData} from './data/products';

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <ProductGrid></ProductGrid>
    </div>
  );
}

export default App;
