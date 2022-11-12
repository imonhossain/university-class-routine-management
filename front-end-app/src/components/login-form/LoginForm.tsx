import { Button, Card, CardBody, Input } from '@material-tailwind/react';
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
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const event = e as unknown as any;
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const onClickLogin = () => {
    onClickSubmit(form);
  };
  const isValidForm = form.email && form.password;
  return (
    <Card className="w-96 ml-auto mr-auto mt-24">
      <h1 className="text-center">Login Form</h1>
      <CardBody>
        <Input
          label="Email"
          type="email"
          value={form.email}
          name="email"
          onChange={onChange}
          required
        />
        <div className="mb-3" />
        <Input
          label="Password"
          value={form.password}
          name="password"
          type="password"
          onChange={onChange}
          required
        />
        <div className="mb-3" />
        <div className="text-center">
          <Button
            size="sm"
            type="button"
            onClick={onClickLogin}
            disabled={!isValidForm || isLoading}
          >
            Login
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
export default LoginForm;
