import React from 'react';

const Categories = ({ value, onChangeCategory }) => {
  // const [activeIndex, setactiveIndex] = useState(0);

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
            className={value === index ? 'active' : ''}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
