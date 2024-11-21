import { PropsWithChildren } from 'react';
import { Form } from 'react-bootstrap';

interface InputWrapperProps {
  controlId: string;
  label: string;
  errorMsg: string | undefined;
  className?: string;
}

function InputWrapper({
  controlId,
  label,
  errorMsg,
  className = '',
  children,
}: PropsWithChildren<InputWrapperProps>) {
  return (
    <Form.Group
      controlId={controlId}
      className={`field-container ${className}`.trim()}
    >
      <Form.Label className="form-label">{label}</Form.Label>
      {children}
      <Form.Control.Feedback type="invalid">{errorMsg}</Form.Control.Feedback>
    </Form.Group>
  );
}

export default InputWrapper;
