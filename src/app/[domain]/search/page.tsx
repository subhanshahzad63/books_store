import { Suspense } from "react";
import { fetchBooks } from "@/lib/api-calls/fetch-books";
import SearchPageClient from "./client-page";
import SearchPageLoading from "./loading";

export const dynamic = "force-dynamic"; // Ensures dynamic rendering

interface SearchParams {
  type?: string;
  author?: string;
  title?: string;
  language?: string;
  isbn?: string;
  productGroup?: string;
  publisher?: string;
  printYear?: string;
  subject?: string;
  condition?: string;
  days?: string;
  sortBy?: string;
  page?: string;
  itemsPerPage?: string;
}
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const awaitedSearchParams = await searchParams;

  const filters = {
    type: awaitedSearchParams.type || "all",
    author: awaitedSearchParams.author || "",
    title: awaitedSearchParams.title || "",
    language: awaitedSearchParams.language || "",
    isbn: awaitedSearchParams.isbn || "",
    productGroup: awaitedSearchParams.productGroup || "",
    publisher: awaitedSearchParams.publisher || "",
    printYear: awaitedSearchParams.printYear || "",
    subject: awaitedSearchParams.subject || "",
    condition: parseInt(awaitedSearchParams.condition || "6"),
    days: parseInt(awaitedSearchParams.days || "5"),
    sortBy: awaitedSearchParams.sortBy || "author",
    page: parseInt(awaitedSearchParams.page || "1"),
    itemsPerPage: parseInt(awaitedSearchParams.itemsPerPage || "10"),
  };

  const initialData = await fetchBooks(filters);

  return (
    <Suspense fallback={<SearchPageLoading />}>
      <SearchPageClient
        initialBooks={initialData.books}
        initialTotalResults={initialData.totalResults}
        initialTotalPages={initialData.totalPages}
        initialCurrentPage={filters.page}
        initialItemsPerPage={filters.itemsPerPage}
        initialSortBy={filters.sortBy}
        initialFilters={filters}
      />
    </Suspense>
  );
}
