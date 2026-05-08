import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

export const prerender = false;

const SERVICE_LABELS: Record<string, string> = {
    panneaux: "Panneaux photovoltaïques",
    electricity: "Électricité",
    nettoyage: "Nettoyage BTP & Pro",
    intervention: "Intervention extrême",
    toiture: "Nettoyage de toiture",
    facade: "Nettoyage de façade",
    hydrofuge: "Hydrofuge coloré",
    autre: "Autre demande"
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value: string): string =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

const json = (status: number, body: Record<string, unknown>): Response =>
    new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" }
    });

type ContactFields = {
    civilite: string;
    firstname: string;
    commune: string;
    phone: string;
    email: string;
    serviceKey: string;
    description: string;
    honeypot: string;
};

const readFormField = (data: FormData, key: string): string => {
    const value = data.get(key);
    return typeof value === "string" ? value.trim() : "";
};

const readJsonField = (body: Record<string, unknown>, key: string): string => {
    const value = body[key];
    return typeof value === "string" ? value.trim() : "";
};

const parseFromJson = (body: Record<string, unknown>): ContactFields => ({
    civilite: readJsonField(body, "civilite"),
    firstname: readJsonField(body, "firstname") || readJsonField(body, "name"),
    commune: readJsonField(body, "commune"),
    phone: readJsonField(body, "phone"),
    email: readJsonField(body, "email"),
    serviceKey: readJsonField(body, "contact_services") || readJsonField(body, "service"),
    description: readJsonField(body, "description") || readJsonField(body, "message"),
    honeypot: readJsonField(body, "website")
});

const parseFromForm = (data: FormData): ContactFields => ({
    civilite: readFormField(data, "civilite"),
    firstname: readFormField(data, "firstname"),
    commune: readFormField(data, "commune"),
    phone: readFormField(data, "phone"),
    email: readFormField(data, "email"),
    serviceKey: readFormField(data, "contact_services"),
    description: readFormField(data, "description"),
    honeypot: readFormField(data, "website")
});

export const POST: APIRoute = async ({ request, redirect }) => {
    const contentType = request.headers.get("content-type") ?? "";
    const wantsJson = (request.headers.get("accept") ?? "").includes("application/json")
        || contentType.includes("application/json");

    let fields: ContactFields;
    if (contentType.includes("application/json")) {
        try {
            const body = await request.json() as Record<string, unknown>;
            fields = parseFromJson(body);
        } catch {
            return json(400, { error: "Requête invalide." });
        }
    } else {
        fields = parseFromForm(await request.formData());
    }

    const { civilite, firstname, commune, phone, email, serviceKey, description, honeypot } = fields;

    if (honeypot) {
        return wantsJson ? json(200, { ok: true }) : redirect("/contact?sent=1", 303);
    }

    if (!firstname || !commune || !phone || !email || !serviceKey || !description || !civilite) {
        return json(400, { error: "Champs obligatoires manquants." });
    }
    if (
        firstname.length > 120 ||
        commune.length > 120 ||
        phone.length > 40 ||
        email.length > 200 ||
        description.length > 5000
    ) {
        return json(400, { error: "Un des champs dépasse la longueur autorisée." });
    }
    if (!EMAIL_REGEX.test(email)) {
        return json(400, { error: "Adresse email invalide." });
    }

    const serviceLabel = SERVICE_LABELS[serviceKey] ?? serviceKey;

    const host = import.meta.env.SMTP_HOST;
    const portRaw = import.meta.env.SMTP_PORT;
    const user = import.meta.env.SMTP_USER;
    const pass = import.meta.env.SMTP_PASS;
    const from = import.meta.env.MAIL_FROM ?? user;
    const to = import.meta.env.MAIL_TO ?? user;

    if (!host || !portRaw || !user || !pass || !to) {
        console.error("[contact] Configuration SMTP manquante.");
        return json(500, { error: "Service d'envoi indisponible." });
    }

    const port = Number(portRaw);
    if (!Number.isFinite(port)) {
        console.error("[contact] SMTP_PORT invalide:", portRaw);
        return json(500, { error: "Service d'envoi indisponible." });
    }

    const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass }
    });

    const safe = {
        civilite: escapeHtml(civilite),
        firstname: escapeHtml(firstname),
        commune: escapeHtml(commune),
        phone: escapeHtml(phone),
        email: escapeHtml(email),
        service: escapeHtml(serviceLabel),
        description: escapeHtml(description).replace(/\r?\n/g, "<br/>")
    };

    const text = [
        `Nouvelle demande depuis le site Netara`,
        ``,
        `Service : ${serviceLabel}`,
        `Civilité : ${civilite}`,
        `Nom : ${firstname}`,
        `Commune : ${commune}`,
        `Téléphone : ${phone}`,
        `Email : ${email}`,
        ``,
        `Description :`,
        description
    ].join("\n");

    const html = `
        <h2 style="font-family:Arial,sans-serif;color:#0c0c0c;">Nouvelle demande Netara</h2>
        <p style="font-family:Arial,sans-serif;color:#0c0c0c;"><strong>Service :</strong> ${safe.service}</p>
        <p style="font-family:Arial,sans-serif;color:#0c0c0c;"><strong>Civilité :</strong> ${safe.civilite}</p>
        <p style="font-family:Arial,sans-serif;color:#0c0c0c;"><strong>Nom :</strong> ${safe.firstname}</p>
        <p style="font-family:Arial,sans-serif;color:#0c0c0c;"><strong>Commune :</strong> ${safe.commune}</p>
        <p style="font-family:Arial,sans-serif;color:#0c0c0c;"><strong>Téléphone :</strong> <a href="tel:${safe.phone}">${safe.phone}</a></p>
        <p style="font-family:Arial,sans-serif;color:#0c0c0c;"><strong>Email :</strong> <a href="mailto:${safe.email}">${safe.email}</a></p>
        <hr/>
        <p style="font-family:Arial,sans-serif;color:#0c0c0c;white-space:pre-wrap;">${safe.description}</p>
    `;

    try {
        await transporter.sendMail({
            from: `"Site Netara" <${from}>`,
            to,
            replyTo: email,
            subject: `[Netara] ${serviceLabel} – ${civilite} ${firstname}`,
            text,
            html
        });
    } catch (error) {
        console.error("[contact] Échec d'envoi:", error);
        return json(502, { error: "L'envoi a échoué, merci de réessayer plus tard." });
    }

    return wantsJson ? json(200, { ok: true }) : redirect("/contact?sent=1", 303);
};

export const GET: APIRoute = () =>
    json(405, { error: "Méthode non autorisée." });
