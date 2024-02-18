import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import axios, { AxiosError } from "axios";

@Module({ namespaced: true })
export default class AuthModule extends VuexModule {
  token: string | null = null;
  error: any = null;
  response: any = null; // Yeni eklenen response alanı
  userInfo: any = null; // Kullanıcı bilgisi için eklenen alan

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  get getToken(): string | null {
    return this.token;
  }

  get getError(): any {
    return this.error;
  }

  get getResponse(): any {
    // Yeni eklenen getter
    return this.response;
  }

  get getUserInfo(): any {
    return this.userInfo;
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
  setResponse(response: any): void {
    this.response = response;
  }

  @Mutation
  setUserInfo(userInfo: any): void {
    this.userInfo = userInfo;
  }

  @Action
  async login(credentials: { [key: string]: string }): Promise<void> {
    try {
      const response = await axios.post(
        "https://iapitest.eva.guru/oauth/token",
        credentials
      );
      const token = response.data.Data.AccessToken;
      console.log("credentials", credentials);
      this.context.commit("setToken", token);
      console.log("token", token);
      this.context.commit("setResponse", response.data);
      console.log("Login response:", response);
      this.context.commit("setError", null);

      await this.context.dispatch("fetchUserInfo", { token, email: credentials.Email });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        this.context.commit("setError", axiosError.response?.data);
      } else {
        console.error(error);
      }
    }
  }

  @Action
async fetchUserInfo({ token, email }: { token: string, email: string }): Promise<void> {
  try {
    const response = await axios.post(
      "https://iapitest.eva.guru/user/user-information",
      { email }, // Email'i obje olarak post ediyoruz
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("responseUserInfo", response);
    this.context.commit("setUserInfo", response.data);
    console.log("User information:", response.data);
  } catch (error) {
    console.error("Error fetching user information:", error);
  }
}
}
