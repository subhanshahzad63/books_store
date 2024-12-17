"use client";

import { useEffect } from "react";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error
    console.error(error);
  }, [error]);

  return (
    <MaxWidthWrapper className="flex items-center justify-center min-h-screen text-center">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="text-red-500" size={64} />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Hups! Jotain meni pieleen
        </h1>

        <p className="text-gray-600 mb-6">
          Pahoittelemme, mutta sivua ladatessa tapahtui virhe. Tämä saattaa
          johtua väliaikaisesta järjestelmähäiriöstä.
        </p>

        <div className="flex flex-col space-y-4">
          <Button onClick={() => reset()} className="w-full" variant="default">
            Yritä uudelleen
          </Button>

          <Button
            onClick={() => (window.location.href = "/")}
            className="w-full"
            variant="outline"
          >
            Palaa etusivulle
          </Button>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="mt-6 text-xs text-gray-500">
            <p>Virhekoodi: {error.digest}</p>
            <p>Virheviesti: {error.message}</p>
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  );
}
