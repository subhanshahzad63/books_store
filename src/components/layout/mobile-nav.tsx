"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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

const MobileNav = () => {
  const [isOpen, setOpen] = useState<boolean>(true);

  const toggleOpen = () => setOpen((prev) => !prev);

  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) toggleOpen();
  }, [pathname, isOpen]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          onClick={toggleOpen}
          variant="secondary"
          size="icon"
          className="border-primary border-2  bg-[#FFEEC5] xl:hidden "
        >
          <Menu className="text-black w-8 h-8" />
        </Button>
      </SheetTrigger>
      <SheetContent className="py-10 px-4">
        <div className="w-full h-screen flex flex-col items-center justify-start gap-y-4">
          <div className="w-full h-[20px] flex items-center justify-start px-2 ">
            <h2 className="font-bold text-3xl ">All the links</h2>
          </div>
          <div className="w-full h-fit flex flex-col gap-y-4">
            {LINKS.map((item) => {
              return (
                <div key={item.name} className="w-full h-[50px]  ">
                  <Button
                    className="w-full flex items-center justify-start font-bold h-14 text-black "
                    variant={"ghost"}
                  >
                    {item.name}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
