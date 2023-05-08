import RootStyleRegistry from "./Emotion";

export default function RootLayout({ children }: { children: JSX.Element }) {
  return (
    <html>
      <head></head>
      <body>
        <RootStyleRegistry>
          {children}
        </RootStyleRegistry>
      </body>
    </html>
  );
}