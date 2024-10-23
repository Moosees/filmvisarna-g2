import { Button } from 'react-bootstrap';
interface YellowBtnProps {
  title: string;
  onClick: (e?: React.MouseEvent) => void;
}

export default function PrimaryBtn({ title, onClick }: YellowBtnProps) {
  return (
    <div>
      <Button
        href="#"
        className="btn bg-btn text-dark border-btn m-1 px-5 py-1 fw-bold"
        onClick={onClick}
      >
        {title}
      </Button>
    </div>
  );
}
