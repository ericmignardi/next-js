"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";
import {
  contactFormSchema,
  ContactFormData,
} from "@/lib/schemas/contactSchema";
import { submitContactForm, FormState } from "@/actions/contactActions";

// Form with client-side validation (React Hook Form + Zod)
// AND server-side validation (Server Action + Zod)
export default function ContactForm() {
  // React Hook Form with Zod resolver for CLIENT validation
  const {
    register,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  // useActionState for SERVER validation (progressive enhancement)
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    submitContactForm,
    { success: false, message: "" }
  );

  return (
    <form action={formAction} className="space-y-4 max-w-md">
      {/* Name field */}
      <div>
        <label htmlFor="name" className="block font-medium mb-1">
          Name
        </label>
        <input
          {...register("name")}
          id="name"
          name="name"
          className="w-full border p-2 rounded"
          placeholder="Your name"
        />
        {/* Client-side error */}
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
        {/* Server-side error */}
        {state.errors?.name && (
          <p className="text-red-500 text-sm mt-1">{state.errors.name[0]}</p>
        )}
      </div>

      {/* Email field */}
      <div>
        <label htmlFor="email" className="block font-medium mb-1">
          Email
        </label>
        <input
          {...register("email")}
          id="email"
          name="email"
          type="email"
          className="w-full border p-2 rounded"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
        {state.errors?.email && (
          <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>
        )}
      </div>

      {/* Message field */}
      <div>
        <label htmlFor="message" className="block font-medium mb-1">
          Message
        </label>
        <textarea
          {...register("message")}
          id="message"
          name="message"
          rows={4}
          className="w-full border p-2 rounded"
          placeholder="Your message..."
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
        {state.errors?.message && (
          <p className="text-red-500 text-sm mt-1">{state.errors.message[0]}</p>
        )}
      </div>

      {/* Submit button with loading state */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isPending ? "Sending..." : "Send Message"}
      </button>

      {/* Success/Error message */}
      {state.message && (
        <p
          className={`text-center ${
            state.success ? "text-green-600" : "text-red-600"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
