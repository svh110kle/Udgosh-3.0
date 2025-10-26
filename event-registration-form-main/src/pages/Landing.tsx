import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

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

        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8"
              >
                <div className="inline-block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-transparent bg-clip-text">
                  <h3 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-2">
                    Udgosh 3.0
                  </h3>
                </div>
                <p className="text-xl md:text-2xl text-white/90 font-medium">
                  Event Registration
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 font-semibold shadow-2xl hover:scale-105 transition-transform"
                  onClick={() => navigate("/register")}
                >
                  Register Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}