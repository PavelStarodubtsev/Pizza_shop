import React, { useEffect, useState } from 'react';
import Categories from '../components/Search/Categories';
import Sort from '../components/Search/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeletone';

const Home = () => {
  const [pizzas, setPizzas] = useState();

  useEffect(() => {
    fetch('https://64b80d1321b9aa6eb0797c27.mockapi.io/items')
      .then((res) => res.json())
      .then((res) => setPizzas(res));
  }, []);

  return (
    <>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {!pizzas
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas?.map((obj) => <PizzaBlock key={obj.id} pizza={obj} />)}
      </div>
    </>
  );
};

export default Home;
