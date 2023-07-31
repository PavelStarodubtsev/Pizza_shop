import React, { FC, memo } from 'react';
// import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate';

const categories = ['Все', ' Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

type CategoriesPropType = {
  categoryId: number;
  onChangeCategory: (index: number) => void;
};

export const Categories: FC<CategoriesPropType> = memo(({ categoryId, onChangeCategory }) => {
  // 1.аргумент - название компонента
  // 2.аргумент - пропсы ,которые принимает компонент
  // Этот Хук следит только за изменением пропсов
  //   useWhyDidYouUpdate('Categories', { categoryId, onChangeCategory });

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
});
