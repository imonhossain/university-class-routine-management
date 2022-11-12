import { Formik, Field, Form, ErrorMessage } from 'formik';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import UserPayload from 'interfaces/auth/UserPayload';
import RoutingPath from 'enums/RoutingPath';
import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Input } from '@material-tailwind/react';
import LoginSchema from './LoginSchema';
import TextInput from 'components/common/form/TextInput';

interface Props {
  isLoading?: boolean;
  onClickSubmit: (user: UserPayload) => void;
}

const LoginForm: FC<Props> = ({ isLoading, onClickSubmit }) => {
  return (
    <Formik
      initialValues={{ email: '', password: '', checked: true }}
      validationSchema={LoginSchema}
      onSubmit={(values) => onClickSubmit(values)}
    >
      {({ values, errors, touched, handleChange, setFieldValue, handleBlur, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Card className="w-96 ml-auto mr-auto">
            <CardHeader color="blue" className="relative text-center">
              Login Form
            </CardHeader>
            <CardBody className="text-center">
              <Input label="Username" className="mb-4" />
              <Input label="Password" />
            </CardBody>
            <CardFooter divider className="flex items-center justify-between py-3">
              <Button>Login</Button>
            </CardFooter>
          </Card>
        </form>
      )}
    </Formik>
  );
};
export default LoginForm;
