import Link from "next/link";

interface ButtonProps {
  text: string;
  href?: string;
}

const Button = ({ text, href }: ButtonProps) => {
  const styledButton = (
    <button
      type="button"
      className="border rounded border-carbon hover:text-cotton hover:bg-carbon text-carbon p-0.5 mr-1.5 pl-1.5 pr-1.5 w-full"
    >
      <p className="font-NeueMontreal tablet:text-14px tablet:leading-18px  laptop:text-20px laptop:leading-24px  desktop:text-24px desktop:leading-26px">
        {text}
      </p>
    </button>
  );

  return (
    <div className="flex-col items-center justify-center">
      <div className="mt-1.5 w-full">
        {href ? <Link href={href}>{styledButton}</Link> : styledButton}
      </div>
    </div>
  );
};

export default Button;
