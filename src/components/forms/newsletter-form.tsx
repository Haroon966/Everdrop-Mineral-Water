"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buildNewsletterWhatsAppUrl } from "@/lib/whatsapp";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type FormData = z.infer<typeof schema>;

export function NewsletterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    const url = buildNewsletterWhatsAppUrl(data.email);
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Thanks! Opening WhatsApp to confirm your subscription.");
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
      noValidate
    >
      <div className="flex flex-1 flex-col gap-2">
        <Label htmlFor="newsletter-email" className="sr-only">
          Email address
        </Label>
        <Input
          id="newsletter-email"
          type="email"
          placeholder="Enter your email"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting} className="whatsapp-btn shrink-0 cursor-pointer">
        <WhatsAppIcon data-icon="inline-start" />
        Subscribe
      </Button>
    </form>
  );
}
