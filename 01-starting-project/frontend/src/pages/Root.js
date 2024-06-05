import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';
import { getTokenDuration } from '../util/auth';

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();//O hook useSubmit() é usado para enviar solicitações ao servidor.
  // const navigation = useNavigation();
  useEffect(() => {
    if(!token) {
      return;

    } else if(token === 'EXPIRED'){
      submit(null, {action: '/logout', method: 'post'});
      return;
    }

    const tokenDuration = getTokenDuration();

      setTimeout(() => {
        submit(null, {action: '/logout', method: 'post'})
      }, tokenDuration);
  }, [token, submit])

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
