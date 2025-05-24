"use client"

import { supabaseClient } from "@/app/libs/db/client"
import { Button, Checkbox, CheckboxGroup, Field, Fieldset, For, Heading, HStack, Input, Stack } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

interface FormValues {
    email: string
    password: string
    isHr: boolean
}

interface Props {
    signUp: (formData: FormData) => Promise<void>
}

export function SignUpForm({ signUp }: Props) {
    const router = useRouter()
    const {
        register,
        formState: { errors },
        setValue,
    } = useForm<FormValues>()

    return (
        <form>
            <Stack borderWidth={1} padding={8} gap="4" align="flex-start" maxW="sm">
                <Heading color="#000">Account erstellen</Heading>

                <Field.Root invalid={!!errors.email}>
                    <Field.Label color="#000">Email</Field.Label>
                    <Input color="#000" {...register("email")} />
                    <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.password}>
                    <Field.Label color="#000">Passwort</Field.Label>
                    <Input color="#000" {...register("password")} />
                    <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
                </Field.Root>

                <Checkbox.Root mt="2" value="HR" onCheckedChange={(event) => setValue("isHr", !!event.checked)}>
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label color="#000" >HR</Checkbox.Label>
                </Checkbox.Root>

                <HStack>

                    <Button type="submit" formAction={signUp}>Registrieren</Button>
                    <Button onClick={() => router.push("/sign-in")}>Zur Anemeldung</Button>
                </HStack>
            </Stack>
        </form>
    )
}
