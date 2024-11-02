import axios from 'axios';
import { useContext, useEffect, useReducer } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import ListGroup from 'react-bootstrap/ListGroup';

import { useNavigate, useParams } from 'react-router-dom'; 
import Cotation from '../components/cotation.js';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { magazin } from '../magazin.js';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, produit: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function Ecranproduit() {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const [{ loading, error, produit }, dispatch] = useReducer(reducer, {
    produit: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchDonnée = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const resultat = await axios.get(`/api/produits/slug/${slug}`);
        console.log(resultat.data);
        dispatch({ type: 'FETCH_SUCCESS', payload: resultat.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchDonnée();
  }, [slug]);
  const { state, dispatch: ctxDispatch } = useContext(magazin);
  const { cart } = state;
  const addtocarthandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === produit._id);
    const quantité = existItem ? existItem.quantité + 1 : 1;
    const { data } = await axios.get(`/api/produits/${produit._id}`);
    if (data.Quantité < quantité) {
      alert('Désolé le produit est épuisé');

      return;
    }

    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...produit, quantité },
    });

    navigate('/carte');
  };
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={3}>
          {
            <img
              className="img-large"
              src={produit.Image}
              alt={produit.nom}
            ></img>
          }
        </Col>

        <Col md={5}>
          <ListGroup variant="flush">
            <Helmet>
              <title>{produit.nom}</title>
            </Helmet>

            <ListGroup.Item>
            <Cotation cotation={produit.cotation} NombreVues={produit.NombreVues} /> 
            </ListGroup.Item>
            <ListGroup.Item>Prix :{produit.prix}$</ListGroup.Item>
            <ListGroup.Item>Description:{produit.Description}</ListGroup.Item>
            <ListGroup.Item>
               
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>PRIX</Col>
                    <Col>{produit.prix}$</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
              <Row>
                <Col>
                  status:
                  {produit.Quantité > 0 ? (
                    <Badge bg="success">Disponible</Badge>
                  ) : (
                    <Badge bg="danger">EPUISE</Badge>
                  )}
                </Col>
              </Row>
            </Card.Body>
            {produit.Quantité > 0 && (
              <ListGroup.Item>
                <div className="d-grid">
                  <Button onClick={addtocarthandler} variant="primary">
                    Ajouter au panier
                  </Button>
                </div>
              </ListGroup.Item>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Ecranproduit;
