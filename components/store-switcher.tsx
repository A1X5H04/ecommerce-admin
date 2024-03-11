"use client";

import { useState, ComponentPropsWithoutRef } from "react";
import { Store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Button } from "@/components/ui/button";
import {
  Check,
  ChevronsUpDown,
  PlusSquare,
  Store as StoreIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PopoverContent } from "@radix-ui/react-popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";

type PopoverTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

function StoreSwitcher({ className, items = [] }: StoreSwitcherProps) {
  const [open, setOpen] = useState(false);
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((store) => ({
    label: store.name,
    value: store.id,
  }));

  const currentStore = formattedItems.find(
    (store) => store.value === params.storeId
  ) || { label: "No Store", value: "" };

  const onStoreSelect = (storeId: string) => {
    setOpen(false);
    router.push(`/${storeId}`);
  };

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a Store"
          className={cn("w-52 justify-between", className)}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          <span>{currentStore.label}</span>
          <ChevronsUpDown className="ml-auto text-muted-foreground h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 shadow-md mt-2">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search Store.." />
            <CommandEmpty>No Store Found</CommandEmpty>
            <CommandGroup heading="Store">
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store.value)}
                  className="text-sm justify-between"
                >
                  <span>{store.label}</span>
                  <Check
                    className={cn(
                      "w-4 h-4",
                      store.value === currentStore.value
                        ? "text-primary"
                        : "text-transparent"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={storeModal.open}
                className="cursor-pointer"
              >
                <PlusSquare className="w-4 h-4 mr-2" /> Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default StoreSwitcher;
