"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email."),
  subject: z.string().min(1, "Please select a subject."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const subject = watch("subject");

  const onSubmit = async (values: FormData) => {
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log(values);

      toast.success("Message sent successfully!");

      reset();
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="mb-2 block font-medium">Full Name *</label>

        <Input placeholder="John Doe" {...register("fullName")} />

        {errors.fullName && (
          <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block font-medium">Email *</label>

        <Input
          type="email"
          placeholder="john@example.com"
          {...register("email")}
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block font-medium">Subject *</label>

        <Select
          value={subject}
          onValueChange={(value) =>
            setValue("subject", value, { shouldValidate: true })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a topic" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="General Inquiry">General Inquiry</SelectItem>

            <SelectItem value="Support">Support</SelectItem>

            <SelectItem value="Feedback">Feedback</SelectItem>

            <SelectItem value="Partnership">Partnership</SelectItem>
          </SelectContent>
        </Select>

        {errors.subject && (
          <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block font-medium">Message *</label>

        <Textarea
          className="min-h-[150px]"
          placeholder="How can we help you?"
          {...register("message")}
        />

        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
