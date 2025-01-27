import { FC, ReactNode } from 'react';
import { Button } from './button';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';


interface GoogleSignInButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: ReactNode;
}



const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {

  const router = useRouter()

  const handleGoogleSignIn = async () => {
    const result = await signIn('google'); // This triggers Google OAuth login
    console.log(result)
    router.push('/dashboard')
  };
   return (
    <Button onClick={handleGoogleSignIn} className='w-full'>
      {children}
    </Button>
  );
};

export default GoogleSignInButton;