/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { BookIcon } from "lucide-react";
import { fetchBooks } from "@/lib/api-calls/fetch-books";
import { useRouter } from "next/navigation";

interface SearchPageClientProps {
  initialBooks: any[];
  initialTotalResults: number;
  initialTotalPages: number;
  initialCurrentPage: number;
  initialItemsPerPage: number;
  initialSortBy: string;
  initialFilters: any;
}

export default function SearchPageClient({
  initialBooks,
  initialTotalResults,
  initialTotalPages,
  initialCurrentPage,
  initialItemsPerPage,
  initialSortBy,
  initialFilters,
}: SearchPageClientProps) {
  const router = useRouter();

  // Local state for dynamic filtering and pagination
  const [filters, setFilters] = useState(initialFilters);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);
  const [books, setBooks] = useState(initialBooks);
  const [totalResults, setTotalResults] = useState(initialTotalResults);
  const [totalPages, setTotalPages] = useState(initialTotalPages);

  const updateFilters = async (updatedFilters: any) => {
    const newFilters = { ...filters, ...updatedFilters };
    setFilters(newFilters);

    // Create query string
    const queryParams = new URLSearchParams(
      Object.fromEntries(
        Object.entries(newFilters).map(([k, v]) => [k, String(v)])
      )
    ).toString();

    // Update URL
    router.push(`/search?${queryParams}`);

    try {
      const data = await fetchBooks(newFilters);
      setBooks(data.books);
      setTotalResults(data.totalResults);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.error("Error updating filters:", error);
    }
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    updateFilters({ sortBy: newSort, page: 1 });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    updateFilters({ itemsPerPage: newItemsPerPage, page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    updateFilters({ page: newPage });
  };

  const onClearFilters = () => {
    const defaultFilters = {
      type: "all",
      author: "",
      title: "",
      language: "",
      isbn: "",
      productGroup: "",
      publisher: "",
      printYear: "",
      subject: "",
      condition: 6,
      days: 5,
      sortBy: "author",
      page: 1,
      itemsPerPage: 10,
    };

    updateFilters(defaultFilters);
  };

  // Generate page numbers to display
  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust start page if we're near the end
    if (endPage === totalPages) {
      startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <>
      <MaxWidthWrapper className="my-4 mt-[160px] pt-16">
        <h2 className="text-4xl font-bold playfair-display">Haku</h2>
      </MaxWidthWrapper>

      <MaxWidthWrapper className="my-4">
        <div className="w-full min-h-screen flex h-fit items-start justify-start">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            updateFilters={updateFilters}
            onClearFilters={onClearFilters}
          />

          <div className="w-full flex-grow min-h-[400px] h-fit">
            <div className="w-full min-h-[300px] h-fit flex flex-col gap-y-4">
              <div className="w-full h-[100px] flex justify-between space-y-2 px-4 md:px-8">
                <div className="h-full w-fit">
                  <h2 className="text-3xl md:text-5xl font-bold playfair-display">
                    Hakutulokset
                  </h2>
                  <p>
                    Haulla löytyi {totalResults} tuotetta (sivu {currentPage} /{" "}
                    {totalPages})
                  </p>
                </div>
                <FilterMobile
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  updateFilters={updateFilters}
                  onClearFilters={onClearFilters}
                />
              </div>

              <div className="flex flex-col md:flex-row items-start justify-start gap-y-2 md:items-center md:justify-between px-4 md:px-8">
                <Select value={sortBy} onValueChange={handleSortChange}>
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
                    onValueChange={(value) =>
                      handleItemsPerPageChange(parseInt(value))
                    }
                  >
                    <SelectTrigger className="w-[80px]">
                      <SelectValue placeholder={itemsPerPage.toString()} />
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
                {books.length === 0 ? (
                  <div className="w-full py-16 flex flex-col items-center justify-center text-gray-500">
                    <BookIcon size={48} className="mb-4" />
                    <p className="text-lg">Ei hakutuloksia</p>
                  </div>
                ) : (
                  <div>
                    {books.map((item) => (
                      <SearchBookCard key={item._id} book={item} />
                    ))}
                  </div>
                )}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center my-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage - 1);
                          }}
                        />
                      </PaginationItem>
                      {generatePageNumbers().map((pageNumber) => (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(pageNumber);
                            }}
                            isActive={pageNumber === currentPage}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage + 1);
                          }}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
