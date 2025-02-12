import { FC, ReactNode, useState } from "react";
import { Button } from "./button";
import { signIn } from "next-auth/react";

interface GoogleSignInButtonProps {
  children: ReactNode;
}
const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      await signIn("google", {
        callbackUrl: `${window.location.origin}/admin/dashboard`,
      });
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button onClick={loginWithGoogle} className="w-full bg-customBg">
      {children}
    </Button>
  );
};

export default GoogleSignInButton;
