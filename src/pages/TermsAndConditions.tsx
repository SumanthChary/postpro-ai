
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const TermsAndConditions = () => {
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
          <h1 className="text-3xl font-bold mb-6 text-electric-purple">Terms and Conditions</h1>
          <p className="text-gray-600">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              Welcome to PostPro AI. These Terms and Conditions govern your use of our website and services. 
              By accessing or using our services, you agree to be bound by these Terms.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">2. Definitions</h2>
            <p>
              <strong>"Service"</strong> refers to PostPro AI's website and AI-powered content enhancement tools.
              <br />
              <strong>"User"</strong> refers to individuals who access or use our Service.
              <br />
              <strong>"Subscription"</strong> refers to the paid access to premium features of our Service.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">3. Service Usage</h2>
            <p>
              Our Service is designed to enhance social media content using artificial intelligence. Users are 
              granted a limited, non-exclusive, non-transferable license to use our Service for personal or 
              business purposes in accordance with these Terms.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">4. User Accounts</h2>
            <p>
              To access certain features of our Service, you may need to create an account. You are responsible 
              for maintaining the confidentiality of your account information and for all activities under your account.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">5. Subscriptions and Payments</h2>
            <p>
              We offer subscription plans that provide access to premium features. By purchasing a subscription, 
              you agree to the pricing, payment, and billing policies provided at the time of purchase.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">6. Content Rights</h2>
            <p>
              You retain all rights to the content you submit to our Service. By submitting content, you grant us 
              a license to use, modify, and process that content solely for the purpose of providing our Service to you.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">7. Prohibited Activities</h2>
            <p>
              When using our Service, you agree not to:
            </p>
            <ul className="list-disc ml-6 mt-2">
              <li>Violate any laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Submit content that is unlawful, offensive, or inappropriate</li>
              <li>Attempt to interfere with or disrupt our Service</li>
              <li>Attempt to access features or areas of our Service that you are not authorized to access</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
            <p>
              Our Service is provided "as is" without warranties of any kind. To the fullest extent permitted by law, 
              we shall not be liable for any indirect, incidental, special, consequential, or punitive damages.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify users of significant changes 
              by posting a notice on our website or sending an email to registered users.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
            <p>
              For questions about these Terms, please contact us at: 
              <a href="mailto:sumanthchary.business@gmail.com" className="text-electric-purple"> 
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

export default TermsAndConditions;
