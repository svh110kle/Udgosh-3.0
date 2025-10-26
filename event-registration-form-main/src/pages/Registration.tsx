import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function Registration() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    collegeName: "",
    collegeAddress: "",
    facultyInchargeName: "",
    contactNumber: "",
    email: "",
    participants: "",
    stream: "Commerce"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStreamChange = (value: string) => {
    setFormData(prev => ({ ...prev, stream: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
  // Validation
    if (!formData.collegeName || !formData.collegeAddress || !formData.facultyInchargeName || !formData.contactNumber || !formData.participants || !formData.stream) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.contactNumber.length !== 10) {
      toast.error("Please enter a valid 10-digit contact number");
      return;
    }

    if (parseInt(formData.participants) < 1) {
      toast.error("Number of participants must be at least 1");
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to Google Sheets
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxaVKcOpJkChLPsMCcMuR5Y1XNR5iWBCguyntQFQYVwaxJ0_PsXGYlE5U1DWWJDufxl2Q/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            collegeName: formData.collegeName,
            collegeAddress: formData.collegeAddress,
            facultyInchargeName: formData.facultyInchargeName,
            contactNumber: formData.contactNumber,
            email: formData.email || "Not provided",
            participants: formData.participants,
            stream: formData.stream,
            timestamp: new Date().toISOString()
          }),
        }
      );

      // With no-cors, the response is opaque; assume success if no exception
      setIsSuccess(true);
      toast.success("✅ Registration submitted! Redirecting...");
      setTimeout(() => {
        window.location.href = "https://sites.google.com/klebcadwd.com/udgosh";
      }, 2000);

    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit registration. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background with new image */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://harmless-tapir-303.convex.cloud/api/storage/2e49b013-e491-46d3-9236-28f7628802dd')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-center"
        >
          <CheckCircle2 className="w-24 h-24 text-green-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">Registration Successful!</h2>
          <p className="text-white/80">Redirecting to event page...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background with new image */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url('https://harmless-tapir-303.convex.cloud/api/storage/2e49b013-e491-46d3-9236-28f7628802dd')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* College Header Logo */}
        <div className="w-full flex justify-center pt-4 px-4">
          <motion.img
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            src="https://harmless-tapir-303.convex.cloud/api/storage/b84dbbd6-0329-4e89-a15a-e23cb3bd1769"
            alt="KLE Society's Bachelor of Computer Application"
            className="max-w-full h-auto w-full max-w-2xl object-contain"
          />
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-2xl"
          >
            <Card className="backdrop-blur-sm bg-white/95 shadow-2xl border-0">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold tracking-tight">
                  Udgosh 3.0 Event Registration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* College Name */}
                  <div className="space-y-2">
                    <Label htmlFor="collegeName" className="text-base font-medium">
                     Enter your College Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="collegeName"
                      name="collegeName"
                      type="text"
                      placeholder="Enter your college name"
                      value={formData.collegeName}
                      
                      onChange={handleInputChange}
                      required
                      className="h-11"
                    />
                  </div>

                  {/* College Address */}
                  <div className="space-y-2">
                    <Label htmlFor="collegeAddress" className="text-base font-medium">
                      Address of the College <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="collegeAddress"
                      name="collegeAddress"
                      placeholder="Enter your college address"
                      value={formData.collegeAddress}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="resize-none"
                    />
                  </div>

                  {/* Faculty Incharge Name */}
                  <div className="space-y-2">
                    <Label htmlFor="facultyInchargeName" className="text-base font-medium">
                      Name of the Faculty Incharge <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="facultyInchargeName"
                      name="facultyInchargeName"
                      type="text"
                      placeholder="Enter faculty incharge name"
                      value={formData.facultyInchargeName}
                      onChange={handleInputChange}
                      required
                      className="h-11"
                    />
                  </div>

                  {/* Contact Number */}
                  <div className="space-y-2">
                    <Label htmlFor="contactNumber" className="text-base font-medium">
                      Faculty Incharge Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="contactNumber"
                      name="contactNumber"
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      required
                      maxLength={10}
                      pattern="[0-9]{10}"
                      className="h-11"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-medium">
                      Faculty Incharge Email <span className="text-muted-foreground text-sm">(Optional)</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="h-11"
                    />
                  </div>

                  {/* Number of Participants */}
                  <div className="space-y-2">
                    <Label htmlFor="participants" className="text-base font-medium">
                      Number of Participants / Team Members <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="participants"
                      name="participants"
                      type="number"
                      placeholder="Enter number of participants"
                      value={formData.participants}
                      onChange={handleInputChange}
                      required
                      min="1"
                      className="h-11"
                    />
                  </div>

                  {/* Stream */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium">
                      Stream <span className="text-red-500">*</span>
                    </Label>
                    <RadioGroup
                      value={formData.stream}
                      onValueChange={handleStreamChange}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Commerce" id="commerce" />
                        <Label htmlFor="commerce" className="font-normal cursor-pointer">
                          Commerce
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Science" id="science" />
                        <Label htmlFor="science" className="font-normal cursor-pointer">
                          Science
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-semibold mt-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Next"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}