import "./globals.css";
import { AuthProvider, UiProvider } from "@/components/provider";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <AuthProvider>
          <UiProvider
          >{children}</UiProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
