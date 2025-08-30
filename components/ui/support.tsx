"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function SupportModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Support</DialogTitle>
          <DialogDescription>
            How can we help you?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm text-muted-foreground">
          <p><strong>FAQs:</strong></p>
          <ul className="list-disc pl-4 space-y-2">
            <li>How do I reset my password?</li>
            <li>How can I update my subscription?</li>
            <li>How do I contact customer service?</li>
          </ul>
        </div>

        <DialogFooter>
          <Button asChild>
            <a href="mailto:support@fincoachai.com">Contact Support</a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
