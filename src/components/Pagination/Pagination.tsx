import { items } from '../../App';
import '../../App.css';

interface Props {
  perPage: number;
  currentPage: number;
}

export const Pagination = ({ perPage, currentPage }: Props) => {
  const passedItems = perPage * currentPage - perPage; // items those we have passed in previous pages
  // from passedItems to passedItems + perPage we must show items

  const firstFiveElements = items.slice(passedItems, passedItems + perPage);

  return (
    <>
      {firstFiveElements.map(item => {
        return (
          <li data-cy="item" key={item}>
            {item}
          </li>
        );
      })}
    </>
  );
};
