import "./globals.css";
import Nav from "./(components)/Nav";
import Header from "./(components)/Header";
import { AppWrapper } from "./(context)/AppWrapper";
import Providers from "./(providers)/Providers";
import { Toaster } from "sonner";
import WhatsApp from "./(components)/WhatsApp";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata = {
  title: "RE/MAX NOA SALTA",
  description: "Somos la RED Inmobilaria N°1 del mundo",
  manifest: "/manifest.json",

  // openGraph: {
  //   images: [
  //     {
  //       url: "/og-image.png",
  //       width: 1200,
  //       height: 630,
  //     },
  //     {
  //       url: "/og-image-square.png",
  //       width: 400,
  //       height: 400,
  //     },
  //   ],
  // }
};

export default function RootLayout({ children }) {

  return (
    <html lang="es">
      <body className="montserrat overflow-y-hidden">
        <Providers>
          <Suspense>
            <AppWrapper>
              <Nav />
              <Header />

              <main
                className={`page  text-white bg-cover bg-no-repeat font-sora overflow-y-hidden overflow-x-hidden `}
              >


                {children}
                <Toaster position="bottom-center" richColors />

                <div className="right-0 bottom-0 z-50 mb-[120px] mr-6 fixed xl:right-0 xl:bottom-0 xl:z-50 md:mb-8 md:mr-6">


                  <WhatsApp />


                </div>


              </main>

              <Analytics />
              <SpeedInsights />
            </AppWrapper>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
