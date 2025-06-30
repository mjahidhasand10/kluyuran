"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "../button";

export function Header() {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    name: "English",
    flag: "🇺🇸",
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { name: "English", flag: "🇺🇸" },
    { name: "Indonesian", flag: "🇮🇩" },
    { name: "Spanish", flag: "🇪🇸" },
    { name: "French", flag: "🇫🇷" },
    { name: "German", flag: "🇩🇪" },
    { name: "Japanese", flag: "🇯🇵" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsLanguageOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLanguageSelect = (language: (typeof languages)[0]) => {
    setSelectedLanguage(language);
    setIsLanguageOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="text-white w-full absolute top-0 left-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="text-xl sm:text-2xl font-bold  flex-shrink-0">
            Kluyuran
          </div>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <a
              href="#"
              className="text-white hover:black/80 transition-colors text-sm xl:text-base"
            >
              Discover
            </a>
            <a
              href="#"
              className="text-white hover:text-white/80 transition-colors text-sm xl:text-base"
            >
              Destination
            </a>
            <a
              href="#"
              className="text-white hover:text-white/80 transition-colors text-sm xl:text-base"
            >
              Trip Plan
            </a>
            <a
              href="#"
              className="text-white hover:text-white/80 transition-colors text-sm xl:text-base"
            >
              About Us
            </a>
          </nav>

          {/* Right Side - Language & CTA */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Desktop Language Selector */}
            <div className="hidden md:block relative" ref={dropdownRef}>
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-1 sm:space-x-2  hover:text-white/80 transition-colors"
              >
                <span className="text-xs sm:text-sm">Language</span>
                <div className="flex items-center space-x-1">
                  <span className="text-sm">{selectedLanguage.flag}</span>
                  <ChevronDown
                    className={`h-3 w-3 transition-transform ${
                      isLanguageOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Desktop Dropdown Menu */}
              {isLanguageOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {languages.map((language) => (
                    <button
                      key={language.name}
                      onClick={() => handleLanguageSelect(language)}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors ${
                        selectedLanguage.name === language.name
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      <span className="text-lg">{language.flag}</span>
                      <span className="text-sm font-medium">
                        {language.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Get Started Button */}
            <Button>Get started</Button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden  hover:text-white/80 transition-colors p-1"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/20 py-4">
            <nav className="flex flex-col space-y-3">
              <a
                href="#"
                className="text-white hover:text-white/80 transition-colors py-2 text-base"
              >
                Discover
              </a>
              <a
                href="#"
                className="text-white hover:text-white/80 transition-colors py-2 text-base"
              >
                Destination
              </a>
              <a
                href="#"
                className="text-white hover:text-white/80 transition-colors py-2 text-base"
              >
                Trip Plan
              </a>
              <a
                href="#"
                className="text-white hover:text-white/80 transition-colors py-2 text-base"
              >
                About Us
              </a>

              {/* Mobile Language Selector */}
              <div className="pt-3 border-t border-white/20">
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center justify-between w-full  hover:text-white/80 transition-colors py-2"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-base">Language</span>
                    <span className="text-base">{selectedLanguage.flag}</span>
                    <span className="text-sm /80">{selectedLanguage.name}</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isLanguageOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isLanguageOpen && (
                  <div className="mt-2 space-y-1 pl-4">
                    {languages.map((language) => (
                      <button
                        key={language.name}
                        onClick={() => handleLanguageSelect(language)}
                        className={`w-full px-3 py-2 text-left flex items-center space-x-3 rounded transition-colors ${
                          selectedLanguage.name === language.name
                            ? "bg-white/20"
                            : "hover:bg-white/10"
                        }`}
                      >
                        <span className="text-lg">{language.flag}</span>
                        <span className="text-sm ">{language.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
