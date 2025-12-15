"use server";

import { contactFormSchema } from "@/lib/schemas/contactSchema";

export type FormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

// Server Action with Zod validation
export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Parse form data
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  // Server-side validation with Zod
  const result = contactFormSchema.safeParse(rawData);

  if (!result.success) {
    // Return validation errors
    return {
      success: false,
      message: "Validation failed",
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  // Simulate saving to database
  console.log("Form submitted:", result.data);

  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    message: "Thank you for your message!",
  };
}
