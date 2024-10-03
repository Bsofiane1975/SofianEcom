
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Acceuil from './ecrans/Acceuil';
import EcranProduit from './ecrans/EcranProduit';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <Link to="/">MULTIPLATEFORME ECOMMERCE </Link>
        </header>

        <main>
          <Routes>
            
            <Route path="/produit/:slug" element={<EcranProduit/>} />
            <Route path="/" element={<Acceuil />} />
          </Routes>
          
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
