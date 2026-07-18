import { useEffect, useRef, useState } from "react"
import type { FormEvent } from "react"

import styles from "./chat-section.module.css"

import { Button } from "@components/button"
import { Input } from "@components/input"
import { Label } from "@components/label"

const contactEmailAddress = "hello@jurgenbaldacchino.com"
const formspreeEndpoint = "https://formspree.io/f/mzdnrraj"
const turnstileScriptId = "cloudflare-turnstile-script"
const turnstileScriptSource =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
const getTurnstileSiteKey = () => import.meta.env.VITE_TURNSTILE_SITE_KEY

interface ITurnstileOptions {
  callback: () => void
  "error-callback": () => void
  "expired-callback": () => void
  sitekey: string
  size: "flexible"
  theme: "dark"
}

interface ITurnstileApi {
  remove: (widgetId: string) => void
  render: (container: HTMLElement, options: ITurnstileOptions) => string
  reset: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: ITurnstileApi
  }
}

enum SubmissionStatus {
  IDLE = "idle",
  SUBMITTING = "submitting",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}

enum TurnstileStatus {
  CHECKING = "checking",
  VERIFIED = "verified",
  ERROR = "error",
}

const loadTurnstile = () => {
  if (window.turnstile) {
    return Promise.resolve(window.turnstile)
  }

  return new Promise<ITurnstileApi>((resolve, reject) => {
    const existingScript = document.getElementById(turnstileScriptId) as HTMLScriptElement | null
    const script: HTMLScriptElement = existingScript ?? document.createElement("script")

    const handleLoad = () => {
      if (window.turnstile) {
        resolve(window.turnstile)
        return
      }

      reject(new Error("Cloudflare Turnstile did not initialise"))
    }

    script.addEventListener("load", handleLoad, { once: true })
    script.addEventListener(
      "error",
      () => reject(new Error("Cloudflare Turnstile failed to load")),
      {
        once: true,
      },
    )

    if (!existingScript) {
      script.id = turnstileScriptId
      script.src = turnstileScriptSource
      script.async = true
      script.defer = true
      document.head.append(script)
    }
  })
}

export const ChatSection = () => {
  const [submissionStatus, setSubmissionStatus] = useState(SubmissionStatus.IDLE)
  const [turnstileStatus, setTurnstileStatus] = useState(TurnstileStatus.CHECKING)
  const turnstileContainerReference = useRef<HTMLDivElement>(null)
  const turnstileWidgetReference = useRef<string | null>(null)
  const isSubmitting = submissionStatus === SubmissionStatus.SUBMITTING
  const isVerified = turnstileStatus === TurnstileStatus.VERIFIED

  useEffect(() => {
    const container = turnstileContainerReference.current
    let isMounted = true

    if (!container) {
      return
    }

    loadTurnstile()
      .then((turnstile) => {
        if (!isMounted) {
          return
        }

        turnstileWidgetReference.current = turnstile.render(container, {
          callback: () => setTurnstileStatus(TurnstileStatus.VERIFIED),
          "error-callback": () => setTurnstileStatus(TurnstileStatus.ERROR),
          "expired-callback": () => setTurnstileStatus(TurnstileStatus.CHECKING),
          sitekey: getTurnstileSiteKey(),
          size: "flexible",
          theme: "dark",
        })
      })
      .catch(() => {
        if (isMounted) {
          setTurnstileStatus(TurnstileStatus.ERROR)
        }
      })

    return () => {
      isMounted = false

      if (turnstileWidgetReference.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetReference.current)
        turnstileWidgetReference.current = null
      }
    }
  }, [])

  const resetTurnstile = () => {
    if (turnstileWidgetReference.current && window.turnstile) {
      window.turnstile.reset(turnstileWidgetReference.current)
    }

    setTurnstileStatus(TurnstileStatus.CHECKING)
  }

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting || !isVerified) {
      return
    }

    const contactForm = event.currentTarget
    const formData = new FormData(contactForm)
    setSubmissionStatus(SubmissionStatus.SUBMITTING)

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Formspree rejected the contact form submission")
      }

      contactForm.reset()
      setSubmissionStatus(SubmissionStatus.SUCCEEDED)
    } catch {
      setSubmissionStatus(SubmissionStatus.FAILED)
    } finally {
      resetTurnstile()
    }
  }

  return (
    <section aria-labelledby="chat-section-title" className={styles.containerWrapper} id="contact">
      <div className={styles.introductionContainer}>
        <p className={styles.eyebrow}>Let&apos;s chat</p>
        <h2 id="chat-section-title">Have an idea? Let&apos;s build it together.</h2>
        <p className={styles.introductionCopy}>
          Whether you&apos;re shaping a product, growing a frontend team or exploring something new,
          share a few details and let&apos;s start a conversation.
        </p>
        <p className={styles.directContactCopy}>
          Prefer email? Reach me directly at
          <a href={`mailto:${contactEmailAddress}`}>{contactEmailAddress}</a>
        </p>
      </div>

      <form className={styles.contactForm} onSubmit={handleContactSubmit}>
        <Input
          autoComplete="name"
          id="contact-full-name"
          label="Full name"
          name="fullName"
          placeholder="Your full name"
          required
        />
        <Input
          autoComplete="email"
          id="contact-email-address"
          label="Email address"
          name="email"
          placeholder="you@example.com"
          required
          type="email"
        />
        <div className={styles.messageFieldContainer}>
          <Label htmlFor="contact-message" required>
            Message
          </Label>
          <textarea
            className={styles.messageInput}
            id="contact-message"
            name="message"
            placeholder="Tell me a little about your idea, product or team."
            required
            rows={6}
          ></textarea>
        </div>
        <div
          className={styles.turnstileContainer}
          ref={turnstileContainerReference}
          aria-label="Spam protection"
        ></div>
        {turnstileStatus === TurnstileStatus.CHECKING && (
          <p className={styles.turnstileStatusMessage} id="turnstile-status" role="status">
            Checking that you&apos;re human…
          </p>
        )}
        {turnstileStatus === TurnstileStatus.ERROR && (
          <p className={styles.submissionErrorMessage} id="turnstile-status" role="alert">
            Spam protection could not load. Please refresh the page or use the direct email link.
          </p>
        )}
        <Button
          aria-describedby={isVerified ? undefined : "turnstile-status"}
          className={styles.submitButton}
          disabled={!isVerified}
          fullWidth
          htmlType="submit"
          loading={isSubmitting}
        >
          {isSubmitting ? "Sending message" : "Send message"}
        </Button>
        {submissionStatus === SubmissionStatus.SUCCEEDED && (
          <p className={styles.submissionSuccessMessage} role="status">
            Thanks — your message is on its way. I&apos;ll get back to you soon.
          </p>
        )}
        {submissionStatus === SubmissionStatus.FAILED && (
          <p className={styles.submissionErrorMessage} role="alert">
            Your message could not be sent. Please try again or use the email link alongside the
            form.
          </p>
        )}
      </form>
    </section>
  )
}

export default ChatSection
