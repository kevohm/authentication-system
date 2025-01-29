import { ExpressAuth } from "@auth/express";
import Credentials from "@auth/express/providers/credentials";

export const authPlugin = ExpressAuth({
  secret: process.env.AUTH_PROVIDER_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // Replace this with your actual logic to verify user credentials
        console.log(credentials)
        const { email, password } = credentials;

        if (email === "admin@gmail.com" && password === "password") {
          return { id: 1, name: "Admin" }; // Return user object on success
        }

        return null; // Return null if authorization fails
      },
    }),
  ],
})