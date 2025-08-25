"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "../components/ui/resizable-navbar";
import { useState } from "react";
import { motion } from "framer-motion";

const mobileItemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: "easeOut", delay: 0.06 * i },
  }),
};

export function NavbarDemo() {
  const navItems = [
    { name: "About", link: "#about", id: "about" },
    { name: "Projects", link: "#projects", id: "projects" },
    { name: "Skills", link: "#skills", id: "skills" },
    { name: "Contact", link: "#contact", id: "contact" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.div
      // moved lower (mt-6 gives spacing from top)
      className="relative w-full z-50 mt-6"
      initial={{ opacity: 0, y: -16, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* transparent container */}
      <div className="bg-transparent">
        <Navbar>
          <NavBody className="h-13 text-white">
            <NavItems
              items={navItems}
              className="text-neutral-200 [&_a:hover]:text-white"
            />
          </NavBody>

          <MobileNav>
            <MobileNavHeader>
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((p) => !p)}
                className="text-neutral-200"
              />
            </MobileNavHeader>

            {/* Mobile menu still fades/staggers in */}
            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
              className="bg-transparent text-neutral-200"
            >
              {navItems.map((item, idx) => (
                <motion.a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  custom={idx}
                  variants={mobileItemVariants}
                  initial="hidden"
                  animate={isMobileMenuOpen ? "show" : "hidden"}
                  className="relative block py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileHover={{ x: 2 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </MobileNavMenu>
          </MobileNav>
        </Navbar>
      </div>
    </motion.div>
  );
}
