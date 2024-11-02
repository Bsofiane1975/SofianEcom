/* eslint-disable react/jsx-pascal-case */
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { magazin } from '../magazin';
import CheckoutSteps from '../components/CheckoutSteps';
import MyStepper from '../components/LoadingBox';

export default function ShippingScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(magazin);
  const {
    userInfo,
    cart: { AdresseLivraison },
  } = state;
  
  const [NomComplet, setNomComplet] = useState(AdresseLivraison.NomComplet || '');
  const [adresse, setAdresse] = useState(AdresseLivraison.adresse || '');
  const [ville, setVille] = useState(AdresseLivraison.ville || '');
  const [codePostale, setCodePostale] = useState(AdresseLivraison.codePostale || '');
  const [pays, setPays] = useState(AdresseLivraison.pays || '');
  useEffect(() => {
    if (!userInfo) {
      navigate('/connect?redirect=/shipping');
    }
  }, [userInfo, navigate]);

  const submithandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'save_Adresse_Livraison',
      payload: {
        NomComplet,
        adresse,
        ville,
        codePostale,
        pays,
      },
    });
    localStorage.setItem(
      'AdresseLivraison',
      JSON.stringify({
        NomComplet,
        adresse,
        ville,
        codePostale,
        pays,
      })
    );
    navigate('/payement');
  };
  return (
    <div>
      <Helmet>
        <title>Adresse de livraison</title>
      </Helmet>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <MyStepper >step1 step2</MyStepper>
      <div className="container small-container">
        <h1 className="my-3">Adresse de livraison</h1>
        <Form onSubmit={submithandler}>
          <Form.Group className="mb-3" controlId="NomComplet">
            <Form.Label> Nom complet</Form.Label>
            <Form.Control
              value={NomComplet}
              onChange={(e) => setNomComplet(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="adresse">
            <Form.Label> Adresse</Form.Label>
            <Form.Control
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="ville">
            <Form.Label> ville</Form.Label>
            <Form.Control
              value={ville}
              onChange={(e) => setVille(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="codePostale">
            <Form.Label> Code Postale</Form.Label>
            <Form.Control
              value={codePostale}
              onChange={(e) => setCodePostale(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="pays">
            <Form.Label> Pays</Form.Label>
            <Form.Control
              value={pays}
              onChange={(e) => setPays(e.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
