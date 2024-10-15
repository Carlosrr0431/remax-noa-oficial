<<<<<<< HEAD
import React from 'react'



export const EmailTemplate = ({ name, message }) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>{`
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
          }
          .header {
            background-color: #4a90e2;
            color: white;
            padding: 20px;
            text-align: center;
          }
          .content {
            padding: 20px;
            background-color: white;
          }
          .footer {
            text-align: center;
            padding: 10px;
            font-size: 0.8em;
            color: #666;
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          <div className="header">
            <h1>Important Message</h1>
          </div>
          <div className="content">
            <p>Hello {name},</p>
            <p>{message}</p>
            <p>Thank you for your attention!</p>
          </div>
          <div className="footer">
            <p>© 2023 Your Company. All rights reserved.</p>
            <p>
              <a href="[Unsubscribe Link]">Unsubscribe</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  )
}

export default EmailTemplate
=======
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
>>>>>>> 5580855 (Mensaje)
