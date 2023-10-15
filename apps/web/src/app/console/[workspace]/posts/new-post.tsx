"use client";

import dynamic from "next/dynamic";
import { useState, useRef } from "react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import type { MDXEditorMethods } from "@mdxeditor/editor";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { EditorProps } from "@/components/editor-component";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  title: z.string().min(3).max(200, {
    message: "Title must be less than 200 characters",
  }),
  content: z.string().min(3, {
    message: "Content must be at least 3 characters",
  }),
});

function Loading() {
  return (
    <div className="flex flex-col space-y-4 p-8 pt-6 min-h-[400px]">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-12 py-1">
          <div className="h-8 bg-gray-200 rounded w-full" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-100 rounded" />
            <div className="h-4 bg-gray-100 rounded w-5/6" />
          </div>
        </div>
      </div>
    </div>
  );
}

const EditorComp = dynamic<EditorProps>(
  () => import("@/components/editor-component"),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

export default function NewPost() {
  const [showNewPostDialog, setShowNewPostDialog] = useState(false);

  const editorRef = useRef<MDXEditorMethods>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const { isSubmitting } = form.formState;
  const { handleSubmit } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    values.content = JSON.stringify(editorRef.current?.getMarkdown);
  };

  return (
    <Dialog onOpenChange={setShowNewPostDialog} open={showNewPostDialog}>
      <DialogTrigger asChild>
        <button
          className="rounded-md border border-black bg-black px-5 py-2 text-sm font-medium text-white transition-all duration-75 hover:bg-white hover:text-black active:scale-95"
          type="button"
        >
          New Post
        </button>
      </DialogTrigger>
      <DialogContent
        className="max-w-5xl"
        onEscapeKeyDown={(e) => {
          e.preventDefault();
        }}
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
        <Form {...form}>
          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Post title..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field: { value } }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <EditorComp
                      editorRef={editorRef}
                      markdown={value}
                      onChange={(markdown) => {
                        form.setValue("content", markdown);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                onClick={() => {
                  setShowNewPostDialog(false);
                }}
                type="button"
                variant="ghost"
              >
                Cancel
              </Button>
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? (
                  <div className="w-4 h-4 mx-2 rounded-full animate-spin border-2 border-solid border-gray-500 border-t-transparent" />
                ) : (
                  "Save"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
        <div className="grid gap-4" />
      </DialogContent>
    </Dialog>
  );
}
