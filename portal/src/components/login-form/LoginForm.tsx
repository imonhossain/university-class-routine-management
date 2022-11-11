import { Formik, Field, Form, ErrorMessage } from 'formik';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import UserPayload from 'interfaces/auth/UserPayload';
import RoutingPath from 'enums/RoutingPath';
import LoginSchema from './LoginSchema';

interface Props {
  email?: string;
  password?: string;
  isLoading?: boolean;
  onClickSubmit: (user: UserPayload) => void;
}

const LoginForm: FC<Props> = ({ email, password, isLoading, onClickSubmit }) => {
  return (
    <div >
      <Formik
        validateOnChange={true}
        initialValues={{
          email: email || '',
          password: password || '',
        }}
        validationSchema={LoginSchema}
        onSubmit={(user: UserPayload) => {
          onClickSubmit(user);
        }}
      >
        {({ errors, values }) => (
          <Form>
            <h2 className="text-center mb-3 md:mb-8 mt-4 md:mt-10">Login</h2>
            <div className="block md:flex flex-row gap-5">
              <div className="basis-1/2 mb-4">
                <div className="form-group">
                {/* <Input variant="outlined" label="Outlined" /> */}
                  <label htmlFor="email">Email</label>
                  <Field placeholder="Enter email" className="form-control" id="email" name="email" autoFocus />
                  <ErrorMessage component="span" className="text-error" name="email" />
                </div>
              </div>
              <div className="basis-1/2 mb-4">
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field
                    placeholder="Enter password"
                    className="form-control"
                    type="password"
                    id="password"
                    name="password"
                  />
                  <ErrorMessage component="span" className="text-error" name="password" />
                </div>
              </div>
            </div>
            <div className="text-center pt-4 mb-1">
              {/* <Button
                type="submit"
                color="primary"
                disabled={!!errors.email || !!errors.password || !(values.email && values.password)}
                buttonSize="md"
                id="login"
                isLoading={isLoading}
              >
                LOGIN
              </Button> */}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default LoginForm;

LoginForm.defaultProps = {
  email: '',
  password: '',
};
