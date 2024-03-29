import React, { FC, memo, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SortPropertyEnum, SortType } from '../redux/filter/types';
import { setSortType } from '../redux/filter/slice';

// типизируем event в handleClickOutside
interface MouseEventWithPath extends MouseEvent {
  composedPath: () => EventTarget[];
}

type PopupClick = MouseEventWithPath & {
  path: Node[];
};

type ListSortType = {
  name: string;
  sortProperty: SortPropertyEnum;
};

type SortPropType = {
  sort: SortType;
};

export const listSort: ListSortType[] = [
  { name: 'популярности (DESC)', sortProperty: SortPropertyEnum.RATING_DESC },
  { name: 'популярности (ASC)', sortProperty: SortPropertyEnum.RATING_ASC },
  { name: 'цене (DESC)', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'цене (ASC)', sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: 'алфавиту (DESC)', sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: 'алфавиту (ASC)', sortProperty: SortPropertyEnum.TITLE_ASC }
];

export const Sort: FC<SortPropType> = memo(({ sort }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // селектор
  //   const sortType = useSelector(selectFilterSort);

  const onClickListItem = (obj: SortType) => {
    dispatch(setSortType(obj));
    setOpen(false);
  };

  // навешиваем слушатель события с ф-цией ,которая проверяет что
  // событие произошло за пределами popUp окна для Sort,потом его удаляем
  useEffect(() => {
    // !! позже нужно поменять тип event: any
    const handleClickOutside = (event: MouseEvent) => {
      const popupClickEvent = event as PopupClick;
      if (sortRef.current && !popupClickEvent.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className='sort'>
      <div className='sort__label'>
        <svg
          width='10'
          height='6'
          viewBox='0 0 10 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
            fill='#2C2C2C'
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sort?.name}</span>
      </div>
      {open && (
        <div className='sort__popup'>
          <ul>
            {listSort.map((obj, index) => (
              <li
                key={index}
                onClick={() => onClickListItem(obj)}
                className={sort.sortProperty === obj.sortProperty ? 'active' : ''}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
