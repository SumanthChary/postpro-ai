import { XCircle, CheckCircle, Clock, AlertCircle } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/Footer";

const CancellationPolicy = () => {
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
            <XCircle className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Cancellation Policy</h1>
          <p className="text-gray-600 text-lg">
            Cancel anytime. No hidden fees. No questions asked.
          </p>
        </div>

        <div className="space-y-8 bg-white rounded-2xl p-8 shadow-sm">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold">Easy Cancellation</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We believe in making things simple. You can cancel your PostPro AI subscription at any time, 
              for any reason, directly from your account settings. No need to contact support or explain why 
              you're leaving—though we'd love your feedback to improve!
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">How to Cancel</h2>
            <ol className="space-y-4 text-gray-700">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <div>
                  <strong className="text-gray-900">Log in to Your Account</strong>
                  <p className="text-sm mt-1">
                    Go to <a href="/profile" className="text-blue-600 hover:underline">Profile Settings</a>
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <div>
                  <strong className="text-gray-900">Navigate to Subscription</strong>
                  <p className="text-sm mt-1">
                    Click on "Subscription Details" or "Manage Plan"
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <div>
                  <strong className="text-gray-900">Cancel Subscription</strong>
                  <p className="text-sm mt-1">
                    Click "Cancel Subscription" and confirm your choice
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <div>
                  <strong className="text-gray-900">Confirmation Email</strong>
                  <p className="text-sm mt-1">
                    You'll receive an email confirming your cancellation
                  </p>
                </div>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">What Happens After Cancellation?</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-blue-900">Access Until Period End</strong>
                    <p className="text-sm text-blue-800 mt-1">
                      You'll continue to have full access to PostPro AI features until the end of your current 
                      billing period. We don't believe in cutting off access immediately—you've already paid for it!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-orange-900">No Renewals to Worry About</strong>
                    <p className="text-sm text-orange-800 mt-1">
                      PostPro AI plans are one-time purchases. If you request a cancellation or refund within the eligibility window, 
                      your access is removed immediately and no further charges occur.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Cancellation by Plan Type</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 mb-2">Post Enhancer ($2.99 one-time)</h3>
                <p className="text-sm text-gray-700">
                  Cancel within 7 days of purchase for a full refund. After 7 days, purchases are non-refundable, but you keep lifetime access.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 mb-2">Post Enhancer Plus ($4.99 one-time)</h3>
                <p className="text-sm text-gray-700">
                  Includes virality insights. Cancel within 7 days for a full refund. After that, the purchase is final and access remains active for life.
                </p>
              </div>

            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Re-activating Your Account</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Changed your mind? No problem! You can re-subscribe at any time by visiting the{" "}
              <a href="/subscription" className="text-blue-600 hover:underline">pricing page</a> and selecting 
              a plan. All your previous data and settings will be restored.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                <strong>Note:</strong> If you cancel during the 7-day money-back guarantee period and receive 
                a refund, you will need to purchase a new plan to regain access.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
            <p className="text-gray-700 leading-relaxed">
              If you're having trouble cancelling or have questions about what happens next, please contact 
              our support team at{" "}
              <a href="mailto:sumanthchary.business@gmail.com" className="text-blue-600 hover:underline">
                sumanthchary.business@gmail.com
              </a>
              . We're here to help, even if you're leaving us.
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

export default CancellationPolicy;