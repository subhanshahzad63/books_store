import Link from "next/link";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <MaxWidthWrapper className="flex items-center justify-center min-h-screen text-center">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg">
        <div className="flex justify-center mb-6">
          <Search className="text-primary" size={64} />
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Sivua ei löytynyt
        </h1>

        <p className="text-gray-600 mb-6">
          Valitettavasti etsimääsi sivua ei löydy. Se on ehkä poistettu tai
          siirretty toiseen paikkaan.
        </p>

        <div className="flex flex-col space-y-4">
          <Button asChild className="w-full" variant="default">
            <Link href="/">Palaa etusivulle</Link>
          </Button>

          <Button asChild className="w-full" variant="outline">
            <Link href="/search">Siirry hakuun</Link>
          </Button>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>
            Tarkista URL-osoite tai käytä yllä olevia painikkeita
            navigoidaksesi.
          </p>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
