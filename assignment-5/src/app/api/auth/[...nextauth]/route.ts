import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                // Add logic here to look up the user from the credentials supplied
                return { id: '1', email: credentials?.email }
            },
        }),
    ],
    callbacks: {
        async signIn() {
            return true
        },
        async redirect({ baseUrl }) {
            return baseUrl
        },
        async session({ session }) {
            return session
        },
    },
})

export { handler as GET, handler as POST }
