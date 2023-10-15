"use client";

import dynamic from "next/dynamic";
import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { EditorProps } from "@/components/editor-component";

function Loading() {
  return (
    <div className="flex flex-col space-y-4 p-8 pt-6">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-300 rounded w-3/4" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded" />
            <div className="h-4 bg-gray-300 rounded w-5/6" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Modal() {
  const [showNewPostDialog, setShowNewPostDialog] = useState(true);
  const router = useRouter();

  const onOpenChange = (open: boolean) => {
    setShowNewPostDialog(open);
    if (!open) {
      router.back();
    }
  };

  const EditorComp = dynamic<EditorProps>(
    () => import("@/components/editor-component"),
    { ssr: false },
  );

  return (
    <Dialog onOpenChange={onOpenChange} open={showNewPostDialog}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Create team</DialogTitle>
          <DialogDescription>
            Add a new team to manage products and customers.
          </DialogDescription>
        </DialogHeader>
        <Suspense fallback={<Loading />}>
          <EditorComp markdown="" />
        </Suspense>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2" />
            <div className="space-y-2" />
          </div>
        </div>
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
