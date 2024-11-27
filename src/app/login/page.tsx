'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useAuthentication } from '@/app/store/useAuthentication';
import { useRouter } from 'next/navigation';
import { Button, Card, Flex, Switch, TextField, Theme, Text } from '@radix-ui/themes';
import ViewArea from '@/components/ViewArea';

import '@radix-ui/themes/styles.css';

export default function Page() {
  const router = useRouter();
  const { authToken, setAuthToken } = useAuthentication();

  const [savedUser, setSavedUser] = useState('');
  const [savedPass, setSavedPass] = useState('');

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');
    const saveCredentials = formData.get('persistcredentials') === 'on';

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

    if (token.authToken && saveCredentials) {
      localStorage.setItem('user', username as string);
      localStorage.setItem('password', password as string);
    }
    router.push('/');
  };

  useEffect(() => {
    setSavedUser(localStorage.getItem('user') ?? '');
    setSavedPass(localStorage.getItem('password') ?? '');
  }, []);

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
                    defaultValue={savedUser}
                  ></TextField.Root>
                  <TextField.Root
                    placeholder={'Passwort'}
                    name={'password'}
                    required
                    size={'3'}
                    type={'password'}
                    defaultValue={savedPass}
                  ></TextField.Root>
                  <Text
                    as="label"
                    size="2"
                    className={'my-4'}
                  >
                    <Flex gap="2">
                      <Switch
                        name={'persistcredentials'}
                        size="3"
                        defaultChecked
                      />
                      Daten speichern
                    </Flex>
                  </Text>
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
