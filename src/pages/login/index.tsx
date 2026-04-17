import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@refinedev/core";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { type LoginFormValues, loginSchema } from "@/schemas/auth";

const loginPageRootClassName = "flex min-h-svh items-center justify-center bg-background";

const loginCardClassName =
  "w-full max-w-sm rounded-card border border-border bg-card p-8 text-card-foreground shadow-elevated";

const loginCardHeaderClassName = "mb-6 flex flex-col gap-1";

const loginTitleClassName = "text-2xl font-semibold tracking-tight text-foreground";

const loginSubtitleClassName = "text-sm text-muted-foreground";

const loginFormClassName = "flex flex-col gap-4";

export function LoginPage() {
  const { mutate: login, isPending } = useLogin<LoginFormValues>();

  const form = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className={cn(loginPageRootClassName)}>
      <div className={cn(loginCardClassName)}>
        <div className={cn(loginCardHeaderClassName)}>
          <h1 className={cn(loginTitleClassName)}>SurgicalEd VR</h1>
          <p className={cn(loginSubtitleClassName)}>Sign in to your account</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => login(values))}
            className={cn(loginFormClassName)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" autoComplete="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" autoComplete="current-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
