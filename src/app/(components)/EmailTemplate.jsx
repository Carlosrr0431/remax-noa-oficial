import * as React from "react";
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components";

// https://res.cloudinary.com/dlxwkq6bm/image/upload/v1732299043/ve3cfp7wwvannurkgfxo.jpg

// https://api.whatsapp.com/send/?phone=543878533045&text=Hola+3878+533045%2C+te+contacto+por+la+siguiente+propiedad%3A+CASA+VENTA+TRES+CERRITOS+3+DORMITORIOS+Y+PILETA+https%3A%2F%2Fwww.remax.com.ar%2F251176-225&type=phone_number&app_absent=0


// https://api.whatsapp.com/send/?phone=543878533045&text=Hola+3878+533045%2C+te+contacto+por+la+siguiente+propiedad%3A+CASA+VENTA+TRES+CERRITOS+3+DORMITORIOS+Y+PILETA+https%3A%2F%2Fres.cloudinary.com%2Fdlxwkq6bm%2Fimage%2Fupload%2Fv1732299043%2Fve3cfp7wwvannurkgfxo.jpg&type=phone_number&app_absent=0

export const EmailTemplate = ({ message, email }) => {
  const containerStyle = {
    margin: "0 auto",
    padding: "0 1.25rem",
    marginTop: "1.25rem",
    marginBottom: "3rem",
  };

  const hrStyle = {
    marginTop: "0.625rem",
    marginBottom: "1.875rem",
    border: "1px solid #ccc",
  };

  const textStyle = {
    base: {
      fontSize: "1rem",
      marginTop: "0",
      marginBottom: "0.625rem",
    },
  };

  return (
    <Html>
      <Head />
      <Preview>Portfolio Message</Preview>
      <Body style={{ fontFamily: "sans-serif", background: "#fff" }}>
        <Container style={containerStyle}>
          <Hr style={hrStyle} />

          <Text style={textStyle.base}>
            From: <i>{email}</i>,
          </Text>
          <Text style={textStyle.base}>{message}</Text>
          <Text style={textStyle.base}>
            Sent via Contact Form @{" "}
            <a rel="noopener" href="https://eimaam.dev" target="_blank">
              eimaam.dev
            </a>
            <br />
          </Text>
          <Hr style={hrStyle} />
        </Container>
      </Body>
    </Html>
  );
};

export default EmailTemplate;
