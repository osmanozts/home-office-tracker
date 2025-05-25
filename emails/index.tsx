import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
} from "@react-email/components";
import * as React from "react";

interface EmailProps {
  email: string;
  start: string;
  end: string;
}

export default function EmailTemplate({ email, start, end }: EmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Session beendet!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Ein Mitarbeiter hat seine Session beendet!</Heading>
          <Text style={text}>Mitarbeiter mit der Email: {email} hat seine Session beendet.</Text>
          <Text style={text}>Gestartet am: {start} und beendet am: {end}</Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
  padding: "20px",
};

const container = {
  margin: "0 auto",
  padding: "20px",
  border: "1px solid #eee",
  borderRadius: "8px",
  maxWidth: "480px",
};

const heading = {
  fontSize: "24px",
  marginBottom: "16px",
};

const text = {
  fontSize: "16px",
  lineHeight: "24px",
};
