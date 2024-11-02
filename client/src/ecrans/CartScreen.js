import { useContext } from 'react';
import { magazin } from '../magazin';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import MessageBox from '../components/MessageBox';
import { Link, useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function CartScreen() {
    const navigate = useNavigate();  
  const { state, dispatch: ctxDispatch } = useContext(magazin);
  const {
    cart: { cartItems },
  } = state;

  const Majcart = async(item, quantité ) => {
    const {data} = await axios.get(`/api/produits/${item._id}`);
    if (data.Quantité < quantité){
        window.alert('désoler produit épuiser');
        return;
    }

    ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload: {...item, quantité},
    })

  }
  const SuprItem = (item) => {
    ctxDispatch({ type: 'CART_SUPP_ITEM',payload:item});
  }
  const Sortir= ()=>{
    navigate('/connect?redirect=/shipping');
  }
  return (
    <div>
      <Helmet>
        <title>PANIER D'ACHAT</title>
      </Helmet>
      <h1>Panier d'achat</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              panier est vide.<Link to="/">ACHETER</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.Image}
                        alt={item.nom}
                        className="img-fluid rounded img-thumbnail"
                      ></img>
                      <Link to={`/produit/${item.slug}`}>{item.nom}</Link>
                    </Col>
                    <Col md={4}>
                      <Button variant="light"
                        onClick={() => Majcart(item, item.quantité - 1)}
                       disabled={item.quantité === 1}>
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{item.quantité}</span>
                      <Button
                        variant="light"
                        onClick={() => Majcart(item, item.quantité + 1)}
                        disabled={item.quantité === item.Quantité}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>{' '}
                    </Col>
                    <Col md={2}>${item.prix}</Col>
                    <Col md={2}>
                      <Button 
                        variant="light"
                        onClick={() => SuprItem(item)} >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Total ({cartItems.reduce((a, c) => a + c.quantité, 0)})
                    {''}
                    items :$
                    {cartItems.reduce((a, c) => a + c.prix * c.quantité, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={Sortir}
                      variant="primary"
                      disabled={cartItems.length === 0}
                    >
                      Sortir du panier
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
