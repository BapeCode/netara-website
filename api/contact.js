import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

const SERVICE_LABELS = {
    panneaux: 'Panneaux photovoltaïques',
    electricity: 'Électricité',
    nettoyage: 'Nettoyage BTP & Pro',
    intervention: 'Intervention extrême',
    toiture: 'Nettoyage de toiture',
    facade: 'Nettoyage de façade',
    hydrofuge: 'Hydrofuge coloré',
    autre: 'Autre demande',
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value) =>
    value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

const field = (body, ...keys) => {
    for (const key of keys) {
        const v = body[key];
        if (typeof v === 'string') return v.trim();
    }
    return '';
};

router.post('/', async (req, res) => {
    const body = req.body ?? {};

    const civilite    = field(body, 'civilite');
    const firstname   = field(body, 'firstname', 'name');
    const commune     = field(body, 'commune');
    const phone       = field(body, 'phone');
    const email       = field(body, 'email');
    const serviceKey  = field(body, 'contact_services', 'service');
    const description = field(body, 'description', 'message');
    const honeypot    = field(body, 'website');

    if (honeypot) return res.json({ ok: true });

    if (!firstname || !commune || !phone || !email || !serviceKey || !description || !civilite) {
        return res.status(400).json({ error: 'Champs obligatoires manquants.' });
    }
    if (
        firstname.length > 120 ||
        commune.length > 120 ||
        phone.length > 40 ||
        email.length > 200 ||
        description.length > 5000
    ) {
        return res.status(400).json({ error: 'Un des champs dépasse la longueur autorisée.' });
    }
    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({ error: 'Adresse email invalide.' });
    }

    const serviceLabel = SERVICE_LABELS[serviceKey] ?? serviceKey;

    const host    = process.env.SMTP_HOST;
    const portRaw = process.env.SMTP_PORT;
    const user    = process.env.SMTP_USER;
    const pass    = process.env.SMTP_PASS;
    const from    = process.env.MAIL_FROM ?? user;
    const to      = process.env.MAIL_TO ?? user;


    if (!host || !portRaw || !user || !pass || !to) {
        console.error('[contact] Configuration SMTP manquante.');
        return res.status(500).json({ error: "Service d'envoi indisponible." });
    }

    const port = Number(portRaw);
    if (!Number.isFinite(port)) {
        console.error('[contact] SMTP_PORT invalide:', portRaw);
        return res.status(500).json({ error: "Service d'envoi indisponible." });
    }

    const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
    });

    const safe = {
        civilite:    escapeHtml(civilite),
        firstname:   escapeHtml(firstname),
        commune:     escapeHtml(commune),
        phone:       escapeHtml(phone),
        email:       escapeHtml(email),
        service:     escapeHtml(serviceLabel),
        description: escapeHtml(description).replace(/\r?\n/g, '<br/>'),
    };

    const text = [
        'Nouvelle demande depuis le site Netara',
        '',
        `Service : ${serviceLabel}`,
        `Civilité : ${civilite}`,
        `Nom : ${firstname}`,
        `Commune : ${commune}`,
        `Téléphone : ${phone}`,
        `Email : ${email}`,
        '',
        'Description :',
        description,
    ].join('\n');

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
            html,
        });
    } catch (err) {
        console.error("[contact] Échec d'envoi:", err);
        return res.status(502).json({ error: "L'envoi a échoué, merci de réessayer plus tard." });
    }

    return res.json({ ok: true });
});

router.get('/', (_req, res) => res.status(405).json({ error: 'Méthode non autorisée.' }));

export default router;
