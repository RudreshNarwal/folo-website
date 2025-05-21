import { ContactForm } from "@/components/ContactForm";

export default function ContactUsPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl mb-6 text-center">
          Get in Touch
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 text-center">
          Have a question or want to work together? Fill out the form below and we'll get back to you as soon as possible.
        </p>
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
