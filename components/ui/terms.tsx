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

interface TermsModalProps {
  open: boolean
  onClose: () => void
  appName: string
}

export function TermsModal({ open, onClose, appName }: TermsModalProps) {
  const [agreed, setAgreed] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Terms & Conditions</DialogTitle>
          <DialogDescription>
            Please review our terms carefully before using {appName}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            1. <strong>Acceptance of Terms:</strong> By accessing and using {appName}, you
            agree to comply with these Terms & Conditions.
          </p>
          <p>
            2. <strong>Use of Service:</strong> You agree to use {appName} only for lawful
            purposes and in a manner consistent with all applicable laws.
          </p>
          <p>
            3. <strong>Limitations of Liability:</strong> {appName} and its team are not
            responsible for any damages arising from your use of the service.
          </p>
          <p>
            4. <strong>Intellectual Property:</strong> All content, logos, and designs
            remain the property of {appName}.
          </p>
          <p>
            5. <strong>Modifications:</strong> We may update these terms at any time.
          </p>
        </div>

        <DialogFooter className="flex flex-col space-y-4">
          {/* ✅ Checkbox with tick */}
          <div className="flex items-center space-x-2">
                <Checkbox
                    id="agree"
                    checked={agreed}
                    onCheckedChange={(checked) => setAgreed(checked === true)}
                    className="border-2 border-gray-800 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
                <label
                    htmlFor="agree"
                    className="text-sm text-muted-foreground cursor-pointer select-none"
                >
                    I have read and agree to the Terms & Conditions
                </label>
            </div>

          <Button onClick={onClose} disabled={!agreed}>
            Agree & Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
