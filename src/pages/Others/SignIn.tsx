import { Button, Form, Row, Col } from 'react-bootstrap';
import { Input, Loading } from '../../components';
import { FormEvent, useState } from 'react';
import { submitForm } from '../../utils';
import { authenticationService } from '../../services';
import { HttpStatusCode } from 'axios';
import { AuthenticationModel } from '../../models';

enum FormType {
  SIGN_IN,
  SIGN_UP,
};

interface FormProps {
  setFormType: (type: FormType) => void;
}

export default function Signin() {
  const [formType, setFromType] = useState<FormType>(FormType.SIGN_IN);

  return (
    <div style={{ height: "100vh" }}>
      {/* <Loading show={showLoading} /> */}
      <div className="sign-in">
        <div className="content py-5">
          <Row className="text-center mt-3">
            <Col xs={12}>
              <h3>STORE</h3>
            </Col>
          </Row>
          {formType === FormType.SIGN_IN
            ? <FormSignIn setFormType={(value) => setFromType(value)} />
            : <FormSignUp setFormType={(value) => setFromType(value)} />}
        </div>
      </div>
    </div>
  );
}

function FormSignIn(props: FormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signInAsync = async () => {
    const { data, status } = await authenticationService.signInAsync(username, password);

    if (status === HttpStatusCode.Ok) {
      console.log(data);
    }
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
    props.setFormType(FormType.SIGN_UP);
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

function FormSignUp(props: FormProps) {
  const [signUpForm, setSignUpForm] = useState<AuthenticationModel>({} as AuthenticationModel);

  const onChangeForm = (value: string | number, prop: keyof AuthenticationModel) => {
    setSignUpForm({ ...signUpForm, [prop]: value });
  };

  const signUpAsync = async () => {
    const { status } = await authenticationService.signUpAsync(signUpForm);

    if (status === HttpStatusCode.Created) {
      onSignIn();
    }
  };

  const onSubmitLogin = (event: FormEvent<HTMLFormElement>) => {
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
    props.setFormType(FormType.SIGN_IN);
  };

  return (
    <>
      <p className='text-center mt-5'>Register</p>
      <Form onSubmit={onSubmitLogin}>
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