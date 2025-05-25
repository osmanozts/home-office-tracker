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
        <UiProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </UiProvider>
      </body>
    </html >
  );
}
