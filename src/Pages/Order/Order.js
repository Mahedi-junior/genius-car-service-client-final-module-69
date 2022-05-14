import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import axiosPrivate from '../../api/axiosPrivate';
import auth from '../../firebase.init';

const Order = () => {
    const [user] = useAuthState(auth);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const getOrders = async () => {
            const email = user?.email;
            console.log(email);

            const url = `https://young-falls-41187.herokuapp.com/order?email=${email}`;
            try {
                const { data } = await axiosPrivate.get(url);
                setOrders(data);
            }


            catch (error) {
                console.log(error.messess);
                if (error.response.status === 401 || error.response.status === 403) {
                    signOut(auth);
                    navigate('/login')
                }
            }
        }
        getOrders();

    }, [user])


    return (
        <div className='w-50 mx-auto mt-3'>
            <h2 className='text-success'>Your total Orders:  {orders.length}</h2>
            {
                orders.map(order => <div key={order._id}>
                    <p>{order.email} :  {order.service}</p>
                </div>)
            }
        </div>
    );
};

export default Order;