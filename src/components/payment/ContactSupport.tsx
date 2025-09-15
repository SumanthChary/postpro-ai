import { Link } from "react-router-dom";

export const ContactSupport = () => {
  return (
    <div className="text-center text-muted-foreground text-sm">
      Need Help? <Link to="/contact" className="text-primary hover:underline">Contact</Link>
    </div>
  );
};