import { Button } from '@radix-ui/themes';

const LoginGroup = () => {
  return (
    <div className={'flex h-[calc(100dvh-176px)] flex-col items-center justify-center gap-4'}>
      <p className={'text-center'}>Bitte einmal mit den korrekten Zugangsdaten anmelden</p>
      <Button asChild={true}>
        <a href={'/login'}>Login</a>
      </Button>
    </div>
  );
};

export default LoginGroup;
