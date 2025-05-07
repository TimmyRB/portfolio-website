"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";
import { SlidingButton } from "../../components/sliding-button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { sendGAEvent } from "@next/third-parties/google";
import { track } from "@vercel/analytics/react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Your name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(5, { message: "A message is required" }),
});

export default function Contact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    sendGAEvent("contact_form_submitted", {
      name: data.name,
      email: data.email,
      message: data.message,
    });

    track("contact_form_submitted", {
      name: data.name,
      email: data.email,
      message: data.message,
    });

    const toastId = toast.loading("Sending email...");
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        form.reset();
        toast.success("Email sent successfully", { id: toastId });
      } else {
        toast.error("Failed to send email", { id: toastId });
      }
    } catch (error) {
      toast.error("Failed to send email", { id: toastId });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 min-h-full min-w-full">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Contact me</CardTitle>
          <CardDescription>
            Please fill out the form below to get in touch with me. <br /> A
            copy of your message will be sent to your email address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="John Doe" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="john.doe@example.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Hello Jacob!"
                        autoCapitalize="sentences"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SlidingButton
                type="submit"
                className="w-full"
                text="Send"
                icon={<Mail />}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
