"use client"

import { Button, Stack } from "@chakra-ui/react";
import { supabaseClient } from "./libs/db/client";

export default function Home() {
  const supabase = supabaseClient()
  return (
    <Stack>
      <Button onClick={async () => await supabase.auth.signOut()}>Click me</Button>
    </Stack>
  );
}
