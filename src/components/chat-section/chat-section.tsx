import { useState } from "react"
import type { FormEvent } from "react"

import styles from "./chat-section.module.css"

import { Button } from "@components/button"
import { Input } from "@components/input"
import { Label } from "@components/label"

const contactEmailAddress = "hello@jurgenbaldacchino.com"
const formspreeEndpoint = "https://formspree.io/f/mzdnrraj"

enum SubmissionStatus {
  IDLE = "idle",
  SUBMITTING = "submitting",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}

export const ChatSection = () => {
  const [submissionStatus, setSubmissionStatus] = useState(SubmissionStatus.IDLE)
  const isSubmitting = submissionStatus === SubmissionStatus.SUBMITTING

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) {
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
        <Button className={styles.submitButton} fullWidth htmlType="submit" loading={isSubmitting}>
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
