"use client"

import { Button, Field, Heading, HStack, Input, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { PasswordInput } from "./password-input";
import { useState } from "react";

interface FormValues {
    email: string;
    password: string;
}

export function SignInForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        setLoading(true);
        setErrorMessage(null);
        try {
            const res = await fetch("/api/auth/sign-in", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: data.email, password: data.password }),
            });

            const jsonResponse = await res.json();

            if (!res.ok) {
                setErrorMessage(jsonResponse.error || "Unbekannter Fehler");
            } else {
                router.push("/");
            }
        } catch (e: any) {
            setErrorMessage(e.message || "Login fehlgeschlagen");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack borderWidth={1} padding={8} gap="4" align="flex-start" maxW="sm">
                <Heading>Login</Heading>

                <Field.Root invalid={!!errors.email}>
                    <Field.Label>Email</Field.Label>
                    <Input
                        type="email"
                        {...register("email", {
                            required: "Email ist erforderlich",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Ungültiges Email-Format",
                            },
                        })}
                    />
                    <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.password}>
                    <Field.Label>Passwort</Field.Label>
                    <PasswordInput {...register("password", { required: "Passwort ist erforderlich" })} />
                    <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
                </Field.Root>

                <HStack>
                    <Button loading={loading} type="submit" disabled={loading}>
                        Login
                    </Button>
                </HStack>

                {errorMessage && (
                    <Text color="red.500" fontSize="sm">
                        {errorMessage}
                    </Text>
                )}
            </Stack>
        </form>
    );
}
