"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import FAQSection from "@/components/sections/FAQSection";
import { Icons } from "@/components/shared/Icons";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";

export default function ContactUs() {
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("sending");
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setFormStatus("sent");
  };

  return (
    <MaxWidthWrapper className="min-h-screen">
      <div className="relative my-10">
        <Image
          width={1152}
          height={640}
          alt="about us"
          src="/images/placeholder.png"
          className="aspect-[27/9] size-full rounded-xl object-cover"
        />
        <div className="absolute left-0 top-0 flex size-full flex-col items-center justify-center rounded-xl bg-black/30">
          <motion.h2
            className="text-center text-3xl font-bold text-white md:text-5xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Get in Touch
          </motion.h2>
        </div>
      </div>
      <main className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="mb-6 text-3xl font-semibold">Contact Information</h3>
            <div className="space-y-4">
              <p className="flex items-center">
                <Icons.mapPin className="mr-4 text-primary" />
                123 Himalayan Way, Kathmandu, Nepal
              </p>
              <p className="flex items-center">
                <Icons.mail className="mr-4 text-primary" />
                info@himalayanbodh.com
              </p>
              <p className="flex items-center">
                <Icons.phone className="mr-4 text-primary" />
                +977 1234567890
              </p>
              <p className="flex items-center">
                <Icons.clock className="mr-4 text-primary" />
                Mon-Fri: 9am-5pm (Nepal Time)
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="mb-6 text-3xl font-semibold">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your Name" required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Subject" required />
              </div>
              <div>
                <Label>Reason for Contact</Label>
                <RadioGroup defaultValue="general" className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="general" id="general" />
                    <Label htmlFor="general">General Inquiry</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="support" id="support" />
                    <Label htmlFor="support">Support</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="feedback" id="feedback" />
                    <Label htmlFor="feedback">Feedback</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your Message" required />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={formStatus === "sending" || formStatus === "sent"}
              >
                {formStatus === "idle" && (
                  <>
                    <Icons.send className="mr-2 size-4" /> Send Message
                  </>
                )}
                {formStatus === "sending" && "Sending..."}
                {formStatus === "sent" && "Message Sent!"}
                {formStatus === "error" && "Error. Please try again."}
              </Button>
            </form>
          </motion.div>
        </div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="mb-6 text-center font-display text-3xl font-semibold">
            Visit Our Store
          </h3>
          <div>
            <Image
              src="/images/placeholder.png"
              width={1980}
              height={1080}
              alt="Map goes here"
              className="aspect-[27/9] size-full rounded-xl object-cover"
            />
          </div>
        </motion.div>
      </main>
      <FAQSection />
    </MaxWidthWrapper>
  );
}
