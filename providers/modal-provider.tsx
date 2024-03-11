"use client";

import { useEffect, useState } from "react";

import StoreDialog from "@/components/dialogs/store-dialog";

export default function ModalProvider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <StoreDialog />
    </>
  );
}
