import { MercadoPagoConfig, Preference } from "mercadopago";
import { NextResponse } from "next/server";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

export async function GET() {
  return NextResponse.json("Entro al servidor");
}

export async function POST(request) {
  try {
    const datos = await request.json();

    const body = {
      items: [
        {
          title: datos.title,
          quantity: Number(1),
          unit_price: Number(datos.price),
          currency_id: "ARS",
          description: datos.description,
          category_id: datos.name,
        },
      ],

      back_urls: {
        success: "https://d0jvt1bv-3000.brs.devtunnels.ms/cursos",
        failure: "https://d0jvt1bv-3000.brs.devtunnels.ms/cursos",
        pending: "https://d0jvt1bv-3000.brs.devtunnels.ms/cursos",
      },

      auto_return: "approved",
      notification_url: "https://d0jvt1bv-3000.brs.devtunnels.ms/api/webhookCursos",
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });

    return NextResponse.json({ result });
  } catch (error) {}

  return NextResponse.json("Resultado concretado");
}
