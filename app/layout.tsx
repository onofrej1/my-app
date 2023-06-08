import RootStyleRegistry from "./Emotion";
import { NextAuthProvider } from "./authProvider";

export default function RootLayout({ children }: { children: JSX.Element }) {
  return (
    <html>
      <head></head>
      <body>
        <RootStyleRegistry>
          <NextAuthProvider>{children}</NextAuthProvider>
        </RootStyleRegistry>
      </body>
    </html>
  );
}