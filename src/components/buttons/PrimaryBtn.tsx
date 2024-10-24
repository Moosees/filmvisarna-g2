import { Button } from 'react-bootstrap';
interface YellowBtnProps {
  title: string;
  onClick?: (e?: React.MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
}

export default function PrimaryBtn({
  title,
  onClick,
  type = 'button',
}: YellowBtnProps) {
  return (
    <div>
      <Button
        className="btn bg-btn text-dark border-btn m-1 px-5 py-1 fw-bold"
        onClick={onClick}
        type={type}
      >
        {title}
      </Button>
    </div>
  );
}
