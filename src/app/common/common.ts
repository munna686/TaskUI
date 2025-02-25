import { environment } from "../../environment";

export class Common{

    public static getToken(){
        return "Bearer " + localStorage.getItem("token");
    }

    getAccessToken(): string | null {
        return localStorage.getItem('accessToken');
    }
    
    getRefreshToken(): string | null {
        return localStorage.getItem('refreshToken');
    }

    public static getApiBaseUrl(){
        return environment.apiUrl;
    }
}