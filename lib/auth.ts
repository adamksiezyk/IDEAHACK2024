import { DefaultSession, NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      orcidId: string;
      accessToken: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "orcid",
      name: "ORCID",
      type: "oauth",
      clientId: process.env.ORCID_CLIENT_ID,
      clientSecret: process.env.ORCID_CLIENT_SECRET,
      wellKnown: "https://orcid.org/.well-known/openid-configuration",
      authorization: { params: { scope: "openid email" } },
      checks: ["pkce", "state"],
      profile(profile) {
        return {
          id: profile.sub, // ORCID's unique user identifier
          name: profile.name || profile.preferred_username || null,
          email: profile.email || null,
          image: null, // ORCID doesn't provide profile images
        };
      },
    },
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async session({ session, token, user }) {
      if (session.user) {
        console.log(token);
        session.user.orcidId = (token.orcidIds as string) || "";
        session.user.accessToken = (token.ccessToken as string) || "";
      }
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = account.id_token;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login", // Custom login page
  },
  secret: process.env.NEXTAUTH_SECRET,
};
