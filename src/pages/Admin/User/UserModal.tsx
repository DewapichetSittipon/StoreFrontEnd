import { Button, Form } from "react-bootstrap";
import { Input, Loading, Modal } from "../../../components";
import { FormEvent, useContext, useEffect, useState } from "react";
import { UserCreateUpdateModel } from "../../../models";
import { submitForm } from "../../../utils";
import { PageBaseContext } from "../../PageBase";
import { backofficeUserService } from "../../../services";
import { HttpStatusCode } from "axios";
import toast from "../../../utils/toast";

interface Props {
  id?: string,
  show: boolean,
  onHide: (onCreateUpdate: boolean) => void,
}

export default function UserModal(props: Props) {
  const [userForm, setUserForm] = useState<UserCreateUpdateModel>({} as UserCreateUpdateModel);
  const { showLoading, setShowLoading } = useContext(PageBaseContext);

  useEffect(() => {
    if (props.show && props.id) {
      getDetailAsync(props.id);
    }
  }, [props.show, props.id]);

  const getDetailAsync = async (id: string) => {
    setShowLoading(true);

    const { data, status } = await backofficeUserService.getUserDetailAsync(id);

    if (status === HttpStatusCode.Ok) {
      setUserForm({
        ...userForm,
        firstName: data.firstName,
        lastName: data.lastName,
        userName: data.userName,
        role: data.role,
      });

      setShowLoading(false);
    }
  };

  const onChagneForm = (value: string | number | File, prop: keyof UserCreateUpdateModel) => {
    setUserForm({ ...userForm, [prop]: value });
  };

  const onSubmitForm = async (event: FormEvent<HTMLElement>) => {
    event.preventDefault();

    submitForm({});

    if (!props.id) {
      await onCreateUserAsync();
    } else {
      await onUpdateUserAsync(props.id);
    }
  };

  const onCreateUserAsync = async () => {
    setShowLoading(true);

    const { status } = await backofficeUserService.createUserListAsync(userForm);

    if (status === HttpStatusCode.Created) {
      clearForm();

      props.onHide(true);

      toast.success('เพิ่มข้อมูลสำเร็จ');
    }

    setShowLoading(false);
  };

  const onUpdateUserAsync = async (id: string) => {
    setShowLoading(true);

    const { status } = await backofficeUserService.updateUserListAsync(userForm, id);

    if (status === HttpStatusCode.Accepted) {
      clearForm();

      props.onHide(true);

      toast.success('แก้ไขข้อมูลสำเร็จ');
    }

    setShowLoading(false);
  };

  const clearForm = () => {
    setUserForm({} as UserCreateUpdateModel);
  };

  const onCancel = () => {
    props.onHide(false);

    clearForm();
  };

  return (
    <Modal show={props.show} onHide={() => { }}>
      <Loading show={showLoading} />
      <Form className='mx-5' onSubmit={onSubmitForm}>
        <Input
          label='ชื่อ'
          rule={{ required: true }}
          value={userForm.firstName}
          onChange={(value) => onChagneForm(value, 'firstName')}
        />
        <Input
          label='นามสกุล'
          rule={{ required: true }}
          value={userForm.lastName}
          onChange={(value) => onChagneForm(value, 'lastName')}
        />
        <Input
          label='username'
          rule={{ required: true }}
          value={userForm.userName}
          onChange={(value) => onChagneForm(value, 'userName')}
        />
        {!props.id ? <Input
          label='password'
          rule={{ required: true }}
          value={userForm.password}
          type="password"
          onChange={(value) => onChagneForm(value, 'password')}
        /> : <></>}
        <Input
          label='role (admin, user)'
          rule={{ required: true }}
          value={userForm.role}
          onChange={(value) => onChagneForm(value, 'role')}
        />
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