import Link from "next/link";

interface ButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  testId?: string;
}

const Button = ({
  text,
  href,
  onClick,
  testId,
  disabled = false,
}: ButtonProps) => {
  const styledButton = (
    <button
      data-testid={testId}
      type="button"
      className="border rounded-lg border-carbon hover:text-cotton hover:bg-carbon text-carbon p-2 mr-1.5 px-1.5 w-full"
      onClick={onClick}
      disabled={disabled}
    >
      <p className="font-NeueMontreal tablet:text-14px tablet:leading-18px  laptop:text-20px laptop:leading-24px  desktop:text-24px desktop:leading-26px">
        {text.toUpperCase()}
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
