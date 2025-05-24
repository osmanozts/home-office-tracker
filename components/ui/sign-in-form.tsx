"use client"

import { Button, Field, Heading, HStack, Input, Stack } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { PasswordInput } from "./password-input"

interface FormValues {
    email: string
    password: string
}

interface Props {
    signIn: (email: string, password: string) => Promise<void>
}

export function SignInForm({ signIn }: Props) {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>()



    return (
        <form>
            <Stack borderWidth={1} padding={8} gap="4" align="flex-start" maxW="sm">
                <Heading color="#000">Login</Heading>

                <Field.Root invalid={!!errors.email}>
                    <Field.Label color="#000">Email</Field.Label>
                    <Input color="#000" {...register("email")} />
                    <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.password}>
                    <Field.Label color="#000">Passwort</Field.Label>
                    <PasswordInput color="#000" {...register("password")} />
                    <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
                </Field.Root>

                <HStack>

                    <Button type="submit" formAction={async (values) => {
                        const email = values.get("email")?.toString();
                        const password = values.get("password")?.toString();
                        await signIn(email ?? "", password ?? "");
                        router.push("/")
                    }}>Login</Button>
                </HStack>
            </Stack>
        </form>
    )
}
