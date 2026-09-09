import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface NewsletterPayload {
  email: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as NewsletterPayload;
    const email = body?.email?.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "E-mail inválido." },
        { status: 422 }
      );
    }

    await prisma.newsletter.upsert({
      where: { email: email.toLowerCase() },
      update: {},
      create: { email: email.toLowerCase() },
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Erro ao processar requisição." },
      { status: 500 }
    );
  }
}
