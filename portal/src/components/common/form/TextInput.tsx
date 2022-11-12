import React, { FC } from "react";
import {Input} from "@material-tailwind/react";
type type = 'text' | 'number' | 'text' | 'email' | 'password';

interface Props {
  onChange: (e: any) => void;
  onBlur: (e: any) => void;
  value: string;
  error?: any;
  success: string;
  type?: type;
  name?: string;
  placeholder?: string;
}

const TextInput: FC<Props> = (props) => {
  return (
    <div style={{ marginBottom: "30px", width: "100%" }}>
      <Input
        {...props}
        color={'lightBlue' as any}
        size={'regular' as any}
        variant="outlined"
        // outline={true}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        error={props.error as any}
        success={props.success as any}
      />
    </div>
  );
};

export default TextInput;
