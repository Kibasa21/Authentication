import { redirect } from "react-router-dom";

export function getTokenDuration() {
    const storedExpiationDate = localStorage.getItem('expirationDate');
    const expirationDate = new Date(storedExpiationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

export function getAuthToken() {
    const token = localStorage.getItem('token');//O método getItem() retorna o valor do item especificado no LocalStorage

    if(!token){
        return null;
    }

    const tokenDuration = getTokenDuration();

    if(tokenDuration <= 0){
        return 'EXPIRED';
    }

    return token;
}

export function loader() {
    return getAuthToken();
}

export function checkAuthLoader() {
    const token = getAuthToken();

    if(!token){
        return redirect('/auth');
    } else {
        return null;
    }
}
