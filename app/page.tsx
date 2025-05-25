"use client";

import { Stack } from "@chakra-ui/react";
import { ActiveSession, MainHeader, SessionHistory } from "./components";

export interface Session {
  id: string;
  start_time: string;
  end_time: string | null;
  user_id: string;
}

export default function Home() {
  return (
    <Stack gap={8} p={8} maxW="3xl" mx="auto">
      <MainHeader />
      <ActiveSession />
      <SessionHistory />
    </Stack>
  );
}
