import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";
import { validateCorporateEmail } from "@/lib/email";

const FREE_EMAIL_RECIPIENT = "contato@sinaptech.com.br";

interface DiagnosticPayload {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  role?: string;
  segment?: string;
  teamSize?: string;
  challenges?: string[] | string;
  tools?: string;
  budget?: string;
  timeline?: string;
  context?: string;
}

function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

function normalize(payload: DiagnosticPayload) {
  const challenges = Array.isArray(payload.challenges)
    ? payload.challenges
    : typeof payload.challenges === "string" && payload.challenges
      ? payload.challenges.split("|")
      : [];

  return {
    name: payload.name?.trim() ?? "",
    email: payload.email?.trim().toLowerCase() ?? "",
    phone: payload.phone?.trim() ?? "",
    company: payload.company?.trim() ?? "",
    role: payload.role?.trim() || null,
    segment: payload.segment?.trim() ?? "",
    teamSize: payload.teamSize?.trim() ?? "",
    challenges: challenges.map((item) => item.trim()).filter(Boolean),
    tools: payload.tools?.trim() || null,
    budget: payload.budget?.trim() ?? "",
    timeline: payload.timeline?.trim() ?? "",
    context: payload.context?.trim() ?? "",
  };
}

function validate(data: ReturnType<typeof normalize>) {
  const errors: Record<string, string> = {};

  if (!data.name) errors.name = "Informe seu nome completo.";

  const emailError = validateCorporateEmail(data.email);
  if (emailError) errors.email = emailError;

  if (onlyDigits(data.phone).length < 10) {
    errors.phone = "Informe um telefone com DDD (ex.: 83 92154-9886).";
  }

  if (!data.company) errors.company = "Informe o nome da empresa ou órgão.";

  if (!data.segment) errors.segment = "Selecione seu segmento.";

  if (!data.teamSize) errors.teamSize = "Selecione o porte do seu time.";

  if (data.challenges.length === 0) {
    errors.challenges = "Selecione ao menos um desafio.";
  }

  if (!data.budget) errors.budget = "Selecione uma faixa de investimento.";

  if (!data.timeline) errors.timeline = "Selecione o prazo esperado.";

  if (data.context.length < 20) {
    errors.context =
      "Descreva o cenário em pelo menos 20 caracteres para conseguirmos avaliar.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

function buildText(data: ReturnType<typeof normalize>): string {
  return [
    "NOVO DIAGNÓSTICO GRATUITO — SINAPTECH",
    "",
    `Nome: ${data.name}`,
    `E-mail: ${data.email}`,
    `Telefone: ${data.phone}`,
    `Empresa/Órgão: ${data.company}`,
    `Cargo: ${data.role ?? "—"}`,
    `Segmento: ${data.segment}`,
    `Porte do time: ${data.teamSize}`,
    `Desafios: ${data.challenges.join(", ")}`,
    `Ferramentas hoje: ${data.tools ?? "—"}`,
    `Faixa de investimento: ${data.budget}`,
    `Prazo esperado: ${data.timeline}`,
    "",
    "Cenário:",
    data.context,
  ].join("\n");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtml(data: ReturnType<typeof normalize>): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#64748b;font:500 13px/1.4 Arial,sans-serif;">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a;font:400 14px/1.4 Arial,sans-serif;">${escapeHtml(value)}</td></tr>`;

  return `
  <div style="font:400 14px/1.6 Arial,sans-serif;color:#0f172a;">
    <p style="margin:0 0 16px;"><strong>Novo Diagnóstico Gratuito recebido pelo site.</strong></p>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
      ${row("Nome", data.name)}
      ${row("E-mail", data.email)}
      ${row("Telefone", data.phone)}
      ${row("Empresa/Órgão", data.company)}
      ${row("Cargo", data.role ?? "—")}
      ${row("Segmento", data.segment)}
      ${row("Porte do time", data.teamSize)}
      ${row("Desafios", data.challenges.join(", "))}
      ${row("Ferramentas hoje", data.tools ?? "—")}
      ${row("Faixa de investimento", data.budget)}
      ${row("Prazo esperado", data.timeline)}
    </table>
    <p style="margin:20px 0 6px;color:#64748b;font:700 12px/1 Arial,sans-serif;text-transform:uppercase;letter-spacing:.08em;">Cenário</p>
    <p style="margin:0;padding:12px 14px;background:#f1f5f9;border-radius:8px;white-space:pre-wrap;">${escapeHtml(data.context)}</p>
  </div>`;
}

async function sendEmail(data: ReturnType<typeof normalize>) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;

  if (!host) {
    console.warn("[diagnostic] SMTP_HOST ausente — e-mail não enviado.");
    return;
  }

  const port = Number(process.env.SMTP_PORT ?? 587);
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: user ? { user, pass: process.env.SMTP_PASS } : undefined,
  });

  await transporter.sendMail({
    from:
      process.env.SMTP_FROM ??
      user ??
      "site@sinaptech.com.br",
    to: process.env.DIAGNOSTIC_TO_EMAIL ?? FREE_EMAIL_RECIPIENT,
    replyTo: `"${data.name}" <${data.email}>`,
    subject: `Diagnóstico Gratuito — ${data.company} (${data.segment})`,
    text: buildText(data),
    html: buildHtml(data),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as DiagnosticPayload;
    const data = normalize(body);
    const { valid, errors } = validate(data);

    if (!valid) {
      return NextResponse.json({ ok: false, errors }, { status: 422 });
    }

    await prisma.diagnostic.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        role: data.role,
        segment: data.segment,
        teamSize: data.teamSize,
        challenges: data.challenges.join("|"),
        tools: data.tools,
        budget: data.budget,
        timeline: data.timeline,
        context: data.context,
      },
    });

    try {
      await sendEmail(data);
    } catch (error) {
      console.error("[diagnostic] falha ao enviar e-mail:", error);
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Erro ao processar requisição." },
      { status: 500 }
    );
  }
}
