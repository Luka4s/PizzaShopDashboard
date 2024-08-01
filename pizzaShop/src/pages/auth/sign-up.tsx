import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerRestaurant } from "@/api/register-restaurant";

//Aqui estamos criando a tipagem do formato dos nossos dados
const signUpForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  email: z.string().email(),
  phone: z.string(),
});

//Aqui estamos passando o formato da tipagem a cima para o padrão de tipagem TypeScript
type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
  //usamos o useNavigate para que seja possivel passar o destino do usuario ao acionar o onClick
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>();

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  });

  async function handleSignUp(data: SignUpForm) {
    try {
      await registerRestaurantFn({
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        email: data.email,
        phone: data.phone,
      });
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Estabelecimento cadastrado com sucesso.", {
        //passamos a propriedade action retornando um componente e passamos a função navigate com o destino do usuario
        action: (
          <Button onClick={() => navigate(`/sign-In?email=${data.email}`)}>
            Login
          </Button>
        ),
      });
    } catch {
      toast.error("Erro ao cadastrar restaurante.");
    }
  }

  return (
    <div>
      <Helmet title="Cadastro" />
      <div className="p-8 ">
        <Button variant={"outline"} asChild className="absolute right-8 top-8">
          <Link to={"/sign-in"}>Fazer login</Link>
        </Button>
        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight ">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground mb-4">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>
        </div>
        <form className=" space-y-4 " onSubmit={handleSubmit(handleSignUp)}>
          <div className="space-y-2">
            <Label htmlFor="restaurantName" className="font-semibold">
              {" "}
              Nome do estabelecimento:
            </Label>
            <Input
              id="restaurantName"
              type="text"
              {...register("restaurantName")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="managerName" className="font-semibold">
              {" "}
              Seu nome:
            </Label>
            <Input id="managerName" type="text" {...register("managerName")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="font-semibold">
              {" "}
              Seu e-mail:
            </Label>
            <Input id="email" type="email" {...register("email")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="font-semibold">
              {" "}
              Seu celular:
            </Label>
            <Input id="phone" type="tel" {...register("phone")} />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Finalizar cadastro
          </Button>
        </form>
        {/*   <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
        Ao continuar você concorda com nossos{" "}
        <a className="underline underline-offset-4" href="">
          {" "}
          termos de serviços
        </a>{" "}
        e{" "}
        <a className="underline underline-offset-4" href="">
          políticas de privacidade
        </a>
        .
      </p> */}
      </div>
    </div>
  );
}
