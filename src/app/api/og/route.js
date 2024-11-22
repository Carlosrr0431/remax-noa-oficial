import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontSize: 60,
          color: "black",
          background: "#f6f6f6",
          width: "100%",
          height: "100%",
          paddingTop: 50,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          width="256"
          height="256"
          src={`https://res.cloudinary.com/dlxwkq6bm/image/upload/v1732299043/ve3cfp7wwvannurkgfxo.jpg`}
          style={{
            borderRadius: 128,
          }}
        />
        <p>github.com</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
