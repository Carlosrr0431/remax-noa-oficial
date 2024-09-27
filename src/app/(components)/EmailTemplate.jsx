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