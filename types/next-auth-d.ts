import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
      id: string; 
      name: string;
      email: string;
      role: string; 
    }
  
    interface JWT {
      id: string;
      name: string;
      email: string;
      role: string;
    }
  
    interface Session {
      user: {
        id: string;
        name: string;
        email: string;
        role: string;
      };
    }
  }
  