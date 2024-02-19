import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import axios, { AxiosError } from "axios";

@Module({ namespaced: true })
export default class AuthModule extends VuexModule {
  token: string | null = null;
  error: any = null;
  response: any = null;
  userInfo: any = null;
  sellerId: string | null = null;
  marketplace: string | null = null;

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
    return this.response;
  }

  get getUserInfo(): any {
    return this.userInfo;
  }

  get getMarketplace(): string | null {
    return this.marketplace;
  }

  get getSellerId(): string | null {
    return this.sellerId;
  }

  @Mutation
  setSellerId(sellerId: string | null): void {
    this.sellerId = sellerId;
  }

  @Mutation
  setMarketplace(marketplace: string | null): void {
    this.marketplace = marketplace;
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

      await this.context.dispatch("fetchUserInfo", {
        token,
        email: credentials.Email,
      });
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
  async fetchUserInfo({
    token,
    email,
  }: {
    token: string;
    email: string;
  }): Promise<void> {
    try {
      const response = await axios.post(
        "https://iapitest.eva.guru/user/user-information",
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userData = response.data.Data.user;
      const storeData = response.data.Data.user.store;

      const marketplace = storeData[0]?.marketplaceName;
      const sellerId = storeData[0]?.storeId;
    
      this.context.commit("setMarketplace", marketplace);
      this.context.commit("setSellerId", sellerId);

      this.context.commit("setUserInfo", response.data);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  }
 
}
