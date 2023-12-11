import { FormEvent, useContext, useEffect, useState } from "react";
import { StoreCreateUpdateModel } from "../../../models";
import { Input, Modal, DragDropImage, Loading } from "../../../components";
import { Button, Form } from "react-bootstrap";
import { submitForm } from "../../../utils";
import { storeService } from "../../../services";
import { HttpStatusCode } from "axios";
import { PageBaseContext } from "../../PageBase";
import toast from "../../../utils/toast";
import GoogleMap from "../../../components/GoogleMap";

interface Props {
  id?: string,
  show: boolean,
  onHide: (onCreateUpdate: boolean) => void,
}

export default function ModalStore(props: Props) {
  const [storeForm, setStoreForm] = useState<StoreCreateUpdateModel>({
    latitude: '13.7247376',
    longitude: '100.3212781'
  } as StoreCreateUpdateModel);
  const [bannerImage, setBannerImage] = useState<string>();
  const { showLoading, setShowLoading } = useContext(PageBaseContext);

  useEffect(() => {
    if (props.show && props.id) {
      getDetailAsync(props.id);
    }
  }, [props.show, props.id]);

  const getDetailAsync = async (id: string) => {
    setShowLoading(true);

    const { data, status } = await storeService.getStoreDetailAsync(id);

    if (status === HttpStatusCode.Ok) {
      setBannerImage(data.banner);
      setStoreForm({
        ...storeForm,
        name: data.name,
        description: data.description,
        latitude: data.latitude,
        longitude: data.longitude,
      });

      setShowLoading(false);
    }
  };

  const onSubmitForm = async (event: FormEvent<HTMLElement>) => {
    event.preventDefault();

    submitForm({});

    if (!props.id) {
      if (!storeForm.image) {
        return toast.warn('กรุณาอัพโหลด banner');
      }

      await onCreateStoreAsync();
    } else {
      await onUpdateStoreAsync(props.id);
    }
  };

  const onChagneForm = (value: string | number | File, prop: keyof StoreCreateUpdateModel) => {
    setStoreForm({ ...storeForm, [prop]: value });
  };

  const onCreateStoreAsync = async () => {
    setShowLoading(true);

    const { status } = await storeService.createStoreAsync(storeForm);

    if (status === HttpStatusCode.Created) {
      clearForm();

      props.onHide(true);

      toast.success('เพิ่มข้อมูลสำเร็จ');
    }

    setShowLoading(false);
  };

  const onUpdateStoreAsync = async (id: string) => {
    setShowLoading(true);

    const { status } = await storeService.updateStoreAsync(storeForm, id);

    if (status === HttpStatusCode.Accepted) {
      clearForm();

      props.onHide(true);

      toast.success('แก้ไขข้อมูลสำเร็จ');
    }

    setShowLoading(false);
  };

  const clearForm = () => {
    setStoreForm({
      latitude: '13.7247376',
      longitude: '100.3212781',
    } as StoreCreateUpdateModel);
    setBannerImage(undefined);
  };

  const onCancel = () => {
    props.onHide(false);

    clearForm();
  };

  return (
    <Modal show={props.show} onHide={() => { }}>
      <Loading show={showLoading} />
      <Form className='mx-5' onSubmit={onSubmitForm}>
        <Form.Label>รูป Banner</Form.Label>
        <div style={{ height: "250px" }} className="mb-3">
          <DragDropImage
            image={bannerImage}
            onSelect={(value) => onChagneForm(value, 'image')} />
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
        <Input
          label='latitude'
          rule={{ required: true }}
          value={storeForm.latitude}
          onChange={(value) => onChagneForm(value, 'latitude')}
        />
        <Input
          label='logitude'
          rule={{ required: true }}
          value={storeForm.longitude}
          onChange={(value) => onChagneForm(value, 'longitude')}
        />
        <div className="mt-5">
          <GoogleMap
            lat={parseFloat(storeForm.latitude)}
            lng={parseFloat(storeForm.longitude)}
            name={storeForm.name} />
        </div>
        <div className='d-flex align-items-center mt-5 gap-5'>
          <Button variant='outline-dark' className='w-50' onClick={onCancel}>
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