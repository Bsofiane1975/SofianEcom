import { Link } from 'react-router-dom';
//import donnée from './data.js';
import { useEffect, useReducer} from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';

const reducer = (state, action) =>{
  switch(action.type){
    case 'FETCH_REQUEST':
      return {...state, loading: true};
    case 'FETCH_SUCCESS':
      return {...state, produits: action.payload, loading: false};
    case 'FETCH_FAIL':
      return {...state, loading:false, error: action.payload};
    default:
      return state;
  } 
};     
      
function Acceuil() {
 // eslint-disable-next-line no-unused-vars
 const [{loading,produits},dispatch] = useReducer(logger(reducer),{
  produits:[],
  loading: true,
  error:'',
 });
  useEffect(() => {
    const fetchDonnée = async () => {
      dispatch({type:'FETCH_REQUEST'});
      try {
      const resultat = await axios.get("/api/produits");
      dispatch({type:'FETCH_SUCCESS',payload:resultat.data});
      }catch(err){
        dispatch({type:'FETCH_FAIL',payload: err.message})
      }
      
    };
    fetchDonnée();
    console.log()
  }, []);
  return (
    <div>
      <h1>PRODUITS VEDETTE</h1>
      Acceuil
      <div className="produits">
        {produits.map((produit) => (
          <div className="produit" key={produit.slug}>
            <Link to={`/produit/${produit.slug}`}>
              <img src={produit.Image} alt={produit.nom}></img>
            </Link>
            <div className="info-produit">
              <Link to={`/produit/${produit.slug}`}>
                <p> {produit.nom}</p>
              </Link>

              <p>
                <strong>${produit.prix}</strong>
              </p>

              <button>AJOUTER AU PANIER</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Acceuil;
