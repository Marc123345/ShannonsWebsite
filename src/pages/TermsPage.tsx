import { FadeIn } from '../components/animations/FadeIn';
import { GlitchText } from '../components/animations/GlitchText';

export function TermsPage() {
  return (
    <div className="min-h-screen bg-black relative">
      <section className="pt-40 pb-20 bg-black relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 md:px-12">
          <FadeIn direction="up">
            <p className="text-brand-purple text-sm font-bold tracking-widest uppercase mb-4">Legal</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter">
              <GlitchText text="TERMS OF SERVICE" intensity={6} />
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
                  <h2 className="text-3xl font-bold text-white mb-4">Agreement to Terms</h2>
                  <p className="text-neutral-400 leading-relaxed">
                    By accessing or using H2H Marketing's website and services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Use of Services</h2>
                  <h3 className="text-xl font-semibold text-white mb-3 mt-6">Eligibility</h3>
                  <p className="text-neutral-400 leading-relaxed">
                    You must be at least 18 years old to use our services. By using our services, you represent and warrant that you meet this requirement.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-6">Acceptable Use</h3>
                  <p className="text-neutral-400 leading-relaxed mb-4">
                    You agree not to:
                  </p>
                  <ul className="list-disc list-inside text-neutral-400 space-y-2 ml-4">
                    <li>Use our services for any illegal purpose</li>
                    <li>Violate any laws in your jurisdiction</li>
                    <li>Infringe upon intellectual property rights</li>
                    <li>Transmit any harmful code or malware</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Interfere with or disrupt our services</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Intellectual Property</h2>
                  <p className="text-neutral-400 leading-relaxed mb-4">
                    All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of H2H Marketing and is protected by copyright, trademark, and other intellectual property laws.
                  </p>
                  <p className="text-neutral-400 leading-relaxed">
                    You may not reproduce, distribute, modify, or create derivative works from any content without our express written permission.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Service Terms</h2>
                  <h3 className="text-xl font-semibold text-white mb-3 mt-6">Service Delivery</h3>
                  <p className="text-neutral-400 leading-relaxed">
                    We strive to provide high-quality services but do not guarantee uninterrupted or error-free operation. We reserve the right to modify or discontinue services at any time without notice.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-6">Client Responsibilities</h3>
                  <p className="text-neutral-400 leading-relaxed mb-4">
                    Clients are responsible for:
                  </p>
                  <ul className="list-disc list-inside text-neutral-400 space-y-2 ml-4">
                    <li>Providing accurate and timely information</li>
                    <li>Reviewing and approving deliverables within agreed timeframes</li>
                    <li>Making timely payments as per agreed terms</li>
                    <li>Providing necessary access and materials</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Payment Terms</h2>
                  <p className="text-neutral-400 leading-relaxed mb-4">
                    Payment terms will be specified in individual service agreements. Generally:
                  </p>
                  <ul className="list-disc list-inside text-neutral-400 space-y-2 ml-4">
                    <li>Invoices are payable within 30 days unless otherwise specified</li>
                    <li>Late payments may incur interest charges</li>
                    <li>Services may be suspended for non-payment</li>
                    <li>All prices are subject to applicable taxes</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Confidentiality</h2>
                  <p className="text-neutral-400 leading-relaxed">
                    Both parties agree to keep confidential any proprietary or sensitive information disclosed during the course of our relationship. This obligation continues even after the termination of services.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Limitation of Liability</h2>
                  <p className="text-neutral-400 leading-relaxed mb-4">
                    To the maximum extent permitted by law, H2H Marketing shall not be liable for:
                  </p>
                  <ul className="list-disc list-inside text-neutral-400 space-y-2 ml-4">
                    <li>Any indirect, incidental, or consequential damages</li>
                    <li>Loss of profits, data, or business opportunities</li>
                    <li>Any damages exceeding the amount paid for services</li>
                    <li>Issues arising from third-party services or platforms</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Indemnification</h2>
                  <p className="text-neutral-400 leading-relaxed">
                    You agree to indemnify and hold H2H Marketing harmless from any claims, damages, or expenses arising from your use of our services or violation of these terms.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Termination</h2>
                  <p className="text-neutral-400 leading-relaxed">
                    Either party may terminate services with written notice as specified in the service agreement. We reserve the right to terminate services immediately for breach of these terms. Upon termination, you must cease using our services and any materials provided.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Dispute Resolution</h2>
                  <p className="text-neutral-400 leading-relaxed">
                    Any disputes arising from these terms will be resolved through good faith negotiation. If negotiation fails, disputes will be resolved through binding arbitration in accordance with applicable arbitration rules.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Governing Law</h2>
                  <p className="text-neutral-400 leading-relaxed">
                    These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which H2H Marketing operates, without regard to its conflict of law provisions.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Changes to Terms</h2>
                  <p className="text-neutral-400 leading-relaxed">
                    We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the updated terms on this page. Your continued use of our services after such changes constitutes acceptance of the new terms.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Contact Information</h2>
                  <p className="text-neutral-400 leading-relaxed mb-4">
                    For questions about these Terms of Service, please contact us:
                  </p>
                  <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 space-y-2">
                    <p className="text-white font-semibold">H2H Marketing</p>
                    <p className="text-neutral-400">Email: legal@h2hmarketing.com</p>
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
export default TermsPage;
