import { jwtDecode } from "jwt-decode";

export const getUser = () => {

    const token =
        localStorage.getItem("token");

    if (!token)
        return null;

    try {

        const decoded =
            jwtDecode(token);

        return {
            role:
                decoded[
                "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                ],

            email:
                decoded[
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
                ],

            userId:
                decoded[
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
                ]
        };

    } catch {

        return null;
    }
};