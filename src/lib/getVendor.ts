"use server";
import { headers } from "next/headers";
import vendors from "@/vendors.json";
import { Vendor } from "@/types";

// Create a Map for O(1) lookup instead of using .find()
const vendorMap = new Map(vendors.map((vendor) => [vendor.domain, vendor]));

export default async function getVendor(): Promise<Vendor | null> {
  const awaitedHeaders = await headers();
  const rawDomain = awaitedHeaders.get("host");

  // Early return if no domain
  if (!rawDomain) return null;

  // Decode the domain to handle potential URI-encoded characters
  const domain = decodeURIComponent(rawDomain);

  return vendorMap.get(domain) || null;
}
