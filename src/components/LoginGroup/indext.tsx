import { Button } from '@radix-ui/themes';
import { useAuthHydrated } from '@/store/useAuthentication';

const LoginGroup = () => {
  const hydrated = useAuthHydrated();
  if (!hydrated) return null;

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
