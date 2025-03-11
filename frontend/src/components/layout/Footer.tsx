import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import Logo from "../shared/Logo";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col gap-8 py-8 md:flex-row md:py-12">
        <div className="flex-1 space-y-4">
          <Logo />
          <p className="text-sm text-muted-foreground">
            TutorLink is a platform for tutors to connect with students. It
            provides a platform for students to find tutors, and tutors to
            connect with students. It also provides a platform for tutors to
            manage their bookings and payments.
          </p>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-6 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">For Students</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/tutors"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Find a Tutor
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Explore Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">For Tutors</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/become-tutor"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Become a Tutor
                </Link>
              </li>
              <li>
                <Link
                  href="/tutor-resources"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/tutor-faq"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Tutor FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Connect</h3>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com/tutormatch"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://twitter.com/tutormatch"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://instagram.com/tutormatch"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://youtube.com/tutormatch"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container border-t py-6">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} TutorMatch. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
