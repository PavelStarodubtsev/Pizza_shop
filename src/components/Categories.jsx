import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../redux/slices/filterSlice';

const Categories = ({ onChangeCategory }) => {
  // const [activeIndex, setactiveIndex] = useState(0);

  const categoryId = useSelector((state) => state.filter.categoryId);

  const categories = ['Все', ' Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  //   const onClickCategory = (index) => {
  //     setactiveIndex(index);
  //   };

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
