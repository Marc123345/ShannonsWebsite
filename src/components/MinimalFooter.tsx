import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Accessibility } from 'lucide-react';

export function MinimalFooter() {
  const currentYear = new Date().getFullYear();
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);

  return (
    <footer className="relative bg-secondary-800 text-dominant-50 py-16 md:py-20">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 md:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">H2H</h3>
            <p className="text-secondary-200 text-sm leading-relaxed">
              Creating exceptional marketing experiences that break the mold.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-secondary-300 uppercase tracking-wider">Navigation</h4>
            <nav className="space-y-3">
              <Link to="/work" className="block text-dominant-50 hover:text-accent transition-colors">
                Work
              </Link>
              <Link to="/services" className="block text-dominant-50 hover:text-accent transition-colors">
                Services
              </Link>
              <Link to="/about" className="block text-dominant-50 hover:text-accent transition-colors">
                About
              </Link>
              <Link to="/blog" className="block text-dominant-50 hover:text-accent transition-colors">
                Blog
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-secondary-300 uppercase tracking-wider">Contact</h4>
            <div className="space-y-3 text-dominant-50">
              <p>hello@h2hmarketing.com</p>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-secondary-300 uppercase tracking-wider">Follow</h4>
            <div className="space-y-3">
              <a
                href="#"
                className="block text-dominant-50 hover:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a
                href="#"
                className="block text-dominant-50 hover:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="block text-dominant-50 hover:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-secondary-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <p className="text-secondary-200 text-sm">
              © {currentYear} H2H Marketing. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-secondary-200">
              <Link to="/privacy" className="hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-accent transition-colors">
                Terms of Service
              </Link>
              <button
                onClick={() => setIsAccessibilityOpen(true)}
                className="hover:text-accent transition-colors flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                <Accessibility className="w-4 h-4" />
                Accessibility Statement
              </button>
            </div>
          </div>

          <div className="text-secondary-300 text-xs leading-relaxed space-y-2">
            <p className="font-semibold">Accessibility Statement | הצהרת נגישות</p>
            <p>
              This website is accessible to all people, including persons with disabilities, in accordance with Israeli Standard 5568 and WCAG 2.1 Level AA guidelines.
              Features include: Full keyboard navigation, Screen reader support, Appropriate color contrast, Clear and readable text, Images with ALT descriptions, and Proper semantic structure.
            </p>
            <p>
              אתר זה נגיש לכלל האוכלוסייה כולל אנשים עם מוגבלויות, בהתאם לתקן ישראלי 5568 והנחיות WCAG 2.1 ברמת AA.
              התאמות כוללות: ניווט מלא באמצעות מקלדת, תמיכה בקוראי מסך, ניגודיות צבעים מותאמת, טקסט ברור וקריא, תמונות עם תיאורי ALT, ומבנה סמנטי נכון.
            </p>
          </div>
        </div>

        {isAccessibilityOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setIsAccessibilityOpen(false)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="footer-accessibility-title"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 id="footer-accessibility-title" className="text-2xl font-bold text-secondary-900">
                    הצהרת נגישות | Accessibility Statement
                  </h2>
                  <button
                    onClick={() => setIsAccessibilityOpen(false)}
                    className="text-secondary-600 hover:text-secondary-900 transition-colors p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6 text-secondary-800 leading-relaxed">
                  <section>
                    <h3 className="text-xl font-semibold mb-3 text-secondary-900">עברית</h3>
                    <p className="mb-3">
                      אנו ב-H2H מחויבים להנגשת האתר שלנו לכלל האוכלוסייה, כולל אנשים עם מוגבלויות.
                    </p>
                    <p className="mb-3">
                      האתר נבנה בהתאם לתקן הישראלי (ת"י 5568) ולהנחיות WCAG 2.1 ברמת AA, תוך התאמה לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ"ח-1998.
                    </p>
                    <p className="mb-3">
                      <strong>התאמות נגישות באתר:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-2 mr-4">
                      <li>ניווט מלא באמצעות מקלדת (Full keyboard navigation)</li>
                      <li>תמיכה בקוראי מסך (Screen reader support)</li>
                      <li>ניגודיות צבעים מותאמת (Appropriate color contrast)</li>
                      <li>טקסט ברור וקריא (Clear and readable text)</li>
                      <li>תמונות עם תיאורי ALT (Images with ALT descriptions)</li>
                      <li>מבנה סמנטי נכון (Proper semantic structure)</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold mb-3 text-secondary-900">English</h3>
                    <p className="mb-3">
                      We at H2H are committed to making our website accessible to all people, including persons with disabilities.
                    </p>
                    <p className="mb-3">
                      This website has been built in accordance with Israeli Standard 5568 and WCAG 2.1 Level AA guidelines, in compliance with the Equal Rights for Persons with Disabilities Law, 1998.
                    </p>
                    <p className="mb-3">
                      <strong>Accessibility features on this site:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Full keyboard navigation - Navigate the entire site using only keyboard</li>
                      <li>Screen reader support - Compatible with JAWS, NVDA, and VoiceOver</li>
                      <li>Appropriate color contrast - Text meets WCAG AA contrast ratios</li>
                      <li>Clear and readable text - Typography optimized for readability</li>
                      <li>Images with ALT descriptions - All images include descriptive text</li>
                      <li>Proper semantic structure - HTML5 semantic elements throughout</li>
                    </ul>
                  </section>

                  <section className="border-t pt-6">
                    <h3 className="text-xl font-semibold mb-3 text-secondary-900">
                      צור קשר | Contact Us
                    </h3>
                    <p className="mb-3">
                      אם נתקלתם בבעיית נגישות באתר, אנא צרו איתנו קשר ונעשה כמיטב יכולתנו לסייע.
                    </p>
                    <p className="mb-3">
                      If you encounter any accessibility issues on our site, please contact us and we will do our best to assist.
                    </p>
                    <Link
                      to="/contact"
                      className="inline-block px-6 py-3 bg-accent text-white rounded-full hover:bg-accent-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      onClick={() => setIsAccessibilityOpen(false)}
                    >
                      Contact Us | צור קשר
                    </Link>
                  </section>

                  <section className="text-sm text-secondary-600">
                    <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                  </section>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
