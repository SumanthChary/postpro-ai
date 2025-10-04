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
              We offer a <strong>7-day money-back guarantee</strong> for all paid plans (Starter, Professional, 
              Annual Pro). If you're not satisfied with PostPro AI within the first 7 days of your purchase, 
              we'll provide a full refund—no questions asked.
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
                  <strong className="text-gray-900">Monthly Plans (Starter & Professional)</strong>
                  <p className="text-gray-700 text-sm mt-1">
                    Full refund if requested within 7 days of purchase
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900">Annual Pro Plan</strong>
                  <p className="text-gray-700 text-sm mt-1">
                    Full refund if requested within 7 days of purchase
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900">Technical Issues</strong>
                  <p className="text-gray-700 text-sm mt-1">
                    If our service doesn't work as described due to technical problems on our end
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
                  <strong className="text-gray-900">Lifetime Creator Plan</strong>
                  <p className="text-gray-700 text-sm mt-1">
                    Due to the heavily discounted nature of this offer, lifetime plans are <strong>non-refundable</strong> 
                    after 7 days. Please make sure this plan is right for you before purchasing.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900">Credit Packs</strong>
                  <p className="text-gray-700 text-sm mt-1">
                    One-time credit purchases are non-refundable once credits have been used
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