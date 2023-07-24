import React, { useEffect, useState } from 'react';
import axios from 'axios';

import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeletone';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setCurrentPage } from '../redux/slices/filterSlice';

const Home = () => {
  const [isLoading, setIsloading] = useState(true);
  const [pizzas, setPizzas] = useState([]);
  //   const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sortType);
  const searchValue = useSelector((state) => state.filter.searchValue);
  const currentPage = useSelector((state) => state.filter.currentPage);

  useEffect(() => {
    setIsloading(true);

    const categoryBy = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const searchInput = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://64b80d1321b9aa6eb0797c27.mockapi.io/items?page=${currentPage}&limit=4&${categoryBy}&sortBy=${sortBy}&order=${order}${searchInput}`
      )
      .then((res) => {
        setPizzas(res.data);
        setIsloading(false);
      });

    // window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const onChangeCategory = (index) => {
    dispatch(setCategory(index));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories onChangeCategory={onChangeCategory} />
        <Sort />
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
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
