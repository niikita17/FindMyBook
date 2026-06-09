import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.baseurl,
    withCredentials: true
});


// REQUEST INTERCEPTOR
api.interceptors.request.use(

    (config) => {

        const token =
            localStorage.getItem("token");

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },

    (error) => Promise.reject(error)
);


// RESPONSE INTERCEPTOR
api.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest =
            error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true;

            try {

                const response =
                    await axios.post(
                        `${import.meta.env.baseurl}/auth/refresh-token`,
                        {},
                        {
                            withCredentials: true
                        }
                    );
                console.log(response.data);
                const newAccessToken =
                    response.data;

                localStorage.setItem(
                    "token",
                    newAccessToken
                );

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return api(originalRequest);

            } catch (refreshError) {

                // REFRESH TOKEN INVALID

                localStorage.removeItem("token");

                window.location.href = "/";

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
export default api;