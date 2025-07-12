import "./App.css";
import NavBar from "./components/NavBar";
import ProductGrid from "./components/ProductGrid";
import productsData from "./data/products.json";

function App() {
  return (
    <div className="App">
      <NavBar />
      <ProductGrid products={productsData} />
    </div>
  );
}

export default App;
