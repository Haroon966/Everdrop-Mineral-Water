"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { buildContactWhatsAppUrl } from "@/lib/whatsapp";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    const url = buildContactWhatsAppUrl(data.name, data.phone, data.message);
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Opening WhatsApp to send your message.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" placeholder="Your name" aria-invalid={!!errors.name} {...register("name")} />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" type="tel" inputMode="tel" placeholder="0300-6096599" aria-invalid={!!errors.phone} {...register("phone")} />
        {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Tell us about your order or inquiry..."
          rows={4}
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting} className="whatsapp-btn cursor-pointer">
        <WhatsAppIcon data-icon="inline-start" />
        Send via WhatsApp
      </Button>
    </form>
  );
}
