import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Cotation from './cotation';
import { magazin } from '../magazin';
import { useContext } from 'react';
import axios from 'axios';
import Badge from 'react-bootstrap/Badge';

function Produit(props) {
  const { produit } = props;
  const { state, dispatch: ctxDispatch } = useContext(magazin);
  const {
    cart: { cartItems },
  } = state;

  const Addacarthandler = async (item) => {
    const existItem = cartItems.find((x) => x.id === produit.id);
    const quantité = existItem ? existItem.quantité + 1 : 1;
    const {data} = await axios.get(`/api/produits/${item._id}`);
    if (data.Quantité < quantité) {
      window.alert('désoler produit épuiser');
      return;
    }

    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantité },
    });
  };
  return (
    <Card key={produit.slug}>
      <Link to={`/produit/${produit.slug}`}>
        <img
          src={produit.Image}
          className="card-img-top"
          alt={produit.nom}
        ></img>
      </Link>
      <Card.Body>
        <Link to={`/produit/${produit.slug}`}>
          <Card.Title> {produit.nom}</Card.Title>
        </Link>
        <Cotation cotation={produit.cotation} NombreVues={produit.NombreVues} />

        <Card.Text>{produit.prix} $</Card.Text>
        {produit.Quantité === 0 ? (
          <Button variant="light" disabled>
            <Badge bg="danger">produit epuisé en stock</Badge>
          </Button>
        ) : (
          <Button onClick={() => Addacarthandler(produit)}>
            AJOUTER AU PANIER
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default Produit;
