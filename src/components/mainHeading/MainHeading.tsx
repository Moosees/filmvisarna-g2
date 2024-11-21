interface MainHeadingProps {
  title: string;
}

export default function MainHeading({ title }: MainHeadingProps) {
  return (
    <div className="row justify-content-center">
      <h1 className="bg-rosa text-dark text-center fs-5 fw-bold text-decoration-underline py-2 px-5 custom-rounded col-auto">
        {title}
      </h1>
    </div>
  );
}
