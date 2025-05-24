import { Stack } from "@chakra-ui/react";

export default function SignInLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Stack>{children}</Stack>
    );
}
