"use client";

import { useId, useState } from "react";

import { Button } from "@/components/ui";
import { cn } from "@/lib";

import { submitContactForm, type ContactPayload } from "./submitContactForm";

const EMPTY: ContactPayload = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const SUBJECTS = [
  "Пристап до финансии",
  "Грантови и кофинансирање",
  "Бизнис план или инвестициска програма",
  "Маркетинг и бизнис развој",
  "Пристап до нови пазари",
  "ESG стандардизација",
  "Друго",
];

type Errors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+0-9()\s-]{6,20}$/;

function validate(values: ContactPayload): Errors {
  const errors: Errors = {};

  if (!values.firstName.trim()) errors.firstName = "Внесете го вашето име.";
  if (!values.lastName.trim()) errors.lastName = "Внесете го вашето презиме.";
  if (!values.email.trim()) {
    errors.email = "Внесете ја вашата е-пошта.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Внесете валидна адреса на е-пошта.";
  }
  if (values.phone.trim() && !PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = "Внесете валиден телефонски број.";
  }
  if (!values.subject) errors.subject = "Изберете тема на пораката.";
  if (values.message.trim().length < 10) {
    errors.message = "Пораката треба да содржи барем 10 знаци.";
  }

  return errors;
}

const FIELD_CLASS =
  "w-full rounded-md border border-input bg-white px-4 py-2.5 text-base text-foreground placeholder:text-neutral-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

export function ContactForm() {
  const formId = useId();
  const [values, setValues] = useState<ContactPayload>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">(
    "idle",
  );
  /** Server-supplied reason for a failure, shown instead of the generic line. */
  const [formError, setFormError] = useState<string | null>(null);
  /**
   * Honeypot. Hidden from humans and from assistive tech, so anything in it
   * came from a bot filling every field it could find.
   */
  const [honeypot, setHoneypot] = useState("");

  const fieldId = (name: keyof ContactPayload) => `${formId}-${name}`;
  const errorId = (name: keyof ContactPayload) => `${formId}-${name}-error`;

  const update = (name: keyof ContactPayload, value: string) => {
    setValues((previous) => ({ ...previous, [name]: value }));
    if (errors[name]) {
      setErrors((previous) => ({ ...previous, [name]: undefined }));
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const first = Object.keys(nextErrors)[0] as keyof ContactPayload;
      document.getElementById(fieldId(first))?.focus();
      return;
    }

    setStatus("sending");
    setFormError(null);
    const result = await submitContactForm(values, honeypot);

    if (result.ok) {
      setStatus("sent");
      setValues(EMPTY);
    } else {
      setStatus("failed");
      setFormError(result.error);
    }
  };

  const describedBy = (name: keyof ContactPayload) =>
    errors[name] ? errorId(name) : undefined;

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor={fieldId("firstName")}
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Име <span aria-hidden className="text-primary">*</span>
          </label>
          <input
            id={fieldId("firstName")}
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            value={values.firstName}
            onChange={(event) => update("firstName", event.target.value)}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={describedBy("firstName")}
            placeholder="Вашето име"
            className={cn(FIELD_CLASS, errors.firstName && "border-primary")}
          />
          {errors.firstName ? (
            <p id={errorId("firstName")} className="mt-1.5 text-sm text-primary">
              {errors.firstName}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor={fieldId("lastName")}
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Презиме <span aria-hidden className="text-primary">*</span>
          </label>
          <input
            id={fieldId("lastName")}
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            value={values.lastName}
            onChange={(event) => update("lastName", event.target.value)}
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={describedBy("lastName")}
            placeholder="Вашето презиме"
            className={cn(FIELD_CLASS, errors.lastName && "border-primary")}
          />
          {errors.lastName ? (
            <p id={errorId("lastName")} className="mt-1.5 text-sm text-primary">
              {errors.lastName}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label
          htmlFor={fieldId("company")}
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Компанија
        </label>
        <input
          id={fieldId("company")}
          name="company"
          type="text"
          autoComplete="organization"
          value={values.company}
          onChange={(event) => update("company", event.target.value)}
          placeholder="Име на вашата компанија"
          className={FIELD_CLASS}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor={fieldId("email")}
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Е-пошта <span aria-hidden className="text-primary">*</span>
          </label>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            placeholder="ime@kompanija.mk"
            className={cn(FIELD_CLASS, errors.email && "border-primary")}
          />
          {errors.email ? (
            <p id={errorId("email")} className="mt-1.5 text-sm text-primary">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor={fieldId("phone")}
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Телефон
          </label>
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone")}
            placeholder="+389 7X XXX XXX"
            className={cn(FIELD_CLASS, errors.phone && "border-primary")}
          />
          {errors.phone ? (
            <p id={errorId("phone")} className="mt-1.5 text-sm text-primary">
              {errors.phone}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label
          htmlFor={fieldId("subject")}
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Тема <span aria-hidden className="text-primary">*</span>
        </label>
        <select
          id={fieldId("subject")}
          name="subject"
          required
          value={values.subject}
          onChange={(event) => update("subject", event.target.value)}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={describedBy("subject")}
          className={cn(FIELD_CLASS, errors.subject && "border-primary")}
        >
          <option value="">Изберете тема</option>
          {SUBJECTS.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        {errors.subject ? (
          <p id={errorId("subject")} className="mt-1.5 text-sm text-primary">
            {errors.subject}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor={fieldId("message")}
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Порака / прашање <span aria-hidden className="text-primary">*</span>
        </label>
        <textarea
          id={fieldId("message")}
          name="message"
          rows={5}
          required
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message")}
          placeholder="Кажете ни нешто повеќе за вашиот проект…"
          className={cn(FIELD_CLASS, "resize-y", errors.message && "border-primary")}
        />
        {errors.message ? (
          <p id={errorId("message")} className="mt-1.5 text-sm text-primary">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/*
        Honeypot. Off-screen rather than `display:none` or `type="hidden"`,
        both of which the simpler bots know to skip. `aria-hidden` plus
        `tabIndex={-1}` keeps it away from screen readers and the tab order.
      */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${formId}-website`}>Веб-страница</label>
        <input
          id={`${formId}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <Button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-md"
      >
        {status === "sending" ? "Се испраќа…" : "Испрати порака"}
      </Button>

      <p aria-live="polite" className="min-h-6 text-sm">
        {status === "sent" ? (
          <span className="text-chart-2">
            Пораката е испратена. Ќе ве контактираме во рок од 24 часа.
          </span>
        ) : null}
        {status === "failed" ? (
          <span className="text-primary">
            {formError ??
              "Пораката не беше испратена. Обидете се повторно или пишете ни на е-пошта."}
          </span>
        ) : null}
      </p>

      <p className="text-sm text-muted-foreground">
        Полињата означени со <span aria-hidden>*</span>
        <span className="sr-only">ѕвездичка</span> се задолжителни.
      </p>
    </form>
  );
}
