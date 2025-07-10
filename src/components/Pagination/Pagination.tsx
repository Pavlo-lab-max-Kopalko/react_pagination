import { items } from '../../App';
import '../../App.css';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: Props) => {
  console.log(perPage);
  console.log(currentPage);
  const passedItems = perPage * currentPage - perPage; // items those we have passed in previous pages
  // from passedItems to passedItems + perPage we must show items
  console.log(passedItems);

  const firstFiveElements = items.slice(passedItems, passedItems + perPage);

  return (
    <>
      {firstFiveElements.map(item => {
        console.log(item);

        return (
          <li data-cy="item" key={item}>
            {item}
          </li>
        );
      })}
    </>
  );
};
