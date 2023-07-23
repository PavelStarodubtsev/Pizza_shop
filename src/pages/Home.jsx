import React, { useEffect, useState } from 'react';

import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeletone';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';

const Home = ({ searchValue }) => {
  const [isLoading, setIsloading] = useState(true);
  const [pizzas, setPizzas] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating'
  });

  useEffect(() => {
    setIsloading(true);

    const categoryBy = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const searchInput = searchValue ? `&search=${searchValue}` : '';

    fetch(
      `https://64b80d1321b9aa6eb0797c27.mockapi.io/items?page=${currentPage}&limit=4&${categoryBy}&sortBy=${sortBy}&order=${order}${searchInput}`
    )
      .then((res) => res.json())
      .then((res) => {
        setPizzas(res);
        setIsloading(false);
      });
    // window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onChangeCategory={(index) => setCategoryId(index)} />
        <Sort value={sortType} onChangeSort={(index) => setSortType(index)} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {/* {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas
              ?.filter((obj) => {
                if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
                  return true;
                }
                return false;
              })
              .map((obj) => <PizzaBlock key={obj.id} pizza={obj} />)} */}

        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas?.map((obj) => <PizzaBlock key={obj.id} pizza={obj} />)}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
