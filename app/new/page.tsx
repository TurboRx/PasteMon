import type { Metadata } from "next";
import PasteForm from "@/components/PasteForm";

export const metadata: Metadata = {
  title: "New Paste — PasteMon",
  description: "Paste your Pokemon Showdown team export and share it with a unique link.",
};

export default function NewPastePage() {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">New Paste</h1>
        <p className="mt-2 text-dark-300">
          Paste your Pokemon Showdown team export below to preview and share it.
        </p>
      </div>
      <PasteForm />
    </div>
  );
}
