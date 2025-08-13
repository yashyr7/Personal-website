import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";
import { useMediaQuery } from "@mui/material";
import { Inconsolata } from "next/font/google";

const inconsolata = Inconsolata({ subsets: ["latin"] });

export default function Topbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const isLargeScreen = useMediaQuery("(min-width: 640px)");

  const menuItems = [
    ["Experience", "experience"],
    ["Projects", "projects"],
    ["Contact", "contact"],
  ];

  console.log(isLargeScreen);

  const handleItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <Navbar
      shouldHideOnScroll={isLargeScreen}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <a
            className={`text-[#ddd] text-inherit tracking-wider ${inconsolata.className}`}
            href="#home"
          >
            Home
          </a>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem>
          <Link
            color="foreground"
            href="#experience"
            className={`text-[#ddd] mx-4 tracking-wider ${inconsolata.className}`}
          >
            Experience
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="#projects"
            aria-current="page"
            className={`text-[#ddd] mx-4 tracking-wider ${inconsolata.className}`}
          >
            Projects
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            href="#contact"
            className={`text-[#ddd] mx-4 tracking-wider ${inconsolata.className}`}
          >
            Contact
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            href="/resume.pdf"
            className={`text-[#ddd] mx-4 tracking-wider ${inconsolata.className}`}
            target="_blank"
          >
            Resume
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className={`w-full ${inconsolata.className}`}
              href={`#${item[1]}`}
              size="lg"
              onClick={handleItemClick}
            >
              {item[0]}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
