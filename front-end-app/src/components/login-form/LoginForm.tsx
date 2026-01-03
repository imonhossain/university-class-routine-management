import { Button } from 'components/ui/button';
import { Card, CardContent } from 'components/ui/card';
import { Input } from 'components/ui/input';
import { PasswordInput } from 'components/ui/password-input';
import { Label } from 'components/ui/label';
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
      <CardContent className="pt-6">
        <h1 className="text-center mb-4">Login Form</h1>
        <div>
          <Label className="block mb-1">Email</Label>
          <Input
            placeholder="Email"
            type="email"
            value={form.email}
            name="email"
            onChange={onChange}
            required
          />
          <div className="mb-3" />
          <Label className="block mb-1">Password</Label>
          <PasswordInput
            placeholder="Password"
            value={form.password}
            name="password"
            onChange={onChange}
            required
          />
          <div className="mb-3" />
          <div className="text-center">
            <Button
              size="sm"
              onClick={onClickLogin}
              disabled={!isValidForm || isLoading}
            >
              Login
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default LoginForm;
