'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useAuthentication } from '@/store/useAuthentication';
import { useRouter } from 'next/navigation';
import { Button, Card, Flex, Switch, TextField, Theme, Text, Spinner } from '@radix-ui/themes';
import ViewArea from '@/components/ViewArea';

import '@radix-ui/themes/styles.css';

type Credentials = {
  username: string;
  password: string;
};

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

  useEffect(() => {
    // retrieve user credentials from localstorage
    const credentials: Credentials = JSON.parse(localStorage.getItem('dsbUser') as string) ?? {
      username: '',
      password: '',
    };
    // if not available reroute to settings
    if (credentials.username == '' || credentials.password == '') router.push('/settings');

    const autoLogin = async () => {
      const response = await fetch('/api/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: credentials.username, password: credentials.password }),
      });
      const token = await response.json();
      setAuthToken(token.authToken);
      sessionStorage.setItem('authToken', token.authToken);

      router.push('/');
    };

    autoLogin();
  }, []);

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
            <Spinner size={'3'} />
          </Flex>
        </ViewArea>
      </Theme>
    </main>
  );
}
