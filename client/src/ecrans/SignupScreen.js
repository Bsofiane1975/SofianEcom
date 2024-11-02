import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { magazin } from '../magazin';
import { toast } from 'react-toastify';

export default function SignupScreen() {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [nom, setNom] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(magazin);
  const { userInfo } = state;
  const submithandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const { data } = await Axios.post('/api/users/Sinscrire', {
        nom,
        email,
        password,
      });

      ctxDispatch({ type: 'Connection', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      //  ToastContainer.error(getError(err));
      toast.error('mot de passe ou email incorrect');
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    //const navigate = useNavigate();
    <Container className="small-container">
      <Helmet>
        <title>S'INSCRIRE</title>
      </Helmet>
      <h1 className="my-3">S'INSCRIRE</h1>
      <Form onSubmit={submithandler}>
      <Form.Group className="mb-3" controlId="nom">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="nom"
            required
            onChange={(e) => setNom(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>confirmPassword</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">S'INSCRIRE'</Button>
        </div>
        <div className="mb-3">
          Déja inscrit?{' '}
          <Link to={`/connect?redirect=${redirect}`}>Se Connecter</Link>
        </div>
      </Form>
    </Container>
  );
}
