import { FC } from 'react';
import _ from 'lodash';

type Props = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: FC<Props> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  let pages: number[] = [];
  let lastPageNumber: number;

  lastPageNumber =
    currentPage + 10 < totalPages ? currentPage + 10 : totalPages + 1;

  if (lastPageNumber === 1) {
    pages = [1];
  } else if (lastPageNumber < 10) {
    pages = _.range(1, lastPageNumber);
  } else {
    if (currentPage + 10 < totalPages) {
      pages = _.range(currentPage, lastPageNumber);
    } else {
      pages = _.range(lastPageNumber - 10, lastPageNumber);
    }
  }

  return (
    <div style={styles.paginationContainer}>
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        style={styles.button}
      >
        最初へ
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={styles.button}
      >
        前へ
      </button>
      {pages.map((page: number) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            ...styles.pageButton,
            backgroundColor: currentPage === page ? '#007BFF' : '#fff',
            color: currentPage === page ? '#fff' : '#000',
          }}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={styles.button}
      >
        次へ
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        style={styles.button}
      >
        最後へ
      </button>
    </div>
  );
};

const styles = {
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '20px',
  },
  button: {
    padding: '10px 15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#f9f9f9',
  },
  pageButton: {
    padding: '10px 15px',
    border: '1px solid #007BFF',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
