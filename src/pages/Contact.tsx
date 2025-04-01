
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, MapPin, Phone, Send, Check } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    try {
      contactSchema.parse(formData);
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            fieldErrors[error.path[0].toString()] = error.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulating API call - in a real app, this would be a fetch call to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after a few seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-custom-bg pt-32 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-8 text-center">
          Contact Us
        </h1>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-montserrat font-semibold mb-6">Get In Touch</h2>
              <p className="text-custom-text mb-8">
                Have questions about our services? Want to learn more about how PostPro AI 
                can elevate your social media presence? We'd love to hear from you!
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-electric-purple mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-custom-text">sumanthchary.business@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-electric-purple mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-custom-text">(+1) 555-123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-electric-purple mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold">Office</h3>
                    <p className="text-custom-text">
                      123 Tech Lane, Suite 500<br />
                      San Francisco, CA 94107
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Card className="p-6">
                <h2 className="text-2xl font-montserrat font-semibold mb-6">Send Us a Message</h2>
                
                {isSuccess && (
                  <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6 flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <p className="text-green-700">Your message has been sent successfully!</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email"
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      rows={5}
                      className={errors.message ? "border-red-500" : ""}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-electric-purple hover:bg-bright-teal transition-colors"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
