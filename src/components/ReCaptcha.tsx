'use client'

import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    grecaptcha: any
  }
}

export function ReCaptcha() {
  const [isClient, setIsClient] = useState(false)
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const initReCaptcha = () => {
      if (isClient && divRef.current && window.grecaptcha) {
        try {
          window.grecaptcha.render(divRef.current, {
            sitekey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' // Test key
          })
        } catch (error) {
          console.error('Error rendering reCAPTCHA:', error)
        }
      }
    }

    initReCaptcha()
  }, [isClient])

  if (!isClient) {
    return <div className="h-[78px] w-[304px]" />
  }

  return (
    <div 
      ref={divRef}
      className="h-[78px] w-[304px]"
    />
  )
}

export default ReCaptcha
