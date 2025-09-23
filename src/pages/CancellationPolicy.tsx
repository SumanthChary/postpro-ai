
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const CancellationPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft size={16} />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="prose prose-slate max-w-none">
          <h1 className="text-3xl font-bold mb-6 text-electric-blue">Cancellation and Refund Policy</h1>
          <p className="text-gray-600">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">1. Subscription Cancellation</h2>
            <p>
              You may cancel your subscription at any time. To cancel, please go to your account settings and follow 
              the cancellation process. Upon cancellation, your subscription will remain active until the end of the 
              current billing period, after which it will not renew.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">2. Access After Cancellation</h2>
            <p>
              After cancellation and until the end of your billing period, you will continue to have access to all 
              subscription features. Once the billing period ends, your account will revert to the free tier with 
              limited features.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">3. Credits After Cancellation</h2>
            <p>
              Any unused credits at the time your subscription expires will remain in your account for the duration 
              of their validity period (typically 3 months from date of purchase). Once expired, these credits will be lost.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">4. Refund Policy</h2>
            <p>
              We offer a satisfaction guarantee for our services. If you are not satisfied with your subscription, 
              you may request a refund within 14 days of your initial purchase. Subsequent subscription renewals 
              are not eligible for refunds.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">5. How to Request a Refund</h2>
            <p>
              To request a refund, please contact our support team at 
              <a href="mailto:sumanthchary.business@gmail.com" className="text-electric-blue">
                sumanthchary.business@gmail.com
              </a> with your account information and reason for the refund request. Refund requests are reviewed 
              on a case-by-case basis.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">6. Refund Processing</h2>
            <p>
              If your refund request is approved, the refund will be processed using the original payment method. 
              Depending on your payment provider, it may take 5-10 business days for the refund to appear in your account.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">7. Exceptions</h2>
            <p>
              We reserve the right to deny refund requests that we determine, in our sole discretion, to be abusive of 
              our refund policy or our services. This includes, but is not limited to, repeated subscriptions and 
              cancellations, or usage of premium features immediately followed by refund requests.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">8. Changes to this Policy</h2>
            <p>
              We may update this Cancellation and Refund Policy from time to time. Any changes will be posted on this page 
              with an updated revision date.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
            <p>
              For any questions regarding this policy, please contact us at: 
              <a href="mailto:sumanthchary.business@gmail.com" className="text-electric-blue"> 
                sumanthchary.business@gmail.com
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CancellationPolicy;
