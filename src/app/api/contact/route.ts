import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateCorporateEmail } from "@/lib/email";

interface ContactPayload {
  name: string;
  email: string;
  need: string;
}

function validate(payload: unknown): {
  valid: boolean;
  errors: Record<string, string>;
} {
  const data = payload as ContactPayload;
  const errors: Record<string, string> = {};

  if (!data?.name?.trim()) {
    errors.name = "Informe seu nome completo.";
  }

  const email = data?.email?.trim() ?? "";
  const emailError = validateCorporateEmail(email);
  if (emailError) {
    errors.email = emailError;
  }

  if (!data?.need) {
    errors.need = "Selecione seu objetivo principal.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { valid, errors } = validate(body);

    if (!valid) {
      return NextResponse.json({ ok: false, errors }, { status: 422 });
    }

    await prisma.contact.create({
      data: {
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
        need: body.need,
      },
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Erro ao processar requisição." },
      { status: 500 }
    );
  }
}
