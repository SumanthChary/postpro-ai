import { DollarSign, Clock, CheckCircle, XCircle } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/Footer";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <Navigation
        session={null}
        username=""
        avatarUrl=""
        handleSignOut={async () => {}}
        setShowPricing={() => {}}
        setMobileMenuOpen={() => {}}
        mobileMenuOpen={false}
      />

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Refund Policy</h1>
          <p className="text-gray-600 text-lg">
            We stand behind our service with a fair refund policy
          </p>
        </div>

        <div className="space-y-8 bg-white rounded-2xl p-8 shadow-sm">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold">7-Day Money-Back Guarantee</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Every paid plan starts with a <strong>7-day money-back guarantee</strong>. Cancel before the trial ends to avoid charges, or if you
              upgrade immediately (annual or lifetime) you can request a full refund within the first 7 days—no questions asked.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> The 7-day period starts from the date of purchase, not from when you 
                first use the service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Eligible for Refunds</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900">Starter &amp; Pro subscriptions</strong>
                  <p className="text-gray-700 text-sm mt-1">
                    Cancel any time during the 7-day trial to prevent the first charge. If a charge went through accidentally, request a refund within 7 days.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900">Starter Annual &amp; Pro Annual</strong>
                  <p className="text-gray-700 text-sm mt-1">
                    Full refund if requested within 7 days of the initial annual payment.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900">Lifetime Access ($149 one-time)</strong>
                  <p className="text-gray-700 text-sm mt-1">
                    We will reverse the charge within 7 days if the product isn’t the right fit.
                  </p>
                </div>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">NOT Eligible for Refunds</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900">Credit packs (after use)</strong>
                  <p className="text-gray-700 text-sm mt-1">
                    Credits are refundable only if no credits were consumed and the request is made within 24 hours.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900">After 7 Days</strong>
                  <p className="text-gray-700 text-sm mt-1">
                    Refunds are not available after the 7-day guarantee period ends
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900">Subscription Renewals</strong>
                  <p className="text-gray-700 text-sm mt-1">
                    Recurring subscription renewals are non-refundable. Cancel before renewal to avoid charges.
                  </p>
                </div>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">How to Request a Refund</h2>
            <ol className="space-y-4 text-gray-700">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <div>
                  <strong className="text-gray-900">Contact Support</strong>
                  <p className="text-sm mt-1">
                    Email us at{" "}
                    <a href="mailto:sumanthchary.business@gmail.com" className="text-blue-600 hover:underline">
                      sumanthchary.business@gmail.com
                    </a>{" "}
                    with subject line "Refund Request"
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <div>
                  <strong className="text-gray-900">Provide Details</strong>
                  <p className="text-sm mt-1">
                    Include your account email, purchase date, and transaction ID (if available)
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <div>
                  <strong className="text-gray-900">Processing Time</strong>
                  <p className="text-sm mt-1">
                    Refunds are processed within 5-7 business days and will appear on your original payment method
                  </p>
                </div>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Special Cases</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you experience technical issues that prevent you from using the service, please contact support 
              first. We'll work to resolve the issue before processing any refund request.
            </p>
            <p className="text-gray-700 leading-relaxed">
              For disputes or exceptional circumstances, please reach out to us. We review each case individually 
              and may offer partial refunds or account credits on a case-by-case basis.
            </p>
          </section>

          <section className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RefundPolicy;