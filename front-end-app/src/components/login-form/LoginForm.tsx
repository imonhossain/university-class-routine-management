import { Button, Card, Input } from 'antd';
import UserPayload from 'interfaces/auth/UserPayload';
import { FC, useState } from 'react';

interface Props {
  isLoading?: boolean;
  onClickSubmit: (user: UserPayload) => void;
}

const LoginForm: FC<Props> = ({ isLoading = false, onClickSubmit }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const onClickLogin = () => {
    onClickSubmit(form);
  };
  const isValidForm = form.email && form.password;
  return (
    <Card className="w-96 ml-auto mr-auto mt-24">
      <h1 className="text-center">Login Form</h1>
      <div>
        <label className="block mb-1">Email</label>
        <Input
          placeholder="Email"
          type="email"
          value={form.email}
          name="email"
          onChange={onChange}
          required
        />
        <div className="mb-3" />
        <label className="block mb-1">Password</label>
        <Input.Password
          placeholder="Password"
          value={form.password}
          name="password"
          onChange={onChange}
          required
        />
        <div className="mb-3" />
        <div className="text-center">
          <Button
            size="small"
            type="primary"
            onClick={onClickLogin}
            disabled={!isValidForm || isLoading}
          >
            Login
          </Button>
        </div>
      </div>
    </Card>
  );
};
export default LoginForm;
