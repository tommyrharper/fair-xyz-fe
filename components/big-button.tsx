import Link from "next/link";

interface BigButtonProps {
  text: string;
  href: string;
  disabled?: boolean;
}

const BigButton = ({ text, href, disabled = false }: BigButtonProps) => {
  return (
    <Link href={href} className="flex-col items-center justify-center h-full">
      <button
        type="button"
        className="hover:text-cotton hover:bg-carbon text-carbon w-full h-full"
        disabled={disabled}
      >
        <p className="font-NeueMontreal text-2xl">{text.toUpperCase()}</p>
      </button>
    </Link>
  );
};

export default BigButton;
