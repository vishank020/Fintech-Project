"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export function PrivacyPolicyModal({
  open,
  onClose,
  onAgree,
}: {
  open: boolean
  onClose: () => void
  onAgree: () => void
}) {
  const [agreed, setAgreed] = useState(false)

  const handleAgree = () => {
    if (agreed) {
      onAgree()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Privacy Policy</DialogTitle>
          <DialogDescription>
            Please review our privacy policy carefully before proceeding.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm text-muted-foreground max-h-[300px] overflow-y-auto">
          <p>
            At FinCoach AI, your privacy is very important to us. This Privacy
            Policy explains how we collect, use, and protect your information.
          </p>
          <p>
            <strong>Information we collect:</strong> When you use our services,
            we may collect personal details such as your name, email address,
            and usage data.
          </p>
          <p>
            <strong>How we use your information:</strong> To provide, improve,
            and personalize our services, as well as to ensure security and
            compliance with regulations.
          </p>
          <p>
            <strong>Data protection:</strong> We implement strict measures to
            safeguard your data and do not share it with unauthorized third
            parties.
          </p>
          <p>
            By using our app, you consent to this Privacy Policy. For further
            questions, contact{" "}
            <a
              href="mailto:support@fincoachai.com"
              className="underline text-primary"
            >
              support@fincoachai.com
            </a>
            
          </p>
        </div>

        <div className="flex items-center justify-end gap-2">
            <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-green-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
            >
                Close
            </button>
        </div>

        
      </DialogContent>
    </Dialog>
  )
}
