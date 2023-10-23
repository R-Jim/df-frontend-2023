import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

const handler = NextAuth({
    session: { strategy: 'jwt' },
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
                if (
                    credentials === undefined ||
                    credentials.email === undefined ||
                    credentials.password === undefined
                ) {
                    throw new Error('missing email or password')
                }

                const { data } = await axios
                    .post(`${process.env.API_URL}/auth/login`, {
                        email: credentials?.email,
                        password: credentials?.password,
                    })
                    .catch(
                        ({
                            response: {
                                data: { message },
                            },
                        }) => {
                            throw new Error(message)
                        },
                    )
                    .then(({ data }) => data)

                return {
                    id: `${data.id}`,
                    email: credentials.email,
                    secret: data.accessToken,
                }
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
        async jwt({ token, user }) {
            if (user) {
                token.secret = user.secret
            }
            return token
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.secret = token.secret
            }
            return session
        },
    },
})

export { handler as GET, handler as POST }
