
import { useCurrency } from "@/contexts/CurrencyContext";
import { Button } from "@/components/ui/button";

const CurrencyToggle = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="flex justify-center items-center gap-4 mb-4">
      <Button
        variant={currency === 'USD' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setCurrency('USD')}
        className={currency === 'USD' ? 'bg-electric-purple hover:bg-electric-purple/90' : ''}
      >
        USD ($)
      </Button>
      <Button
        variant={currency === 'INR' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setCurrency('INR')}
        className={currency === 'INR' ? 'bg-electric-purple hover:bg-electric-purple/90' : ''}
      >
        INR (₹)
      </Button>
    </div>
  );
};

export default CurrencyToggle;
