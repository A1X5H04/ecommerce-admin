"use client";

import { useEffect } from "react";
import { useStoreModal } from "@/hooks/use-store-modal";

export function StoreSetup() {
  const isOpen = useStoreModal((state) => state.isOpen);
  const onOpen = useStoreModal((state) => state.open);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}
