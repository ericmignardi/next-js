import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Contact Us</h1>
      <p className="text-gray-600 mb-6">
        This form demonstrates client + server validation with Zod
      </p>
      <ContactForm />
    </div>
  );
}
