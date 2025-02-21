
const SupportSection = () => {
  return (
    <div className="max-w-2xl mx-auto mt-16 text-center">
      <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-montserrat font-bold mb-4">Support Our Development</h3>
        <p className="text-gray-600 mb-6 font-opensans">
          Help us improve PostPro AI and bring new features by supporting our work!
        </p>
        <a
          href="https://buymeacoffee.com/sumanthcharyy"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-[#FFDD00] text-[#000000] font-semibold rounded-md hover:bg-[#FFDD00]/90 transition-colors"
        >
          <img 
            src="/lovable-uploads/76f00aba-ea4e-40ad-af9f-0bf66d3ee4d5.png" 
            alt="Buy Me a Coffee" 
            className="h-8"
          />
        </a>
      </div>
    </div>
  );
};

export default SupportSection;
