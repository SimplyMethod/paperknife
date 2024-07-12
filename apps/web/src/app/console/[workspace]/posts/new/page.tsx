'use client';

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import type { insertPostSchema } from "@paperknife/database/types";
// import Editor from "@/components/editor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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

export default function NewPostPage() {

  // const form = useForm<z.infer<typeof insertPostSchema>>({
  //   mode: "onChange",
  //   defaultValues: {
  //     title: "",
  //     content: "",
  //     slug: "",
  //   },
  //   // resolver: (...args) => {
  //   //   // if (isDraft.current) {
  //   //   //   // zodResolver(formSchema),
  //   //   //   // TODO: different resolver for draft
  //   //   //   return zodResolver(insertPostSchema)(...args);
  //   //   // }
  //   //   // return zodResolver(insertPostSchema)(...args);
  //   // },
  // });

  // const { isSubmitting } = form.formState;

  // const onSubmit = async (values: z.infer<typeof insertPostSchema>) => {

    // API call

  //   const result = await fetch("/api/posts", {
  //     method: "POST",
  //     body: JSON.stringify(values),
  //   });

  //   // TODO: add toast
  //   if (!result.ok) {
  //     // toast.error(result.error);
  //   } else {
  //     // toast.success("Product added successfully 😊");
  //     form.reset();
  //     // router.push("/dashboard/products");
  //   }
  // };

  // const saveDraft = () => {
  //   // const data = form.getValues();

  //   try {
  //     // await draftSchema.parseAsync(data);
  //     // if passes, data is valid
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const onChange = (richText: string) => {
  //   form.setValue("content", richText);
  // };

  return (
    <div className="container relative h-screen flex flex-col justify-between">
      {/* <Suspense fallback={<Loading />}>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Post title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Editor content={field.value} onChange={onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

              <Button
                onClick={() => {
                  setShowNewPostDialog(false);
                }}
                type="button"
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                disabled={isSubmitting}
                onClick={saveDraft}
                type="button"
                variant="ghost"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 mx-2 rounded-full animate-spin border-2 border-solid border-gray-500 border-t-transparent" />
                ) : (
                  "Save as draft"
                )}
              </Button>
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? (
                  <div className="w-4 h-4 mx-2 rounded-full animate-spin border-2 border-solid border-gray-500 border-t-transparent" />
                ) : (
                  "Save"
                )}
              </Button>

          </form>
        </Form>

        <div className="sticky bottom-0 backdrop bg-white/50 backdrop-blur-sm">
          <div className="flex flex-shrink-0 justify-end px-4 py-4 border-t">
            <button
              className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
              // onClick={() => setOpen(false)}
              type="button"
            >
              Cancel
            </button>
            <button
              className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      </Suspense> */}
    </div>
  );
}
