interface RubrikProps {
  title: string;
}

export default function Rubrik({ title }: RubrikProps) {
  return (
    <div className="mx-auto my-2 bg-rosa text-dark text-center fs-5 fw-bold text-decoration-underline p-2  custom-rounded col-9 col-sm-7 col-md-5 col-lg-3 ">
      {title}
    </div>
  );
}
