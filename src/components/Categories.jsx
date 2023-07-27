import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilter } from '../redux/slices/filterSlice';

const Categories = ({ onChangeCategory }) => {
  // селектор
  const { categoryId } = useSelector(selectFilter);

  const categories = ['Все', ' Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className='categories'>
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index)}
            className={categoryId === index ? 'active' : ''}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
