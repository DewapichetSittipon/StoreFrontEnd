import { Card as CardBT } from 'react-bootstrap';

interface Props {
  title?: string;
  children?: JSX.Element | JSX.Element[] | string;
  className?: string;
}

export function Card(props: Props) {
  return (
    <CardBT className={`${props.className}`}>
      <CardBT.Body>
        {props.title ? <CardBT.Title className="fs-4">{props.title}</CardBT.Title> : null}
        {props.children}
      </CardBT.Body>
    </CardBT>
  );
}