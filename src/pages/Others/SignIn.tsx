import { Button, Form, Row, Col } from 'react-bootstrap';
import { Input, Loading } from '../../components';
import { Dispatch, FormEvent, SetStateAction, createContext, useContext, useMemo, useState } from 'react';
import { setAccessToken, submitForm } from '../../utils';
import { authenticationService } from '../../services';
import { HttpStatusCode } from 'axios';
import { AuthenticationModel } from '../../models';
import toast from '../../utils/toast';

enum FormType {
  SIGN_IN,
  SIGN_UP,
};

type SigninContext = {
  showLoading: boolean;
  formType: FormType;
  setShowLoading: Dispatch<SetStateAction<boolean>>;
  setFormType: Dispatch<SetStateAction<FormType>>;
};

const Context = createContext({} as SigninContext);

export default function Signin() {
  const [formType, setFormType] = useState<FormType>(FormType.SIGN_IN);
  const [showLoading, setShowLoading] = useState(false);

  const contextValue = useMemo(() => {
    return {
      showLoading,
      formType,
      setShowLoading,
      setFormType,
    }
  }, [showLoading, formType, setShowLoading, setFormType]);

  return (
    <Context.Provider value={contextValue}>
      <div style={{ height: "100vh" }}>
        <Loading show={showLoading} />
        <div className="sign-in">
          <div className="content py-5">
            <Row className="text-center mt-3">
              <Col xs={12}>
                <h3>STORE</h3>
              </Col>
            </Row>
            {formType === FormType.SIGN_IN
              ? <FormSignIn />
              : <FormSignUp />}
          </div>
        </div>
      </div>
    </Context.Provider>
  );
}

function FormSignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setFormType, setShowLoading } = useContext(Context);

  const signInAsync = async () => {
    setShowLoading(true);

    const { data, status } = await authenticationService.signInAsync(username, password);

    if (status === HttpStatusCode.Ok) {
      setAccessToken(data.access_token, data.role);

      toast.success('เข้าสู่ระบบสำเร็จ');
    }

    setShowLoading(false);
  };

  const onSubmitLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    submitForm({});

    if (!username || !password) {
      return;
    }

    await signInAsync();
  };

  const onSignUp = () => {
    setFormType(FormType.SIGN_UP);
  };

  return (
    <>
      <p className='text-center mt-5'>Sign In</p>
      <Form onSubmit={onSubmitLogin}>
        <Row className="justify-content-center mt-3">
          <Col xs={8}>
            <Input
              label="Username"
              name='username'
              value={username}
              onChange={(value) => setUsername(value)}
              rule={{ required: true }} />
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col xs={8}>
            <Input
              label="Password"
              name='password'
              value={password}
              rule={{ required: true }}
              onChange={(value) => setPassword(value)}
              type="password" />
          </Col>
        </Row>
        <Row className='justify-content-center mt-3'>
          <Col xs={8}>
            <Button type='submit' variant='dark' className='w-100'>Sign In</Button>
          </Col>
        </Row>
        <Row className='justify-content-center mt-3'>
          <Col xs={8}>
            <Button variant='outline-dark' className='w-100' onClick={onSignUp}>Sign Up</Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

function FormSignUp() {
  const [signUpForm, setSignUpForm] = useState<AuthenticationModel>({} as AuthenticationModel);
  const { setFormType, setShowLoading } = useContext(Context);

  const onChangeForm = (value: string | number, prop: keyof AuthenticationModel) => {
    setSignUpForm({ ...signUpForm, [prop]: value });
  };

  const signUpAsync = async () => {
    setShowLoading(true);

    const { status } = await authenticationService.signUpAsync(signUpForm);

    if (status === HttpStatusCode.Created) {
      onSignIn();

      toast.success('ลงทะเบียนสำเร็จ');
    }

    setShowLoading(false);
  };

  const onSubmitSignUp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    submitForm({});

    if (!signUpForm.firstName ||
      !signUpForm.lastName ||
      !signUpForm.userName ||
      !signUpForm.lastName) {
      return;
    }

    signUpAsync();
  };

  const onSignIn = () => {
    setFormType(FormType.SIGN_IN);
  };

  return (
    <>
      <p className='text-center mt-5'>Register</p>
      <Form onSubmit={onSubmitSignUp}>
        <Row className="justify-content-center mt-3">
          <Col xs={8}>
            <Input
              label="First name"
              name='firstName'
              value={signUpForm.firstName}
              onChange={(value) => onChangeForm(value, 'firstName')}
              rule={{ required: true }} />
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col xs={8}>
            <Input
              label="Last name"
              name='lastName'
              value={signUpForm.lastName}
              onChange={(value) => onChangeForm(value, 'lastName')}
              rule={{ required: true }} />
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col xs={8}>
            <Input
              label="Username"
              name='username'
              value={signUpForm.userName}
              onChange={(value) => onChangeForm(value, 'userName')}
              rule={{ required: true }} />
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col xs={8}>
            <Input
              label="Password"
              name='password'
              value={signUpForm.password}
              rule={{ required: true }}
              onChange={(value) => onChangeForm(value, 'password')}
              type="password" />
          </Col>
        </Row>
        <Row className='justify-content-center mt-3'>
          <Col xs={8}>
            <Button type='submit' variant='dark' className='w-100'>Sign Up</Button>
          </Col>
        </Row>
        <Row className='justify-content-center mt-3'>
          <Col xs={8}>
            <Button variant='outline-dark' className='w-100' onClick={onSignIn}>Sign In</Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}