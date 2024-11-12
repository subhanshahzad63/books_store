/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Search, Book as BookIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import type { Book, BookSearchProps, SearchQuery } from "@/types";
import ProductReel from "@/components/books-reel";

const BookSearch: React.FC<BookSearchProps> = ({ books }) => {
  const searchParams = useSearchParams();

  const initialSearchQuery = {
    query: searchParams.get("book") || "",
    language: searchParams.get("language") || "",
    productGroup: searchParams.get("productGroup") || "",
  };

  const [searchQuery, setSearchQuery] =
    useState<SearchQuery>(initialSearchQuery);
  const [displayedBooks, setDisplayedBooks] = useState<Book[]>(books || []);

  useEffect(() => {
    if (
      initialSearchQuery.query ||
      initialSearchQuery.language ||
      initialSearchQuery.productGroup
    ) {
      handleSearch();
    }
  }, []);

  const filteredBooks = useMemo(() => {
    if (!books) return [];

    return books.filter((book: Book) => {
      const searchLower = searchQuery.query.toLowerCase();
      const matchesQuery =
        searchQuery.query === "" ||
        book.nimi?.toLowerCase().includes(searchLower) ||
        book.tekija?.toLowerCase().includes(searchLower);

      const matchesLanguage =
        searchQuery.language === "" ||
        book.kieli?.toLowerCase() === searchQuery.language.toLowerCase();

      const matchesProductGroup =
        searchQuery.productGroup === "" ||
        book.paatuoteryhma?.toLowerCase() ===
          searchQuery.productGroup.toLowerCase();

      return matchesQuery && matchesLanguage && matchesProductGroup;
    });
  }, [books, searchQuery]);

  const uniqueLanguages = useMemo(() => {
    if (!books) return [];
    return [...new Set(books.map((book) => book.kieli).filter(Boolean))];
  }, [books]);

  const uniqueProductGroups = useMemo(() => {
    if (!books) return [];
    return [
      ...new Set(books.map((book) => book.paatuoteryhma).filter(Boolean)),
    ];
  }, [books]);

  const handleSearch = (): void => {
    setDisplayedBooks(filteredBooks);
  };

  const handleClear = (): void => {
    setSearchQuery({
      query: "",
      language: "",
      productGroup: "",
    });
    setDisplayedBooks(books || []);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof SearchQuery
  ): void => {
    setSearchQuery((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Search Section */}
      <div className="w-full min-h-[340px] h-fit bg-[#F5F5F5] rounded-2xl flex flex-col gap-y-4 p-8 md:p-4">
        <span className="text-4xl font-bold playfair-display">Hae Kirjoja</span>

        <div className="w-full h-fit flex flex-col md:flex-row gap-y-4">
          <div className="w-full md:w-[80%] min-h-[200px] h-fit grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-y-2 md:col-span-2">
              <span className="font-bold">Nimike / Kirjailija</span>
              <div className="relative">
                <input
                  value={searchQuery.query}
                  onChange={(e) => handleInputChange(e, "query")}
                  className="w-full h-[50px] bg-white rounded-lg border border-[#757575] px-4 pr-10"
                  placeholder="Hae nimikkeellä tai kirjailijalla..."
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="flex flex-col gap-y-2">
              <span className="font-bold">Kieli</span>
              <select
                value={searchQuery.language}
                onChange={(e) => handleInputChange(e, "language")}
                className="w-full h-[50px] bg-white rounded-lg border border-[#757575] px-4"
              >
                <option value="">Valitse kieli</option>
                {uniqueLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-y-2">
              <span className="font-bold">Tuoteryhmä</span>
              <select
                value={searchQuery.productGroup}
                onChange={(e) => handleInputChange(e, "productGroup")}
                className="w-full h-[50px] bg-white rounded-lg border border-[#757575] px-4"
              >
                <option value="">Valitse tuoteryhmä</option>
                {uniqueProductGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full md:w-[20%] h-[70px] md:h-[220px] md:pt-7 flex flex-col justify-between items-start md:items-center">
            <button
              onClick={handleSearch}
              className="bg-[#FFC767] px-10 w-[80%] min-w-[200px] h-[50px] mt-1 font-bold hover:bg-[#FFB647] transition-colors"
            >
              Hae
            </button>
            <button
              onClick={handleClear}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Tyhjennä haku
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold playfair-display">
            Hakutulokset ({displayedBooks.length})
          </h2>
        </div>

        <ProductReel
          books={displayedBooks as any[]}
          title="Katsotuimmat kirjat"
        />

        {displayedBooks.length === 0 && (
          <div className="w-full py-16 flex flex-col items-center justify-center text-gray-500">
            <BookIcon size={48} className="mb-4" />
            <p className="text-lg">Ei hakutuloksia</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookSearch;
