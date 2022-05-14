import router from "next/router";
import Button from "./button";

interface BackButtonProps {
  href?: string;
}

const BackButton = ({ href }: BackButtonProps) => {
  if (href) return <Button text="Back" href={href} />;
  return <Button text="Back" onClick={() => router.back()} />;
};

export default BackButton;
