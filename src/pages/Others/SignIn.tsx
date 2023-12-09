import { Button, Form, Row, Col } from 'react-bootstrap';
import { Input } from '../../components';
import { FormEvent, useState } from 'react';
import { submitForm } from '../../utils';

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

  const onSubmitLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    submitForm({});
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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    submitForm({});
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
              value={firstName}
              onChange={(value) => setFirstName(value)}
              rule={{ required: true }} />
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col xs={8}>
            <Input
              label="Last name"
              name='lastName'
              value={lastName}
              onChange={(value) => setLastName(value)}
              rule={{ required: true }} />
          </Col>
        </Row>
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