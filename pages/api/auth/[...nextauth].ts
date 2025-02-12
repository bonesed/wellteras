import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// OAuthを使うなら GoogleProvider, GitHubProvider などをimport

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Supabaseなどを使ったユーザ認証ロジック
        // 例: supabase.rpc("login_check", { email, password_hash })
        //   もしくはDBクエリでユーザーを検索
        const user = await checkUser(credentials?.email, credentials?.password);
        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  // セッション、JWTなどの設定
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role; // roleをJWTに含めるなど
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login", // ログインページ
  },
});
