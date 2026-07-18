import type { FormEvent } from "react"

import styles from "./chat-section.module.css"

import { Button } from "@components/button"
import { Input } from "@components/input"
import { Label } from "@components/label"

const contactEmailAddress = "hello@jurgenbaldacchino.com"

export const ChatSection = () => {
  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const fullName = String(formData.get("fullName") ?? "")
    const emailAddress = String(formData.get("emailAddress") ?? "")
    const message = String(formData.get("message") ?? "")
    const subject = `Website enquiry from ${fullName}`
    const emailBody = `Name: ${fullName}\nEmail: ${emailAddress}\n\n${message}`
    const emailLink = `mailto:${contactEmailAddress}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(emailBody)}`

    window.open(emailLink, "_self")
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
          name="emailAddress"
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
        <Button className={styles.submitButton} fullWidth htmlType="submit">
          Send message
        </Button>
      </form>
    </section>
  )
}

export default ChatSection
