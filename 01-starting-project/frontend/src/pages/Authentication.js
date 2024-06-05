import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({request}) {

  const searchParams = new URL(request.url).searchParams; //O construtor URL cria um novo objeto URL, que representa o URL do documento atual
  const mode = searchParams.get('mode') || 'login'; //O método get() retorna o valor do primeiro parâmetro de URL especificado com o nome 'mode', se não houver nenhum parâmetro com esse nome, ele retorna 'login
  //Isso é necessário pq a action precisa saber se o usuário está tentando fazer login ou criar um novo usuário
  
  if(mode!=='login' && mode!=='signup') {
    throw json({message: 'Unsupported mode'}, {status: 422});//O método json() retorna um objeto JSON com a mensagem 'Unsupported mode' e o status 422
  }
  
  const data = await request.formData(); //O método formData() retorna um objeto FormData que representa os dados contidos no corpo do formulário
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  const response = await fetch('http://localhost:8080/' + mode,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  if(response.status === 422 || response.status === 401){//O status 422 significa que a requisição foi bem-sucedida, mas o servidor não pôde processar a entidade enviada, e o status 401 significa que a requisição não foi autorizada
    return response;
  }

  if(!response.ok) {
    throw json({message: 'Could not authenticate user.'}, {status: 500});//O status 500 significa que houve um erro interno no servidor
  }

  const resData = await response.json(); //O método json() retorna um objeto JSON com os dados da resposta
  const token = resData.token;

  localStorage.setItem('token', token);//O método setItem() define o valor do item especificado no LocalStorage, o LocalStorage é um objeto que armazena dados no navegador do usuário
  const expiration = new Date(); //O construtor Date cria um novo objeto Date que representa a data e a hora atuais
  expiration.setHours(expiration.getHours() + 1);//O método setHours() define a hora de uma data especificada de acordo com a hora local, usei isso para definir o tempo de expiração do token
  localStorage.setItem('expiration', expiration.toISOString());//O método toISOString() retorna uma string em formato ISO (YYYY-MM-DDTHH:mm:ss.sssZ) representando a data e a hora do objeto Date
  
  return redirect('/');
}