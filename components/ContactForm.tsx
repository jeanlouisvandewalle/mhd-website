"use client";

import Link from "next/link";
import { cloneElement, useRef, useState } from "react";
import { Arrow } from "./Logo";
import { site } from "@/content/site";

type Values = { naam: string; email: string; telefoon: string; bericht: string };
type Errors = Partial<Record<keyof Values, string>>;
type Status = "idle" | "sending" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.naam.trim().length < 2) e.naam = "Vul je naam in.";
  if (!v.email.trim()) e.email = "Vul je e-mailadres in.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Dit e-mailadres lijkt niet te kloppen.";
  if (v.telefoon.trim() && !/^[+()\d\s./-]{8,20}$/.test(v.telefoon.trim())) e.telefoon = "Dit telefoonnummer lijkt niet te kloppen.";
  if (v.bericht.trim().length < 10) e.bericht = "Vertel ons kort waarover het gaat.";
  return e;
}

export function ContactForm() {
  const [values, setValues] = useState<Values>({ naam: "", email: "", telefoon: "", bericht: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const startedAt = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);
  const endpoint = site.formEndpoint;

  const update = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!startedAt.current) startedAt.current = Date.now();
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (touched) setErrors(validate(next));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched(true);
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const honey = (formRef.current?.elements.namedItem("_honey") as HTMLInputElement | null)?.value;
    const tooFast = startedAt.current && Date.now() - startedAt.current < 2500;
    if (honey) {
      // Waarschijnlijk een bot: niets versturen.
      setStatus("success");
      return;
    }
    if (tooFast || !endpoint) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          Naam: values.naam.trim(),
          email: values.email.trim(),
          Telefoon: values.telefoon.trim() || "—",
          Bericht: values.bericht.trim(),
          _subject: "Nieuwe aanvraag via de website",
          _template: "table",
          _captcha: "false",
        }),
      });
      const data = await res.json().catch(() => ({}));
      // Alleen een bevestigd geslaagde verzending telt als verzonden.
      if (res.ok && (data.success === true || data.success === "true")) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="border-t border-accent pt-8">
        <p className="t-h2">Bedankt.</p>
        <p className="t-lead text-grey mt-4">Je bericht is verzonden. We nemen zo snel mogelijk contact met je op.</p>
      </div>
    );
  }

  const invalid = touched && Object.keys(errors).length > 0;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-10" aria-describedby="form-hint">
      <p id="form-hint" className="t-small text-grey">Velden met * zijn verplicht.</p>

      <div className="grid gap-10 md:grid-cols-2">
        <Field id="naam" label="Naam *" error={errors.naam}>
          <input id="naam" name="naam" type="text" autoComplete="name" required value={values.naam} onChange={update("naam")} />
        </Field>
        <Field id="email" label="E-mailadres *" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" inputMode="email" required value={values.email} onChange={update("email")} />
        </Field>
      </div>
      <Field id="telefoon" label="Telefoonnummer" error={errors.telefoon}>
        <input id="telefoon" name="telefoon" type="tel" autoComplete="tel" inputMode="tel" value={values.telefoon} onChange={update("telefoon")} />
      </Field>
      <Field id="bericht" label="Bericht *" error={errors.bericht}>
        <textarea id="bericht" name="bericht" rows={5} required value={values.bericht} onChange={update("bericht")} />
      </Field>

      {/* Honeypot tegen spam — onzichtbaar voor bezoekers */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="_honey">Laat dit veld leeg</label>
        <input id="_honey" name="_honey" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-6">
        <button type="submit" className="btn-text group" disabled={status === "sending"}>
          <span>{status === "sending" ? "Bezig met verzenden…" : "Verstuur bericht"}</span>
          <Arrow />
        </button>

        <div aria-live="polite" className="t-small">
          {invalid ? <p>Controleer de gemarkeerde velden.</p> : null}
          {status === "error" ? (
            <p>
              Je bericht kon niet worden verzonden. Probeer het opnieuw, of mail ons rechtstreeks via{" "}
              <a href={`mailto:${site.email}`} className="underline underline-offset-4">{site.email}</a>.
            </p>
          ) : null}
        </div>

        <p className="t-small text-grey max-w-md">
          We gebruiken je gegevens enkel om je vraag te beantwoorden. Lees meer in ons{" "}
          <Link href="/privacy/" className="underline underline-offset-4">privacybeleid</Link>.
        </p>
      </div>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactElement<React.InputHTMLAttributes<HTMLInputElement>> }) {
  const errId = `${id}-error`;
  const enhanced = cloneElement(children, {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errId : undefined,
  });
  return (
    <div className="field" data-invalid={error ? "true" : undefined}>
      <label htmlFor={id}>{label}</label>
      {enhanced}
      {error ? <p id={errId} className="error">{error}</p> : null}
    </div>
  );
}
