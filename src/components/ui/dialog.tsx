"use client"
import React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import { cn } from "@/lib/utils"
import { WindowButton, WindowButton1, WindowButton2 } from "@/svg"
import Image from "next/image"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "w-full flex bg-background items-center justify-center overflow-hidden",
          "p-0",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      >
        <div className="p-1 bg-[#C3C3C3]  md:min-w-[500px] sm:min-w-[400px] w-full container mx-auto">
          {children}
        </div>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

export interface DialogHeaderProps {
  title: string;
  onClose: () => void;
}
function DialogHeader({ title, onClose }: DialogHeaderProps) {
  return (
    <div className="flex items-center justify-between p-1 sm:p-2 bg-[#02007F] w-full">
    <div className="flex items-center gap-1 sm:gap-2">
      <Image
        src="/gifs/llamao_majestic_run.gif"
        alt="llamao_majestic_run"
        width={32}
        height={32}
      />
      <DialogTitle className="text-sm sm:text-base md:text-lg font-bold truncate">
        {title}
      </DialogTitle>
    </div>
    <div className="flex items-center gap-0.5 sm:gap-1">
      <WindowButton />
      <WindowButton1 />
      <WindowButton2 onClick={onClose} />
    </div>
  </div>
  )
}
function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
