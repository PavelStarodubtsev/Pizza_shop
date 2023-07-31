import React, { FC } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type PaginationProp = {
  onChangePage: (e: number) => void;
  currentPage: number;
};

export const Pagination: FC<PaginationProp> = ({ onChangePage, currentPage }) => {
  return (
    <div>
      <ReactPaginate
        className={styles.root}
        breakLabel='...'
        nextLabel='>'
        onPageChange={(e) => onChangePage(e.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={currentPage - 1}
        previousLabel='<'
        renderOnZeroPageCount={null}
      />
    </div>
  );
};
