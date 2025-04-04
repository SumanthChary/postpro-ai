
const FAQSection = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">FAQ</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
          <p className="text-gray-600">Yes, you can cancel your subscription at any time with no hidden fees.</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
          <p className="text-gray-600">We accept all major credit cards, PayPal, and Razorpay.</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Is there a trial period?</h3>
          <p className="text-gray-600">Yes, our Free Plan gives you 5 post enhancements per month.</p>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
