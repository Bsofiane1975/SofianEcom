import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { magazin } from '../magazin';
import { toast } from 'react-toastify';

export default function SigningScreen() {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(magazin);
  const { userInfo } = state;
  const submithandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('/api/users/connect', {
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
        <title>SE CONNECTER</title>
      </Helmet>
      <h1 className="my-3">SE CONNECTER</h1>
      <Form onSubmit={submithandler}>
        <Form.Group className="mb-3" controlId="email" >
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            autoComplete='true'
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
        <div className="mb-3">
          <Button type="submit">SE CONNECTER</Button>
        </div>
        <div className="mb-3">
          Nouveau utilisateur{' '}
          <Link to={`/Sinscrire?redirect=${redirect}`}>Cree votre compte</Link>
        </div>
      </Form>
    </Container>
  );
}
