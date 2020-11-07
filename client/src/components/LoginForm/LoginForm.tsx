import React, { useState } from 'react';

import { Form, Input, Button } from 'antd';
import { useHistory } from "react-router-dom";

type LoginFormProps = {
  register?: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setTopScore: React.Dispatch<React.SetStateAction<number>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

export default function LoginForm (props: LoginFormProps) {
  const { register = false, setIsLoggedIn, setTopScore, setUsername } = props;

  const [ errorMessage, setErrorMessage ] = useState('');

  const history = useHistory();

  const [ form ] = Form.useForm();

  async function onFinish (values: any) {
    const response = await fetch(
      register ? 'http://localhost:4000/users' : 'http://localhost:4000/login',
      {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      setErrorMessage(''); // clear out existing error message

      if (register) {
        history.push('/login');
      } else {
        setUsername(data.username || values.username);
        setTopScore(data.topScore || 0);
        setIsLoggedIn(true);

        localStorage.setItem('token', data.token);

        history.push('/')
      }
    } else {
      setErrorMessage(data.error.message);
    }

    form.resetFields();
  };

  // const onFinishFailed = (errorInfo: any) => {
  //   console.log('Failed:', errorInfo);
  // };

  return (
    <div
      style={{
        width: '400px',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <Form
        name="basic"
        onFinish={onFinish}
        form={form}
        // onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        {errorMessage}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {register ? 'Register': 'Login'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
