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
import { type LoginFormValues, loginSchema } from "@/schemas/auth";

export function LoginPage() {
  const { mutate: login, isPending } = useLogin<LoginFormValues>();

  const form = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="flex min-h-svh items-center justify-center bg-background">
      <div className="w-full max-w-sm rounded-xl border bg-card p-8 shadow-sm">
        <div className="mb-6 flex flex-col gap-1">
          <h1 className="text-2xl font-bold">SurgicalEd VR</h1>
          <p className="text-sm text-muted-foreground">Sign in to your account</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => login(values))}
            className="flex flex-col gap-4"
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
