"use client";
import { useParams } from "next/navigation";
import React from "react";

export const dynamicParams = true;
export default function Page() {
  const { slug } = useParams();
  return <div>{slug}</div>;
}
