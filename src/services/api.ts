import joinURL from 'utils/joinURL';
import Swal from 'sweetalert2';

export class API {
  private baseURL: string;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || process.env.REACT_APP_API_HOST || 'http://localhost:3000';
  }

  private async processRequest(verb: string, url: string, data?: { [key: string]: any }, headers?: { [key: string]: string }, useAuth: boolean = true) {

    try {
      console.log('ENV AQUI---');
      console.log(process.env.REACT_APP_API_HOST);
      const response = await fetch(joinURL(this.baseURL, url), {
        method: verb,
        ...(data ? { body: JSON.stringify(data) } : {}),
        headers: {
          ...headers,
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        mode: 'cors'
      });

      if (!response.ok) {
        throw response;
      }
      return response;
    } catch (error) {
      if (error) {
        switch (error.status) {
          case 401:
            Swal.fire({
              title: 'Não autorizado',
              icon: 'error',
            });
            break;
          case 403:
            Swal.fire({
              title: 'Ação não permitida',
              text: 'Seu perfil não tem permissão para acessar esta tela.',
              icon: 'error',
            });
            break;
          case 404:
            Swal.fire({
              title: 'Não encontrado',
              text: 'Não foi possível encontrar o endereço',
              icon: 'error',
            });
            console.error(error);
            break;
        }
      }
      return error as Response;
    }
  }

  put = (url: string, data?: { [key: string]: any }, headers?: { [key: string]: string }, useAuth: boolean = true) => this.processRequest('PUT', url, data, headers, useAuth);
  get = (url: string, data?: { [key: string]: any }, headers?: { [key: string]: string }, useAuth: boolean = true) => this.processRequest('GET', url, data, headers, useAuth);
  post = (url: string, data?: { [key: string]: any }, headers?: { [key: string]: string }, useAuth: boolean = true) => this.processRequest('POST', url, data, headers, useAuth);
  patch = (url: string, data?: { [key: string]: any }, headers?: { [key: string]: string }, useAuth: boolean = true) => this.processRequest('PATCH', url, data, headers, useAuth);
  delete = (url: string, data?: { [key: string]: any }, headers?: { [key: string]: string }, useAuth: boolean = true) => this.processRequest('DELETE', url, data, headers, useAuth);
}

export default new API();
