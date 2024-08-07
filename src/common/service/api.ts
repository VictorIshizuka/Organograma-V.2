import axios from "axios";

interface ApiService<Model> {
  baseURL?: string;
  url: string;
  method: string;
  body?: Model;
  params?: unknown;
  headers?: Record<string, string>;
}

async function callApi<Model>({
  url,
  method,
  body,
  params,
  headers,
}: ApiService<Model>) {
  return axios
    .request({
      url: `${import.meta.env.VITE_API}${url}`,
      method,
      data: body,
      params,
      headers,
    })
    .then(res => res.data)
    .catch(error => {
      error.response.data ?? error;
    });
}

//criar função que realiza o refresh token
//criar função que verifica se o token esta vencendo
//criar função que verifque se o token existe em localstorage

export async function apiService<Model>({
  url,
  method,
  body,
  params,
}: ApiService<Model>) {
  return callApi<Model>({
    url,
    method,
    body,
    params,
    headers: {
      //token armazenado no localstorages
      Authorization: `Bearer ${"teste"}`,
    },
  });
}
