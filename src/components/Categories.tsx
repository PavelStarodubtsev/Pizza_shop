import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectFilter } from '../redux/slices/filterSlice';

const categories = ['Все', ' Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

type CategoriesPropType = {
  onChangeCategory: (index: number) => void;
};

const Categories: FC<CategoriesPropType> = ({ onChangeCategory }) => {
  // селектор
  const { categoryId } = useSelector(selectFilter);

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
