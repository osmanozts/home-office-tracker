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
                <Heading>Login</Heading>

                <Field.Root invalid={!!errors.email}>
                    <Field.Label >Email</Field.Label>
                    <Input {...register("email")} />
                    <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.password}>
                    <Field.Label >Passwort</Field.Label>
                    <PasswordInput {...register("password")} />
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
