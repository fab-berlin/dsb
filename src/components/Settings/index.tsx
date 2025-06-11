import { Box, Button, Flex, TextField } from '@radix-ui/themes';
import { FormEvent, useEffect, useState } from 'react';

const Settings = () => {
  const [dsbUser, setDsbUser] = useState({ username: '', password: '' });
  const [sunshineUser, setSunshineUser] = useState({ username: '', password: '' });

  useEffect(() => {
    const storeDsbdUser = localStorage.getItem('dsbUser');
    if (storeDsbdUser) {
      try {
        // Parse the stored JSON string into an object
        const parsedUser = JSON.parse(storeDsbdUser);
        setDsbUser(parsedUser);
      } catch (error) {
        // Handle parsing error - reset to default if stored data is invalid
        console.error('Failed to parse stored user data:', error);
        setDsbUser({ username: '', password: '' });
      }
    }
    const storeSunshineUser = localStorage.getItem('sunshineUser');
    if (storeSunshineUser) {
      try {
        // Parse the stored JSON string into an object
        const parsedUser = JSON.parse(storeSunshineUser);
        setSunshineUser(parsedUser);
      } catch (error) {
        // Handle parsing error - reset to default if stored data is invalid
        console.error('Failed to parse stored user data:', error);
        setSunshineUser({ username: '', password: '' });
      }
    }
  }, []);

  const saveCredentials = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);

    setDsbUser({
      username: formData.get('dsb-username') as string,
      password: formData.get('dsb-password') as string,
    });
    setSunshineUser({
      username: formData.get('sunshine-username') as string,
      password: formData.get('sunshine-password') as string,
    });

    localStorage.setItem(
      'dsbUser',
      JSON.stringify({
        username: formData.get('dsb-username') as string,
        password: formData.get('dsb-password') as string,
      })
    );
    localStorage.setItem(
      'sunshineUser',
      JSON.stringify({
        username: formData.get('sunshine-username') as string,
        password: formData.get('sunshine-password') as string,
      })
    );
  };

  return (
    <>
      <form onSubmit={saveCredentials}>
        <Flex
          direction="column"
          gap="6"
        >
          {/* DSB Credentials */}
          <div className={'flex flex-col gap-y-4 rounded-md border bg-gray-800 p-4'}>
            <h2 className={'text-lg font-bold'}>Zugangsdaten DSB</h2>

            <Box>
              <p className="mb-1">Benutzername</p>
              <TextField.Root
                id="dsb-username"
                name="dsb-username"
                placeholder="DSB Benutzer"
                size="3"
                defaultValue={dsbUser.username}
              />
            </Box>
            <Box>
              <p className="mb-1">Passwort</p>
              <TextField.Root
                id="dsb-password"
                name="dsb-password"
                type="password"
                placeholder="DSB Passwort"
                size="3"
                defaultValue={dsbUser.password}
              />
            </Box>
          </div>

          <div className={'flex flex-col gap-y-4 rounded-md border bg-gray-800 p-4'}>
            <h2 className={'text-lg font-bold'}>Zugangsdaten Sunshine-Catering</h2>
            <Box>
              <p className="mb-1">Benutzername</p>
              <TextField.Root
                id="sunshine-username"
                name="sunshine-username"
                placeholder="Sunshine-Catering Benutzer"
                size="3"
                defaultValue={sunshineUser.username}
              />
            </Box>
            <Box>
              <p className="mb-1">Passwort</p>
              <TextField.Root
                id="sunshine-password"
                name="sunshine-password"
                type="password"
                placeholder="Sunshine-Catering Passwort"
                size="3"
                defaultValue={sunshineUser.password}
              />
            </Box>
          </div>
          <Button
            size="3"
            type={'submit'}
            variant={'solid'}
            color={'orange'}
          >
            Speichern
          </Button>
        </Flex>
      </form>
    </>
  );
};

export default Settings;
