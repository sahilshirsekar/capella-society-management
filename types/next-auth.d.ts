import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    username : string | null
    image : string | null | undefined
  }
  interface Session {
    user: User & {
      username : string
    }
    token : {
      username : string
    }
  }
}