"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Search } from "lucide-react";
import { getAllLanguages } from "@/lib/actions/product.action";

interface FormData {
  book: string;
  author: string;
  language: string;
}

const SearchForm = (): JSX.Element => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    book: "",
    author: "",
    language: "Valitse kieli",
  });

  const [languages, setLanguages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchLanguages = async () => {
      const langs = await getAllLanguages();
      const filteredLangs = langs.filter((lang) => lang.trim() !== "");
      setLanguages(filteredLangs);
    };
    fetchLanguages();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof FormData
  ): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSearch = (): void => {
    if (isLoading) return;

    setIsLoading(true);

    const searchParams = new URLSearchParams();
    if (formData.book) searchParams.set("query", formData.book);
    if (formData.author) searchParams.set("author", formData.author);
    if (formData.language !== "Valitse kieli")
      searchParams.set("language", formData.language);

    setTimeout(() => {
      try {
        router.push(`/books?${searchParams.toString()}`);
      } catch (error) {
        console.error("Navigation error:", error);
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="w-full my-8 mx-auto bg-[#F5F5F5] py-8 rounded-2xl ">
      <div className="text-center w-full flex justify-center mb-6">
        <h2 className="text-black text-3xl font-bold playfair-display">
          PIKAHAKU
        </h2>
      </div>

      <div className="space-y-4 max-w-4xl mx-auto px-4 sm:px-8 md:px-12">
        {/* Book Input */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <label
            htmlFor="book-search"
            className="text-black font-bold text-xl sm:w-1/4 text-center sm:text-right"
          >
            Kirja
          </label>
          <input
            id="book-search"
            className="w-full sm:w-3/4 border-black bg-white border rounded-md h-10 px-3 focus:outline-none focus:ring-2 focus:ring-[#FFC767]"
            value={formData.book}
            onChange={(e) => handleInputChange(e, "book")}
            type="text"
            placeholder="Kirjan nimi"
            aria-label="Book search"
            disabled={isLoading}
          />
        </div>

        {/* Author Input */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <label
            htmlFor="author-search"
            className="text-black font-bold text-xl sm:w-1/4 text-center sm:text-right"
          >
            Kirjailija
          </label>
          <input
            id="author-search"
            className="w-full sm:w-3/4 border-black bg-white border rounded-md h-10 px-3 focus:outline-none focus:ring-2 focus:ring-[#FFC767]"
            value={formData.author}
            onChange={(e) => handleInputChange(e, "author")}
            type="text"
            placeholder="Kirjailijan nimi"
            aria-label="Author search"
            disabled={isLoading}
          />
        </div>

        {/* Language Select */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <label
            htmlFor="language-select"
            className="text-black font-bold text-xl sm:w-1/4 text-center sm:text-right"
          >
            Kieli
          </label>
          <select
            id="language-select"
            value={formData.language}
            onChange={(e) => handleInputChange(e, "language")}
            className="w-full sm:w-3/4 border-black bg-white border rounded-md h-10 px-3 focus:outline-none focus:ring-2 focus:ring-[#FFC767]"
            aria-label="Language selection"
            disabled={isLoading}
          >
            <option disabled value="Valitse kieli">
              Valitse kieli
            </option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <div className="flex justify-center sm:justify-end mt-6">
          <Button
            onClick={handleSearch}
            className="bg-[#FFC767] hover:bg-[#da9c33] w-full sm:w-auto px-6 py-3 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Haetaan...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Hae
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
