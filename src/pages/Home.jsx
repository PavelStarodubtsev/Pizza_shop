import React, { useEffect, useState } from 'react';
import Categories from '../components/Search/Categories';
import Sort from '../components/Search/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeletone';

const Home = () => {
  const [isLoading, setIsloading] = useState(true);
  const [pizzas, setPizzas] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating'
  });

  useEffect(() => {
    setIsloading(true);

    const categoryBy = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';

    fetch(
      `https://64b80d1321b9aa6eb0797c27.mockapi.io/items?${categoryBy}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => res.json())
      .then((res) => {
        setPizzas(res);
        setIsloading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className='container container--cart'>
      <div className='content__top'>
        <Categories value={categoryId} onChangeCategory={(index) => setCategoryId(index)} />
        <Sort value={sortType} onChangeSort={(index) => setSortType(index)} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas?.map((obj) => <PizzaBlock key={obj.id} pizza={obj} />)}
      </div>
    </div>
  );
};

export default Home;
