/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, type FC } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getAllGroups, getAllLanguages } from "@/lib/actions/product.action";

export interface FilterType {
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

interface FilterProps {
  filters: FilterType;
  onFilterChange: <K extends keyof FilterType>(
    key: K,
    value: FilterType[K]
  ) => void;
  updateFilters: (filters: FilterType) => void;
  onClearFilters: () => void;
}

// Memoized component to prevent unnecessary re-renders
const FilterSidebar: FC<FilterProps> = ({
  filters,
  onFilterChange,
  updateFilters,
  onClearFilters,
}) => {
  const [loading, setLoading] = useState(false);
  const [languages, setLanguages] = useState<string[]>([]);
  const [groups, setGroups] = useState<{ _id: string; nimi: string }[]>([]);

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const [lang, g] = await Promise.all([
          getAllLanguages(),
          getAllGroups(),
        ]);

        setLanguages(lang.filter(Boolean));
        setGroups(g);
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };

    fetchFilterData();
  }, []); // Empty dependency array ensures this runs only once

  const handleSearch = () => {
    setLoading(true);
    try {
      updateFilters(filters);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (
    placeholder: string,
    value: string,
    onChange: (value: string) => void
  ) => (
    <input
      className="w-full h-[50px] rounded-lg border border-[#757575] px-4"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );

  return (
    <div className="w-[0] hidden xl:block xl:w-[350px] min-h-[500px] h-fit flex-shrink-0">
      {/* Type filter buttons */}
      <div className="w-full h-[45px] rounded-2xl bg-[#F0F0F0] grid grid-cols-3 overflow-hidden">
        {[
          { label: "Kaikki", type: "all" },
          { label: "Uudet", type: "new" },
          { label: "Käytetyt", type: "used" },
        ].map(({ label, type }) => (
          <button
            key={type}
            className={`w-full h-full border font-bold ${
              filters.type === type ? "bg-[#FFC767]" : "bg-transparent"
            }`}
            onClick={() =>
              type === "all"
                ? onClearFilters()
                : updateFilters({
                    ...filters,
                    type: type as FilterType["type"],
                  })
            }
          >
            {label}
          </button>
        ))}
      </div>

      {/* Search Conditions Section */}
      <div className="w-full min-h-[200px] h-fit my-8 rounded-2xl bg-[#F5F5F5] p-4">
        <div className="w-full flex flex-col gap-y-4">
          <h2 className="font-bold text-xl">Hakuehdot</h2>
          {renderInput("Tekijä", filters.author, (value) =>
            onFilterChange("author", value)
          )}
          {renderInput("Nimike", filters.title, (value) =>
            onFilterChange("title", value)
          )}
          {renderInput("ISBN", filters.isbn, (value) =>
            onFilterChange("isbn", value)
          )}

          <select
            name="productGroup"
            value={filters.productGroup}
            className="w-full h-[50px] bg-white rounded-lg border border-[#757575] px-4"
            onChange={(e) => onFilterChange("productGroup", e.target.value)}
          >
            <option value="">Valitse tuoteryhmä</option>
            {groups.map((group) => (
              <option key={group._id} value={group._id}>
                {group.nimi}
              </option>
            ))}
          </select>
        </div>

        {/* Advanced Search Section */}
        <div className="w-full flex flex-col gap-y-4 my-4">
          <h2 className="font-bold text-xl">Tarkennettu kirjahaku</h2>
          {renderInput("Kustantaja", filters.publisher, (value) =>
            onFilterChange("publisher", value)
          )}
          {renderInput("Painovuosi", filters.printYear, (value) =>
            onFilterChange("printYear", value)
          )}
          {renderInput("Aihesana", filters.subject, (value) =>
            onFilterChange("subject", value)
          )}

          <select
            name="language"
            value={filters.language}
            className="w-full h-[50px] bg-white rounded-lg border border-[#757575] px-4"
            onChange={(e) => onFilterChange("language", e.target.value)}
            id="language"
          >
            <option value="">Valitse kieli</option>
            {languages.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>

        {/* Product Condition Section */}
        <div className="w-full flex flex-col gap-y-4 my-4">
          <h2 className="font-bold text-xl">Tuotteen ominaisuudet</h2>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">
              Kuntoluokitus
            </label>
            <input
              type="range"
              min={1}
              max={6}
              value={filters.condition}
              onChange={(e) =>
                onFilterChange("condition", Number(e.target.value))
              }
              className="w-full cursor-pointer bg-[#D9D9D9] h-1 accent-[#FFC767]"
            />
            <div className="flex justify-between text-sm mt-2">
              {["K1", "K2", "K3", "K4", "K5", "Kaikki"].map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Date Range Section */}
        <div>
          <label className="block mb-2 text-sm font-medium">Päivärajaus</label>
          <input
            type="range"
            min={1}
            max={5}
            value={filters.days}
            onChange={(e) => onFilterChange("days", Number(e.target.value))}
            className="w-full cursor-pointer accent-[#FFC767]"
          />
          <div className="flex justify-between text-sm mt-2">
            {[1, 7, 14, 30, "*"].map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full h-[120px] items-center flex flex-col gap-y-2">
        <button
          className={`w-full h-[60px] ${
            loading ? "bg-gray-300" : "bg-[#FFC767]"
          } font-bold`}
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Ladataan..." : "Hae"}
        </button>
        <button className="w-full h-[60px]" onClick={onClearFilters}>
          Tyhjennä haku
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
export const FilterMobile: FC<FilterProps> = ({
  filters,
  onFilterChange,
  updateFilters,
  onClearFilters,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className=" w-[50px] h-[50px] flex items-center justify-center bg-primary px-4 text-white"
          aria-label="Open Filters"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-filter"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
        </button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <FilterSidebar
          filters={filters}
          onFilterChange={onFilterChange}
          updateFilters={updateFilters}
          onClearFilters={onClearFilters}
        />
      </SheetContent>
    </Sheet>
  );
};
