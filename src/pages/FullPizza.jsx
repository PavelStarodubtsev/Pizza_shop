import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const res = await axios.get(`https://64b80d1321b9aa6eb0797c27.mockapi.io/items/${id}`);
        setPizza(res.data);
      } catch (error) {
        alert('Ошибка при получении пиццы!');
        console.log('ERROR', error);
        navigate('/');
      }
    }
    fetchPizza();
  }, [id]);

  if (!pizza) {
    return 'Загрузка . . . ';
  }

  return (
    <div className='container'>
      <img src={pizza?.imageUrl} />
      <h2>{pizza?.title}</h2>
      <h4>{pizza?.price} rub.</h4>
    </div>
  );
};

export default FullPizza;
