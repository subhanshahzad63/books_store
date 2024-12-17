/* eslint-disable @typescript-eslint/no-explicit-any */
export async function fetchBooks(filters: any) {
  try {
    const queryParams = new URLSearchParams(
      Object.fromEntries(
        Object.entries(filters).map(([k, v]) => [k, String(v)])
      )
    ).toString();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/books?${queryParams}`,
      {
        cache: "no-store", // Ensures fresh data on each request
        next: { revalidate: 0 }, // Disable static regeneration
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching books:", error);
    return {
      books: [],
      totalResults: 0,
      totalPages: 0,
      currentPage: 1,
    };
  }
}
