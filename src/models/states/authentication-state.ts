export interface AuthenticationState  {
    isAuthenticated: boolean;
    error: {
        message: string;
        code: number;
    } | null;
}