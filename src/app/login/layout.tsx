'use client'

import Script from 'next/script'

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Script
        src="https://www.google.com/recaptcha/api.js"
        strategy="beforeInteractive"
      />
      {children}
    </>
  )
}
