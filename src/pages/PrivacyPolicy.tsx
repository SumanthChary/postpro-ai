
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
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
          <h1 className="text-3xl font-bold mb-6 text-electric-blue">Privacy Policy</h1>
          <p className="text-gray-600">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              PostPro AI ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how 
              we collect, use, disclose, and safeguard your information when you use our website and services.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-medium mt-4 mb-2">Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide to us when you:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Create an account</li>
              <li>Subscribe to our services</li>
              <li>Contact our support team</li>
              <li>Participate in surveys or promotions</li>
            </ul>
            <p className="mt-2">This information may include:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Payment information</li>
              <li>Profile information</li>
            </ul>

            <h3 className="text-xl font-medium mt-4 mb-2">Content Information</h3>
            <p>
              When you use our services, we collect the content you submit for enhancement. This may include text, 
              images, or other media that you upload to our platform.
            </p>

            <h3 className="text-xl font-medium mt-4 mb-2">Usage Information</h3>
            <p>
              We automatically collect certain information about your device and how you interact with our services, 
              including:
            </p>
            <ul className="list-disc ml-6 mt-2">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Operating system</li>
              <li>Pages viewed and actions taken within our service</li>
              <li>Time and date of your visits</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Respond to your comments and questions</li>
              <li>Send you technical notices and updates</li>
              <li>Monitor and analyze usage patterns and trends</li>
              <li>Protect against, identify, and prevent fraud and other illegal activity</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">4. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this 
              Privacy Policy, unless a longer retention period is required by law. We will securely delete your 
              information when it is no longer needed.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information 
              against unauthorized access, disclosure, alteration, and destruction. However, no method of transmission 
              over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">6. Third-Party Services</h2>
            <p>
              We may use third-party services to help us operate our business and provide our services. These third-party 
              services may collect information about you, as governed by their respective privacy policies.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
            <p>Depending on your location, you may have rights regarding your personal information, including:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Accessing your personal information</li>
              <li>Correcting inaccurate or incomplete information</li>
              <li>Requesting deletion of your personal information</li>
              <li>Restricting or objecting to processing of your information</li>
              <li>Data portability</li>
              <li>Withdrawing consent</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, please contact us using the information provided below.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under the age of 16. We do not knowingly collect personal 
              information from children. If we learn that we have collected personal information from a child, we will 
              take steps to delete that information as quickly as possible.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">9. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at: 
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

export default PrivacyPolicy;
