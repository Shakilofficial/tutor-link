import Link from "next/link";
import Logo from "../shared/Logo";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 dark:bg-orange-900/5 text-gray-700 dark:text-orange-500">
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-4">
          {/* Logo & Description */}
          <div className="space-y-4 grid-cols-2">
            <Logo />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              Connecting students with expert tutors for personalized learning.
              A platform for students to find tutors and tutors to connect with
              students.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-orange-500">
              PLATFORM
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                "Find Tutors",
                "Browse Subjects",
                "How It Works",
                "Pricing",
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-orange-500">
              COMPANY
            </h3>
            <ul className="space-y-3 text-sm">
              {["About Us", "Careers", "Blog", "Contact"].map((item, index) => (
                <li key={index}>
                  <Link
                    href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-orange-500">
              LEGAL
            </h3>
            <ul className="space-y-3 text-sm">
              {["Terms of Service", "Privacy Policy", "Cookie Policy"].map(
                (item, index) => (
                  <li key={index}>
                    <Link
                      href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-gray-600 dark:text-gray-400 hover:text-primary transition"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 dark:border-gray-700 mt-10 pt-6 text-center text-sm">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} TutorLink. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
