import { Button, Input } from "@nextui-org/react";

const EmailSignUp = () => {
  return (
    <form className="flex gap-1 w-full mx-auto justify-center items-center pt-[1rem] h-fit">
      <div className="w-[80%] mx-auto">
        <Input
          key={`inside`}
          type="email"
          label="Email"
          labelPlacement={`inside`}
          size="sm"
        />
      </div>
      <Button color="primary" variant="shadow" radius="sm">
        Sign up, its Free
      </Button>
    </form>
  );
};

export default EmailSignUp;
