import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // In a real app, you'd validate against a database
        // For demo purposes, we'll use hardcoded users
        const users = [
          {
            id: "1",
            email: "demo@example.com",
            password: "password123",
            name: "Demo User"
          },
          {
            id: "2", 
            email: "student@example.com",
            password: "student123",  
            name: "Student User"
          }
        ]

        const user = users.find(
          u => u.email === credentials?.email && u.password === credentials?.password
        )

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup'
  }
})
