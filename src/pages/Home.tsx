import React, { FC, memo, useCallback, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';

import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeletone';
import Categories from '../components/Categories';
import Sort, { listSort } from '../components/Sort';
import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';
import { selectFilter, setCategory, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import {
  SearchPizzaParams,
  fetchPizzas,
  selectPizzaItems,
  selectPizzaStatus
} from '../redux/slices/pizzaSlice';
import { useAppDispatch } from '../redux/store';

const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  // selectors
  const { categoryId, sort, searchValue, currentPage } = useSelector(selectFilter);
  const pizzas = useSelector(selectPizzaItems);
  const status = useSelector(selectPizzaStatus);

  const onChangeCategory = useCallback((index: number) => {
    dispatch(setCategory(index));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const categoryBy = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        categoryBy,
        sortBy,
        order,
        search,
        currentPage: String(currentPage)
      })
    );
  };

  // 1. ф-ция вшивает парматеры сортировки в url ,если isMounted = true
  // Если изменили параметры и был первый рендер
  useEffect(() => {
    getPizzas();
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage
      });

      navigate(`?${queryString}`);
    }
    // после первого рендера меняет isMounted = true
    isMounted.current = false;
  }, [categoryId, sort, searchValue, currentPage]);

  // 2.Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
  useEffect(() => {
    if (location.search) {
      const params = qs.parse(location.search.slice(1)) as unknown as SearchPizzaParams;
      const sortObj = listSort.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(
        setFilters({
          searchValue: params?.search,
          categoryId: Number(params.categoryBy),
          currentPage: Number(params.currentPage),
          sort: sortObj || listSort[0]
        })
      );
      isSearch.current = true;
    }
  }, [location]);

  // 3. Если был первый рендер, то запрашиваем пиццы
  //   useEffect(() => {
  //     getPizzas();
  //   }, []);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories categoryId={categoryId} onChangeCategory={onChangeCategory} />
        <Sort sort={sort} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className='content__items'>
          {status === 'loading'
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : pizzas?.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default memo(Home);
