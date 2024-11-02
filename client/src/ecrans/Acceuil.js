//import donnée from './data.js';
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Produit from '../components/Produit';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
//import donnée from '../../../server/data';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, produits: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Acceuil() {
  const [{ loading, error, produits }, dispatch] = useReducer(logger(reducer), {
    produits: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchDonnée = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const resultat = await axios.get('/api/produits');
        console.log(resultat.data);
        dispatch({ type: 'FETCH_SUCCESS', payload: resultat.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchDonnée();
  }, []);
  return (
    <div>
      <Helmet>
        <title>amazona</title>
      </Helmet>
      <h1>PRODUITS VEDETTE</h1>
      Acceuil
      <div className="produits">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {produits.map((produit) => (
              <Col key={produit.slug} sm={6} md={4} lg={3} className="mb-3">
                <Produit produit={produit}></Produit>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default Acceuil;
