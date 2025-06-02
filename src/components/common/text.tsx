"use client";

import { useToast } from "@/hooks/use-toast";
import React, { useEffect } from "react";

export default function Test() {
  const { toast } = useToast();
  toast({
    message: "This is a test toast message",
    variant: "success",
    duration: 10000000,
  });

  useEffect(() => {}, []);
  return <div>text</div>;
}
