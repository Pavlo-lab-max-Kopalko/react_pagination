import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';

import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perItems, setPerItems] = useState<string>('3');
  const [numberPage, setNumberPage] = useState<string>('#1');

  const getNumber = (number: string) => {
    setPerItems(number);
  };

  const resetNumberPage = () => {
    setNumberPage('#1');
  };

  const getNumberPage = (addres: string) => {
    const arrAddres = addres.split('/');

    setNumberPage(arrAddres[arrAddres.length - 1]);
  };

  const pageQuantity = Math.ceil(items.length / +perItems);

  const passedItems =
    Number(perItems) * Number(numberPage.slice(1)) - Number(perItems);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {numberPage} (items {passedItems + 1} -{' '}
        {Number(perItems) + passedItems} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onClick={event => getNumber(event.currentTarget.value)}
            onChange={() => resetNumberPage()}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      {/* Move this markup to Pagination */}

      <ul className="pagination">
        <li className="page-item disabled">
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
          >
            «
          </a>
        </li>

        {Array.from({ length: pageQuantity }).map((_, i) => {
          return (
            <li
              key={i}
              className={`page-item ${numberPage === `#${i + 1}` ? 'active' : ''}`}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${i + 1}`}
                onClick={event => getNumberPage(event.currentTarget.href)}
              >
                {i + 1}
              </a>
            </li>
          );
        })}

        <li className="page-item">
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        <Pagination
          total={42} // total number of items to paginate
          perPage={Number(perItems)} // number of items per page
          currentPage={Number(
            numberPage.slice(1),
          )} /* optional with 1 by default */
          onPageChange={(page: { addEventListener: () => void }) => {
            page.addEventListener();
          }}
        />
      </ul>
    </div>
  );
};

export default App;
