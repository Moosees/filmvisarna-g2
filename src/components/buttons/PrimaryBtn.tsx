import { Button, ButtonProps } from 'react-bootstrap';

interface PrimaryBtnProps extends ButtonProps {
  smallFont?: boolean;
}

export default function PrimaryBtn({
  smallFont = false,
  className,
  children,
  ...other
}: PrimaryBtnProps) {
  return (
    <Button
      className={`${className ? className : ''} primary-btn btn text-dark border-btn m-1 px-3 py-1 fw-bold ${
        smallFont ? 'small-font-btn' : ''
      }`}
      {...other}
    >
      {children}
    </Button>
  );
}
