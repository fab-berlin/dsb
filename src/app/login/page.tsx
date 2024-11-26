'use client';

import { FormEvent, useEffect } from 'react';
import { useAuthentication } from '@/app/store/useAuthentication';
import { useRouter } from 'next/navigation';
import { Button, Card, Flex, TextField, Theme } from '@radix-ui/themes';
import ViewArea from '@/components/ViewArea';

import '@radix-ui/themes/styles.css';

export default function Page() {
  const router = useRouter();
  const { authToken, setAuthToken } = useAuthentication();
  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');

    const response = await fetch('/api/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: username, password: password }),
    });
    const token = await response.json();
    setAuthToken(token.authToken);
    sessionStorage.setItem('authToken', token.authToken);
    router.push('/');
  };

  useEffect(() => {
    if (authToken) router.push('/');
  }, [authToken, router]);

  return (
    <main className={'h-screen overflow-hidden'}>
      <Theme
        appearance="dark"
        hasBackground={false}
      >
        <ViewArea>
          <Flex
            direction={'column'}
            justify={'center'}
            align={'center'}
            height={'100vh'}
          >
            <h1 className={'mb-8 pt-4 text-2xl font-bold'}>Login Page</h1>
            <Card size={'3'}>
              <form onSubmit={handleSubmit}>
                <Flex
                  gapY={'3'}
                  direction={'column'}
                >
                  <TextField.Root
                    placeholder={'Username'}
                    name={'username'}
                    required
                    size={'3'}
                  ></TextField.Root>
                  <TextField.Root
                    placeholder={'Passwort'}
                    name={'password'}
                    required
                    size={'3'}
                    type={'password'}
                  ></TextField.Root>
                  <Button
                    type={'submit'}
                    size={'3'}
                    variant={'soft'}
                  >
                    Login
                  </Button>
                </Flex>
              </form>
            </Card>
          </Flex>
        </ViewArea>
      </Theme>
    </main>
  );
}
