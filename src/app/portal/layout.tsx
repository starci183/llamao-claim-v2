import React from "react";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
