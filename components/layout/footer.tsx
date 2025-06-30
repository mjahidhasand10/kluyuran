import Link from "next/link";
import { Facebook, Phone, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200">
      {/* Main footer content */}
      <div className="bg-gray-50 px-6 py-12">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Brand and Social Icons */}
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Kluyuran
              </h2>
              <div className="flex gap-3">
                <Button className="icon">
                  <Facebook className="w-5 h-5 text-white" />
                </Button>
                <Button className="icon">
                  <Phone className="w-5 h-5 text-white" />
                </Button>
                <Button className="icon">
                  <Linkedin className="w-5 h-5 text-white" />
                </Button>
                <Button className="icon">
                  <Instagram className="w-5 h-5 text-white" />
                </Button>
              </div>
            </div>

            {/* About Column */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">About</h3>
              <div className="space-y-3">
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900 transition-colors"
                >
                  About us
                </Link>
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Destination
                </Link>
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900 transition-colors"
                >
                  News & article
                </Link>
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Testimonials
                </Link>
              </div>
            </div>

            {/* Features Column */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Features</h3>
              <div className="space-y-3">
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Payments
                </Link>
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Virtual Account
                </Link>
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Referral Bonus
                </Link>
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Go-Pay
                </Link>
              </div>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <div className="space-y-3">
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Careers
                </Link>
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Privacy & Policy
                </Link>
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900 transition-colors"
                >
                  FAQ
                </Link>
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Partners
                </Link>
              </div>
            </div>

            {/* Contact Us Column */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Contact Us</h3>
              <div className="space-y-4">
                <p className="text-gray-600">kluyuran@gmail.com</p>
                <div>
                  <p className="font-semibold text-gray-900 mb-3">
                    Get the App
                  </p>
                  <Button>Download app</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-black px-6 py-4">
        <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link
            href="#"
            className="text-white hover:text-gray-300 transition-colors"
          >
            Privacy and policy
          </Link>
          <p className="text-white text-sm">All rights reserved © VosLab.com</p>
        </div>
      </div>
    </footer>
  );
};
