import { Modal as ModalBT } from 'react-bootstrap';

interface Props {
  show: boolean,
  onHide: () => void,
  children: JSX.Element | JSX.Element[];
  title?: string;
}

export function Modal(props: Props) {
  return (
    <ModalBT
      show={props.show}
      onHide={props.onHide}
      backdrop="static"
      centered
      size='lg'
    >
      <ModalBT.Body>
        <div className="d-flex align-items-center gap-2">
          {props.title ? <h4 className="my-auto">{props.title}</h4> : null}
        </div>
        {props.children}
      </ModalBT.Body>
    </ModalBT>
  );
}