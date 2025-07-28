import Cookies from "js-cookie";


interface User {
    [key: string]: string | boolean | null; // You can replace this with a stricter type if available
}

interface LoginData {
    accessToken?: string;
    user?: User;
}

/**
 * Save login data by storing tokens and user info in cookies.
 * @param data - The payload data containing tokens and user information.
 */
export const saveLoginData = (data: LoginData): void => {
    try {
        const { accessToken, user } = data;

        if (accessToken && user) {
            Cookies.set("jwt", accessToken as string, {
                secure: true,
                sameSite: "Strict",
            });

            Cookies.set("user_info", JSON.stringify(user), {
                secure: true,
                sameSite: "Strict",
            });
        }
    } catch (error) {
        console.error("Error saving login data:", error);
    }
};
