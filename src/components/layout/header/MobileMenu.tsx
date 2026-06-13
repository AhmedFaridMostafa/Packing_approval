"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetDescription,
} from "@/components/ui/sheet";
import NavigationLink from "./NavigationLink";
import { useLocale } from "next-intl";

interface MobileMenuProps {
  links: LinkItem[];
  title: string;
  description?: string;
}

export function MobileMenu({ links, title, description }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const side = locale === "ar" ? "left" : "right";
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-on-surface hover:bg-accent md:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side={side} className="bg-card border-border w-80 p-6">
        <SheetHeader className="border-border mb-4 border-b pb-4">
          <SheetTitle className="text-primary font-heading text-start text-xl font-bold">
            {title}
          </SheetTitle>
          <SheetDescription className="hidden">{description}</SheetDescription>
        </SheetHeader>
        <nav className="mt-4 flex flex-col gap-1">
          {links.map(({ href, text }) => (
            <SheetClose asChild key={href}>
              <NavigationLink
                className="text-body-base text-on-surface-variant hover:text-primary hover:bg-accent [&.active]:bg-accent [&.active]:text-primary flex items-center rounded-xl px-4 py-3 transition-all duration-200 [&.active]:font-semibold"
                href={href}
              >
                {text}
              </NavigationLink>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
