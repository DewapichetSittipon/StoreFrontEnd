import { FormEvent, useState } from "react";
import { StoreCreateUpdateModel } from "../../../models";
import { Input, Modal, DragDropImage } from "../../../components";
import { Button, Form } from "react-bootstrap";
import { submitForm } from "../../../utils";

interface Props {
  id?: string,
  show: boolean,
  onHide: () => void,
}

export default function ModalStore(props: Props) {
  const [storeForm, setStoreForm] = useState<StoreCreateUpdateModel>({} as StoreCreateUpdateModel);

  const onSubmitForm = (event: FormEvent<HTMLElement>) => {
    event.preventDefault();

    submitForm({});
  };

  const onChagneForm = (value: string | number | File, prop: keyof StoreCreateUpdateModel) => {
    setStoreForm({ ...storeForm, [prop]: value });
  };

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Form className='mx-5' onSubmit={onSubmitForm}>
        <Form.Label>รูป Banner</Form.Label>
        <div style={{ height: "250px" }} className="mb-3">
          <DragDropImage onSelect={(value) => console.log(value)} />
        </div>
        <Input
          label='ชื่อร้านค้า'
          rule={{ required: true }}
          value={storeForm.name}
          onChange={(value) => onChagneForm(value, 'name')}
        />
        <Input
          label='รายละเอียดร้านค้า'
          rule={{ required: true }}
          value={storeForm.description}
          onChange={(value) => onChagneForm(value, 'description')}
        />
        <div className='d-flex align-items-center mt-5 gap-5'>
          <Button variant='outline-dark' className='w-50' onClick={props.onHide}>
            ยกเลิก
          </Button>
          <Button variant='dark' className='w-50' type='submit'>
            ยืนยัน
          </Button>
        </div>
      </Form>
    </Modal>
  );
}