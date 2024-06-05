import { Form, Link, useActionData, useNavigation, useSearchParams } from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {
  const navigation = useNavigation(); //useNavigation é um hook que retorna um objeto com métodos para navegar pela aplicação
  const data = useActionData(); //useActionData é um hook que retorna os dados da action (no caso, os dados do formulário de autenticação
  
  const [searchParams, setSearchParams] = useSearchParams(); //useSearchParams é um hook que retorna um array com dois elementos, o primeiro é um objeto com os parâmetros da URL e o segundo é uma função que permite alterar os parâmetros da URL
  const isLogin = (searchParams.get('mode') === 'login'); //O método get() retorna o valor do parâmetro especificado da URL
  const isSubmitting = navigation.state === 'submitting'; //O estado submitting significa que a action está sendo executada
  
  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        {
          (data && data.errors) && <ul>
            {Object.values(data.errors).map((err) => (//O Object.values() retorna um array com os valores das propriedades de um objeto
              <li key={err}>{err}</li>
            ))}
          </ul>
        }
        {(data && data.message) && <p>{data.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}> {/* Esse ?mode significa que se o mode for igual a login ele vai para o link de criar novo usuário, se não ele vai para o link de login */}
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
