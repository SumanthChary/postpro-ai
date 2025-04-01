
import { Ship, Box, Clock, Shield, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";

const Shipping = () => {
  return (
    <div className="min-h-screen bg-custom-bg pt-32 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-8 text-center">
          Shipping & Delivery Information
        </h1>

        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-lg text-custom-text mb-6">
            At PostPro AI, while we primarily offer digital services, we understand 
            the importance of clear information regarding our service delivery and policies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Ship className="w-8 h-8 text-electric-purple mr-3" />
              <h2 className="text-xl font-semibold">Service Delivery</h2>
            </div>
            <p className="text-custom-text">
              All our services are delivered digitally and are accessible immediately 
              after successful payment processing. There is no physical shipping involved.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Clock className="w-8 h-8 text-electric-purple mr-3" />
              <h2 className="text-xl font-semibold">Processing Time</h2>
            </div>
            <p className="text-custom-text">
              Account activations and subscription upgrades are typically processed instantly. 
              In rare cases, it might take up to 24 hours for the system to reflect changes.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Box className="w-8 h-8 text-electric-purple mr-3" />
              <h2 className="text-xl font-semibold">Digital Delivery</h2>
            </div>
            <p className="text-custom-text">
              Upon subscription, you'll gain immediate access to all features included in your plan. 
              No downloads are required as our platform is web-based.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <RefreshCw className="w-8 h-8 text-electric-purple mr-3" />
              <h2 className="text-xl font-semibold">Subscription Renewal</h2>
            </div>
            <p className="text-custom-text">
              Subscriptions are automatically renewed at the end of each billing cycle. 
              You'll receive a notification email 3 days before any renewal occurs.
            </p>
          </Card>
        </div>

        <div className="bg-light-lavender p-8 rounded-lg">
          <div className="flex items-center mb-4">
            <Shield className="w-8 h-8 text-electric-purple mr-3" />
            <h2 className="text-xl font-semibold">Our Guarantee</h2>
          </div>
          <p className="text-custom-text mb-4">
            We're committed to providing reliable and high-quality service. If you experience 
            any issues with accessing your subscription features, our support team will assist you promptly.
          </p>
          <p className="text-custom-text">
            For more details about our policies regarding service disruptions or cancellations, 
            please review our <a href="/cancellation-policy" className="text-electric-purple hover:underline">Cancellation & Refund Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
