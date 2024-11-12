import type { FC } from "react";
import MaxWidthWrapper from "../max-width-wrapper";
import Link from "next/link";
import { ShoppingCard } from "../shopping-cart";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import MobileNav from "./mobile-nav";

const Header: FC = ({}) => {
  const LINKS = [
    {
      name: "ETUSIVU",
      href: "/",
    },

    {
      name: "AIHEALUEET",
      href: "/",
    },
    {
      name: "OSTAMME",
      href: "/",
    },
    {
      name: "MESSUKALENTERI",
      href: "/",
    },
    {
      name: "MYYNTIPISTEET",
      href: "/",
    },
    {
      name: "TOIMITUSEHDOT",
      href: "/",
    },
  ];
  return (
    <>
      <div className="w-full h-[160px] fixed  top-0 bg-[#FFC767] z-[10]">
        <MaxWidthWrapper className="">
          <div className="w-full h-[100px]  flex items-center justify-between ">
            <div className="w-[200px] h-[90px] bg-white"></div>

            <p className="text-xl">Ostoskori</p>
          </div>
        </MaxWidthWrapper>
        <div className="w-full min-h-[60px] h-fit bg-white shadow ">
          <MaxWidthWrapper className="h-[70px]  flex w-full items-center justify-between gap-2">
            <div className="h-full hidden xl:flex flex-grow  flex-wrap items-center justify-start gap-4">
              {LINKS.map((item) => {
                return (
                  <Link
                    key={item.name}
                    href={"/"}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "font-extrabold  hidden md:block"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <div>
              <MobileNav />
            </div>
            <ShoppingCard />
          </MaxWidthWrapper>
        </div>
      </div>
    </>
  );
};

export default Header;
