import { FadeIn } from '../components/animations/FadeIn';
import { GlitchText } from '../components/animations/GlitchText';

export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black relative">
      <section className="pt-40 pb-20 bg-black relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 md:px-12">
          <FadeIn direction="up">
            <p className="text-brand-purple text-sm font-bold tracking-widest uppercase mb-4">Legal</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter">
              <GlitchText text="PRIVACY POLICY" intensity={6} />
            </h1>
            <div className="h-1.5 w-32 bg-gradient-to-r from-brand-purple to-brand-pink mb-8"></div>
            <p className="text-neutral-400 text-lg">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 bg-black relative">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 md:px-12">
          <FadeIn direction="up" delay={200}>
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="space-y-12">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Introduction</h2>
                  <p className="text-neutral-400 leading-relaxed">
                    H2H Marketing ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Information We Collect</h2>
                  <h3 className="text-xl font-semibold text-white mb-3 mt-6">Personal Information</h3>
                  <p className="text-neutral-400 leading-relaxed mb-4">
                    We may collect personal information that you voluntarily provide to us when you:
                  </p>
                  <ul className="list-disc list-inside text-neutral-400 space-y-2 ml-4">
                    <li>Fill out contact forms</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Request information about our services</li>
                    <li>Communicate with us via email or phone</li>
                  </ul>
                  <p className="text-neutral-400 leading-relaxed mt-4">
                    This information may include: name, email address, phone number, company name, job title, and any other information you choose to provide.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-6">Automatically Collected Information</h3>
                  <p className="text-neutral-400 leading-relaxed">
                    When you visit our website, we may automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies installed on your device. We may also collect information about your browsing behavior and interactions with our website.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">How We Use Your Information</h2>
                  <p className="text-neutral-400 leading-relaxed mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc list-inside text-neutral-400 space-y-2 ml-4">
                    <li>Respond to your inquiries and provide customer support</li>
                    <li>Send you marketing communications (with your consent)</li>
                    <li>Improve our website and services</li>
                    <li>Analyze website usage and trends</li>
                    <li>Prevent fraud and enhance security</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Information Sharing and Disclosure</h2>
                  <p className="text-neutral-400 leading-relaxed mb-4">
                    We do not sell, trade, or rent your personal information to third parties. We may share your information with:
                  </p>
                  <ul className="list-disc list-inside text-neutral-400 space-y-2 ml-4">
                    <li><strong className="text-white">Service Providers:</strong> Third-party vendors who assist us in operating our website and conducting our business</li>
                    <li><strong className="text-white">Legal Requirements:</strong> When required by law or to protect our rights</li>
                    <li><strong className="text-white">Business Transfers:</strong> In connection with any merger, sale, or acquisition of our business</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Cookies and Tracking Technologies</h2>
                  <p className="text-neutral-400 leading-relaxed">
                    We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Data Security</h2>
                  <p className="text-neutral-400 leading-relaxed">
                    We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Your Rights</h2>
                  <p className="text-neutral-400 leading-relaxed mb-4">
                    Depending on your location, you may have certain rights regarding your personal information, including:
                  </p>
                  <ul className="list-disc list-inside text-neutral-400 space-y-2 ml-4">
                    <li>The right to access your personal information</li>
                    <li>The right to correct inaccurate information</li>
                    <li>The right to delete your personal information</li>
                    <li>The right to object to or restrict processing</li>
                    <li>The right to data portability</li>
                    <li>The right to withdraw consent</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Third-Party Links</h2>
                  <p className="text-neutral-400 leading-relaxed">
                    Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Children's Privacy</h2>
                  <p className="text-neutral-400 leading-relaxed">
                    Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Changes to This Privacy Policy</h2>
                  <p className="text-neutral-400 leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Contact Us</h2>
                  <p className="text-neutral-400 leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 space-y-2">
                    <p className="text-white font-semibold">H2H Marketing</p>
                    <p className="text-neutral-400">Email: privacy@h2hmarketing.com</p>
                    <p className="text-neutral-400">Phone: (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
export default PrivacyPolicyPage;
