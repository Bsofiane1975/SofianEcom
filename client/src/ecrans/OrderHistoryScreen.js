// import React, { useContext, useEffect, useReducer } from 'react';
// import { Helmet } from 'react-helmet-async';
// import MessageBox from '../components/MessageBox';
// import LoadingBox from '../components/LoadingBox';
// import { magazin } from '../magazin';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Button from 'react-bootstrap/Button';
// import { getError } from '../utils';

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'FETCH_REQUEST':
//       return { ...state, loading: true };
//     case 'FETCH_SUCCESS':
//       return { ...state, orders: action.payload, loading: false };
//     case 'FETCH_FAIL':
//       return { ...state, loading: false, errors: action.payload };
//     default:
//       return state;
//   }
// };
// export default function OrderHistoryScreen() {
//   const { state } = useContext(magazin);
//   const { userInfo } = state;
//   const navigate = useNavigate();

//   const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
//     loading: true,
//     error: ' ',
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       dispatch({ type: 'FETCH-REQUEST' });
//       try {
//         const { data } = await axios.get(`/api/orders/mine`, {
//           headers: { Authorization: `Bearer ${userInfo.token}` },
//         });
//         dispatch({ type: 'FETCH_SUCCESS', payload: data });
//       } catch (error) {
//         dispatch({
//           type: 'FETCH_FAIL',
//           payload: getError(error),
//         });
//       }
//     };
//     fetchData();
//   }, [userInfo]);
//   return (
//     <div>
//       <Helmet>
//         <title>Historique de commandes</title>
//       </Helmet>

//       <h1>HIstorique de commandes</h1>
//       {loading ? (
//         <MessageBox variant="danger">{Error}</MessageBox>
//       ) : (
//         <table className="table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Date</th>
//               <th>Total</th>
//               <th>PAYEMENT</th>
//               <th>DELIVRÉE</th>
//               <th>ACTIONS</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id}>
//                 <td>{order._id}</td>
//                 <td>{order.createdAt.substring(0, 10)}</td>
//                 <td>{order.totalPrice}</td>
//                 <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
//                 <td>
//                   {order.isDelivered
//                     ? order.deliveredAt.substring(0, 10)
//                     : 'No'}
//                 </td>
//                 <td>
//                   <Button
//                     type="button"
//                     variant="light"
//                     onClick={() => {
//                       navigate(`/order/${order._id}`);
//                     }}
//                   >
//                     Details
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import  Button  from 'react-bootstrap/Button';
import { magazin } from '../magazin';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, orders: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function OrderHistoryScreen() {
  const { state } = useContext(magazin);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(
          `/api/orders/mine`,

          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [userInfo]);
  return (
    <div>
      <Helmet>
        <title>Order History</title>
      </Helmet>

      <h1>Order History</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}