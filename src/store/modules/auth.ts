// store/modules/auth.ts
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import axios, { AxiosError, AxiosResponse } from 'axios';

@Module({ namespaced: true })
export default class AuthModule extends VuexModule {
  token: string | null = null;
  error: any = null;
  response: any = null; // Yeni eklenen response alanı

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  get getToken(): string | null {
    return this.token;
  }

  get getError(): any {
    return this.error;
  }

  get getResponse(): any { // Yeni eklenen getter
    return this.response;
  }

  @Mutation
  setToken(token: string): void {
    this.token = token;
  }

  @Mutation
  setError(error: any): void {
    this.error = error;
  }

  @Mutation
  setResponse(response: any): void { // Yeni eklenen mutation
    this.response = response;
  }

  @Action
  async login(credentials: { [key: string]: string }): Promise<void> {
    try {
      const response = await axios.post('https://iapitest.eva.guru/oauth/token', credentials);
      const token = response.data.Data.AccessToken;
      this.context.commit('setToken', token);
      this.context.commit('setResponse', response.data); // Yeni eklenen response saklanıyor
      this.context.commit('setError', null); 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        this.context.commit('setError', axiosError.response?.data);
      } else {
        console.error(error);
      }
    }
  }
}
