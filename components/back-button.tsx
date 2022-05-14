import router from "next/router";
import Button from "./button";

const BackButton = () => {
  return <Button text="Back" onClick={() => router.back()} />;
};

export default BackButton;
