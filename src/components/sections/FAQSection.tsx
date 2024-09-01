"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import BlurFade from "../animation/BlurFade";
import { Icons } from "../shared/Icons";
import MaxWidthWrapper from "../shared/MaxWidthWrapper";
import { Button } from "../ui/button";

const faqs = [
  {
    question: "How does the money-back guarantee work?",
    answer:
      "If you're not happy with the first draft of the homepage, we'll refund your deposit.",
  },
  {
    question: "How does the money-back guarantee work?",
    answer:
      "If you're not happy with the first draft of the homepage, we'll refund your deposit.",
  },
  {
    question: "What if I don’t like the designs?",
    answer:
      "If you're not happy with the first draft of the homepage, we'll refund your deposit.",
  },
  {
    question: "Can we have a quick call to see if we're a good fit?",
    answer: "Of course! You can contact us",
  },
];

const FAQSection = () => {
  return (
    <MaxWidthWrapper className="space-y-10 py-10">
      <h1 className="font-display text-2xl font-bold">
        Frequently Asked Questions
      </h1>
      <div className="space-y-5">
        {faqs.map((faq, index) => (
          <FAQCard faq={faq} key={"faq-" + index} />
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

const FAQCard = ({ faq }: { faq: (typeof faqs)[0] }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <BlurFade
      inView
      className="space-y-5 rounded-xl bg-accent px-5 py-3 transition-all md:px-10 md:py-5"
    >
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={() => setOpen((e) => !e)}
      >
        <h5 className="font-display text-xl font-bold tracking-wider text-accent-foreground/90">
          {faq.question}
        </h5>
        <motion.div
          aria-expanded={open}
          initial={{ rotate: 45 }}
          animate={{ rotate: open ? 0 : 45 }}
          transition={{ duration: 0.3 }}
        >
          <Button size="icon" variant="ghost">
            <Icons.close size={20} />
          </Button>
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.section
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut", type: "spring" }}
            className="overflow-hidden font-display text-base font-semibold tracking-wide text-accent-foreground/70 md:text-lg"
          >
            <p>{faq.answer}</p>
          </motion.section>
        )}
      </AnimatePresence>
    </BlurFade>
  );
};

export default FAQSection;
