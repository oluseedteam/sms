import React from 'react'

const Admission = () => {
  return (
    <section
      className="relative overflow-hidden px-6 py-20 sm:py-28"
      style={{ background: 'linear-gradient(135deg, #1D2E5C 0%, #3D61C2 60%, #1D2E5C 100%)' }}
    >
      {/* Decorative background circles */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white opacity-5" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-white opacity-5" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3D61C2] opacity-20 blur-3xl" />

      {/* Subtle grid texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative mx-auto max-w-3xl text-center">

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm font-medium text-white/90 tracking-wide">Enrollment Open 2025/2026</span>
        </div>

        {/* Heading */}
        <h1 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
          Admissions{' '}
          <span
            className="relative inline-block"
            style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.4)', color: 'transparent' }}
          >
            Now Open
          </span>
        </h1>

        {/* Divider accent */}
        <div className="mx-auto mb-6 flex items-center justify-center gap-2">
          <div className="h-px w-12 bg-white/30" />
          <div className="h-1.5 w-1.5 rounded-full bg-white/50" />
          <div className="h-px w-12 bg-white/30" />
        </div>

        {/* Description */}
        <p className="mx-auto mb-10 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
          Give your child the advantage of a strong academic and character foundation.
          Start your admission process today.
        </p>

        {/* Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="w-full sm:w-auto rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-[#1D2E5C] shadow-lg shadow-black/20 transition-all duration-200 hover:bg-blue-50 hover:scale-105 active:scale-95">
            Apply for Admission
          </button>
          <button className="w-full sm:w-auto rounded-xl border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:scale-105 active:scale-95">
            Speak to Admissions
          </button>
        </div>
      </div>
    </section>
  )
}

export default Admission