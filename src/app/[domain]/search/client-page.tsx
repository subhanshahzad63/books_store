/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import FilterSidebar, { FilterMobile } from "@/components/filter";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import SearchBookCard from "@/components/search-book-card";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

interface Book {
  _id: { $oid: string };
  nimi: string;
  tekija: string;
  isbn: string;
  kustantaja: string;
  painovuosi: string;
  kieli: string;
  kunto: string;
  paatuoteryhma: string;
  hinta: number;
  tila: boolean;
}

interface FilterState {
  type: "all" | "new" | "used";
  author: string;
  title: string;
  isbn: string;
  productGroup: string;
  publisher: string;
  printYear: string;
  subject: string;
  language: string;
  condition: number;
  days: number;
}

interface ClientPageProps {
  books: Book[];
}

export default function ClientPage({ books }: ClientPageProps) {
  const ITEMS_PER_PAGE = 30;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);
  const [sortBy, setSortBy] = useState<string>("author");

  const [filters, setFilters] = useState<FilterState>({
    type: "all",
    author: "",
    title: "",
    isbn: "",
    productGroup: "",
    publisher: "",
    printYear: "",
    subject: "",
    language: "",
    condition: 4,
    days: 14,
  });

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    // setCurrentPage(1); // Reset to first page when filters change
  };

  const handleClearFilters = () => {
    setFilters({
      type: "all",
      author: "",
      title: "",
      isbn: "",
      productGroup: "",
      publisher: "",
      printYear: "",
      subject: "",
      language: "",
      condition: 4,
      days: 14,
    });
  };

  const filterBooks = (books: Book[]) => {
    return books.filter((book) => {
      // Type filter
      if (filters?.type === "new" && book?.tila) return false;
      if (filters?.type === "used" && !book?.tila) return false;

      // Text filters (case-insensitive)
      if (
        filters.author &&
        !book?.tekija?.toLowerCase().includes(filters.author.toLowerCase())
      )
        return false;
      if (
        filters.title &&
        !book?.nimi?.toLowerCase().includes(filters.title.toLowerCase())
      )
        return false;
      if (filters?.isbn && !book?.isbn?.includes(filters.isbn)) return false;
      if (
        filters?.productGroup &&
        !book?.paatuoteryhma
          .toLowerCase()
          .includes(filters?.productGroup?.toLowerCase())
      )
        return false;
      if (
        filters?.publisher &&
        !book?.kustantaja
          ?.toLowerCase()
          ?.includes(filters?.publisher?.toLowerCase())
      )
        return false;
      if (filters?.printYear && book?.painovuosi !== filters.printYear)
        return false;
      if (
        filters?.language &&
        !book?.kieli?.toLowerCase().includes(filters?.language.toLowerCase())
      )
        return false;

      // Condition filter (K1-K5)
      const bookCondition = parseInt(book?.kunto?.replace("K", ""));
      if (bookCondition > filters?.condition) return false;

      return true;
    });
  };

  const filteredBooks = filterBooks(books);
  const TOTAL_RESULTS = filteredBooks.length;
  const TOTAL_PAGES = Math.ceil(TOTAL_RESULTS / itemsPerPage);

  // Get current page books
  const currentBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  console.log(currentBooks);

  return (
    <>
      <MaxWidthWrapper className="my-4 mt-[160px] pt-16 ">
        <h2 className="text-4xl font-bold playfair-display">Haku</h2>
      </MaxWidthWrapper>

      <MaxWidthWrapper className="my-4">
        <div className="w-full min-h-screen flex h-fit items-start justify-start">
          <FilterSidebar
            filters={filters}
            //@ts-expect-error this is an error
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />

          <div className="w-full flex-grow min-h-[400px] h-fit">
            <div className="w-full min-h-[300px] h-fit flex flex-col gap-y-4">
              <div className="w-full h-[100px] flex justify-between space-y-2 px-4 md:px-8">
                <div className="h-full w-fit">
                  <h2 className="text-3xl md:text-5xl font-bold playfair-display">
                    Hakutulokset
                  </h2>
                  <p>
                    Haulla löytyi {TOTAL_RESULTS} tuotetta (sivu {currentPage} /{" "}
                    {TOTAL_PAGES})
                  </p>
                </div>
                <FilterMobile
                  filters={filters}
                  //@ts-expect-error this is an error
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                />
              </div>

              <div className="flex flex-col md:flex-row items-start justify-start gap-y-2 md:items-center md:justify-between px-4 md:px-8">
                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value)}
                >
                  <SelectTrigger className="w-[380px]">
                    <SelectValue placeholder="Tekijän mukaan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="author">Tekijän mukaan</SelectItem>
                    <SelectItem value="title">Nimen mukaan</SelectItem>
                    <SelectItem value="price">Hinnan mukaan</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex gap-x-4 items-center">
                  <span>Tuloksia sivulla</span>
                  <Select
                    value={itemsPerPage.toString()}
                    onValueChange={(value) => {
                      setItemsPerPage(Number(value));
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="w-[80px]">
                      <SelectValue placeholder={ITEMS_PER_PAGE.toString()} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="30">30</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="w-full h-fit flex flex-col gap-y-4 px-4 md:px-8">
                {currentBooks.map((item) => (
                  <SearchBookCard key={item._id.$oid} book={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
