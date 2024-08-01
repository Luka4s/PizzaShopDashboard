import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { toast } from "sonner";
import { Link, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/api/sign-in";

//Aqui estamos criando a tipagem do formato dos nossos dados
const signinForm = z.object({
  email: z.string().email(),
});

//Aqui estamos passando o formato da tipagem a cima para o padrão de tipagem TypeScript
type SignInForm = z.infer<typeof signinForm>;

export function SignIn() {
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: {
      email: searchParams.get("email") ?? "",
    },
  });

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  });

  async function handleSignIn(data: SignInForm) {
    try {
      await authenticate({ email: data.email });

      console.log(data);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Enviamos um link de autenticação para o seu e-mail.", {
        action: <Button onClick={() => handleSignIn(data)}>Reenviar</Button>,
      });
    } catch {
      toast.error("Credenciais inválidas !");
    }
  }

  return (
    <div>
      <Helmet title="Login" />
      <div className="p-8 ">
        <Button variant={"outline"} asChild className="absolute right-8 top-8">
          <Link to={"/sign-up"}>Cadastrar restaurante</Link>
        </Button>
        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight ">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground mb-4">
              Acompanhe suas vendas no painel do parceiro
            </p>
          </div>
        </div>
        <form className=" space-y-4 " onSubmit={handleSubmit(handleSignIn)}>
          <div className="space-y-2">
            <Label htmlFor="email" className="font-semibold">
              {" "}
              Seu e-mail:
            </Label>
            <Input id="email" type="email" {...register("email")} />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Acessar painel
          </Button>
        </form>
      </div>
    </div>
  );
}
