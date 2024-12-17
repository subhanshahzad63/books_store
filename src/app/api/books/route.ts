/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import getVendor from "@/lib/getVendor";
import { product } from "@/lib/modals/book.modal";

export async function GET(request: Request) {
  const url = new URL(request.url);

  // Parse query parameters with default values
  const queryParams = {
    type: url.searchParams.get("type") || "all",
    author: url.searchParams.get("author") || "",
    title: url.searchParams.get("title") || "",
    isbn: url.searchParams.get("isbn") || "",
    productGroup: url.searchParams.get("productGroup") || "",
    publisher: url.searchParams.get("publisher") || "",
    printYear: url.searchParams.get("printYear") || "",
    language: url.searchParams.get("language") || "",
    condition: parseInt(url.searchParams.get("condition") || "6"),
    days: parseInt(url.searchParams.get("days") || "5"),
    sortBy: url.searchParams.get("sortBy") || "author",
    currentPage: parseInt(url.searchParams.get("page") || "1"),
    itemsPerPage: parseInt(url.searchParams.get("itemsPerPage") || "30"),
  };

  await connectToDB();
  const vendor = await getVendor();

  // Construct the base query
  const query: any = { y_id: vendor?.antikvaari_id };

  // Add type filter
  if (queryParams.type === "new") {
    query.tila = true;
  } else if (queryParams.type === "used") {
    query.tila = false;
  }

  // Add text-based filters with case-insensitive regex
  if (queryParams.author) {
    query.tekija = { $regex: queryParams.author, $options: "i" };
  }

  if (queryParams.title) {
    query.nimi = { $regex: queryParams.title, $options: "i" };
  }

  if (queryParams.language) {
    query.kieli = { $regex: queryParams.language, $options: "i" };
  }

  // Add exact match filters
  if (queryParams.isbn) {
    query.isbn = queryParams.isbn;
  }

  if (queryParams.productGroup) {
    query.tuoteryhma = parseInt(queryParams.productGroup, 10);
  }

  if (queryParams.publisher) {
    query.kustantajaHaku = { $regex: queryParams.publisher, $options: "i" };
  }

  if (queryParams.printYear) {
    query.painovuosi = queryParams.printYear;
  }

  // Condition filter
  if (queryParams.condition !== 6) {
    query.kunto = {
      $regex: `^K${queryParams.condition}`,
      $options: "i",
    };
  }

  // Days filter
  if (queryParams.days !== 5) {
    const currentDate = new Date();
    let daysAgo: Date;

    switch (queryParams.days) {
      case 1:
        daysAgo = new Date(currentDate.getTime() - 1 * 24 * 60 * 60 * 1000);
        break;
      case 2:
        daysAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 3:
        daysAgo = new Date(currentDate.getTime() - 14 * 24 * 60 * 60 * 1000);
        break;
      case 4:
        daysAgo = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        daysAgo = new Date(0); // beginning of time
    }

    query.pvm = { $gte: daysAgo };
  }

  // Determine sort object
  const sortOptions: any = {};
  switch (queryParams.sortBy) {
    case "author":
      sortOptions.tekija = 1;
      break;
    case "title":
      sortOptions.nimi = 1;
      break;
    case "price":
      sortOptions.hinta = 1;
      break;
    default:
      sortOptions.tekija = 1;
  }

  // Perform database query with pagination
  const [totalResults, books] = await Promise.all([
    product.countDocuments(query),
    product
      .find(query)
      .sort(sortOptions)
      .skip((queryParams.currentPage - 1) * queryParams.itemsPerPage)
      .limit(queryParams.itemsPerPage),
  ]);

  // Calculate total pages
  const totalPages = Math.ceil(totalResults / queryParams.itemsPerPage);

  return NextResponse.json({
    books,
    totalResults,
    totalPages,
    currentPage: queryParams.currentPage,
    itemsPerPage: queryParams.itemsPerPage,
  });
}
