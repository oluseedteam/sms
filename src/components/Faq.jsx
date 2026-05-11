import React, { useState } from 'react'
import { FaDotCircle } from 'react-icons/fa'
import { FiChevronDown } from 'react-icons/fi';
import { motion } from "motion/react";

const faqs = [
  {
    question: "What curriculum do you offer?",
    answer:
      "We offer a blend of Nigerian and international curriculum designed to prepare students for global opportunities.",
  },
  {
    question: "Do you provide extracurricular activities?",
    answer:
      "Yes, we provide sports, arts, coding, music, and leadership programs for holistic development.",
  },
  {
    question: "How can I enroll my child?",
    answer:
      "You can enroll by filling out the admission form on our website or visiting our school campus.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-20 sm:py-28"
      initial={{ opacity: 0, x: -100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
    >

      {/* Background decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-100 opacity-40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-100 opacity-40 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">

        {/* Top label */}
        <div className="mb-12 flex flex-col items-start gap-2 sm:items-center sm:text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#3657C3]/30 bg-[#3657C3]/8 px-4 py-1.5 text-sm font-semibold text-[#3657C3]">
            <FaDotCircle className="text-xs" />
            <span>FAQs</span>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-20">

          {/* Left — sticky on large screens */}
          <div className="lg:sticky lg:top-24 lg:w-2/5 lg:shrink-0">
            <h2 className="mb-5 text-4xl font-medium leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Frequently <br className="hidden sm:block" />
              <span className="text-[#3657C3]">Asked</span> Questions
            </h2>
            <p className="max-w-sm text-base leading-7 text-slate-500">
              Have questions about our school? We've gathered the most common ones here. Can't find what you're looking for? Feel free to reach out.
            </p>

            {/* Decorative line accent */}
            <div className="mt-8 flex items-center gap-3">
              <div className="h-1 w-10 rounded-full bg-[#3657C3]" />
              <div className="h-1 w-4 rounded-full bg-[#3657C3]/40" />
              <div className="h-1 w-2 rounded-full bg-[#3657C3]/20" />
            </div>

            {/* CTA */}
            <div className="mt-10 rounded-2xl border border-[#3657C3]/15 bg-white/70 p-6 shadow-sm backdrop-blur-sm">
              <p className="text-sm font-semibold text-slate-700">Still have questions?</p>
              <p className="mt-1 text-sm text-slate-500">Our admissions team is happy to help you.</p>
              <button className="mt-4 rounded-xl bg-[#3657C3] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#3657C3]/20 transition-all duration-200 hover:bg-[#2a45a8] hover:shadow-lg hover:shadow-[#3657C3]/30 active:scale-95">
                Contact Us
              </button>
            </div>
          </div>

          {/* Right — FAQ accordion */}
          <div className="flex-1 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`group rounded-2xl border bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-300 ${isOpen
                      ? 'border-[#3657C3]/30 shadow-md shadow-[#3657C3]/10'
                      : 'border-slate-200/80 hover:border-[#3657C3]/20 hover:shadow-md'
                    }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  >
                    {/* Index + question */}
                    <div className="flex items-center gap-4">
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors duration-300 ${isOpen
                          ? 'bg-[#3657C3] text-white'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-[#3657C3]/10 group-hover:text-[#3657C3]'
                        }`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className={`text-base font-semibold leading-snug transition-colors duration-200 ${isOpen ? 'text-[#3657C3]' : 'text-slate-800'
                        }`}>
                        {faq.question}
                      </span>
                    </div>

                    {/* Chevron */}
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen
                        ? 'bg-[#3657C3]/10 text-[#3657C3] rotate-180'
                        : 'bg-slate-100 text-slate-400 group-hover:bg-[#3657C3]/10 group-hover:text-[#3657C3]'
                      }`}>
                      <FiChevronDown className="text-base" />
                    </span>
                  </button>

                  {/* Answer with smooth transition */}
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                    <div className="flex gap-4 border-t border-slate-100 px-6 py-5">
                      <div className="mt-0.5 h-full w-0.5 shrink-0 self-stretch rounded-full bg-[#3657C3]/20" />
                      <p className="text-sm leading-7 text-slate-500">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Faq
