import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Acceuil from './ecrans/Acceuil';
import EcranProduit from './ecrans/EcranProduit';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useContext } from 'react';
import { magazin } from './magazin';
import CartScreen from './ecrans/CartScreen';
import SigningScreen from './ecrans/SIgningScreen';
import ShippingScreen from './ecrans/ShippingScreen';
import SignupScreen from './ecrans/SignupScreen';
import PaymentScreen from './ecrans/PayementScreen';
import PlaceOrderScreen from './ecrans/PlaceOrderScreen';
import OrderScreen from './ecrans/OrderScreen';
import OrderHistoryScreen from './ecrans/OrderHistoryScreen';
import ProfileScreen from './ecrans/ProfilScreen';

function App() {
  const { state,dispatch:ctxDispatch } = useContext(magazin);
  const { cart,userInfo } = state;

  const DECONNECTER = () =>{
    ctxDispatch({ type: 'DECONNECTER' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('AdresseLivraison');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/connect';

  }
  return (
    <BrowserRouter>
      <div className="d-flex flex-column  sit-container">
        {/* afficher message d'erreur4 de mot de passe ou email */}
      <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark" expand ="lg">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Ecommerce </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-Navbar-nav" />
              <Navbar.Collapse id ="basic-Navbar-nav">
              <Nav className="me-auto  w-100 justify-content-end">
                <Link to="/carte" className="nav-link">
                  cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {/* {cart.cartItems.length} */}
                      {cart.cartItems.reduce((a, c) => a + c.quantité, 0)} 
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.nom} id ="basic-nav-dropdown">
                    <LinkContainer to="/profile" >
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/historiqueAchat" >
                      <NavDropdown.Item>Historique D'achat</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#DECONNECTER"
                      onClick={DECONNECTER}
                    >
                      DECONNECTER
                    </Link>   
                    
                  </NavDropdown>
                ) :(
                  <Link  className="nav-link" to ="/connect">
                    Se Connecter
                  </Link>
                )}
                

              </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Link to="/">MULTIPLATEFORME ECOMMERCE </Link>
        </header>

        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/produit/:slug" element={<EcranProduit />} />
              <Route path="/carte" element={<CartScreen />} />
              <Route path="/connect" element={<SigningScreen />} /> 
              <Route path="/shipping" element={<ShippingScreen />} /> 
              <Route path="/Sinscrire" element={<SignupScreen />} /> 
              <Route path="/payement" element={<PaymentScreen />} /> 
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />
              <Route path="/historiqueAchat" element={<OrderHistoryScreen/>}/>
              <Route path="/profile" element={<ProfileScreen />} />




              <Route path="/" element={<Acceuil />} />
            </Routes>
          </Container>
        </main>

        <footer>
          <div className="text-center">TOUT LES DROITS SONT RESERVES</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
