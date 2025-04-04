
import SecuritySection from "./SecuritySection";
import FAQSection from "./FAQSection";

const AdditionalInfo = () => {
  return (
    <div className="max-w-4xl mx-auto mb-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <SecuritySection />
        <FAQSection />
      </div>
    </div>
  );
};

export default AdditionalInfo;
