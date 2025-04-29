"use client";

import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  AtSignIcon,
  BuildingIcon,
  CheckIcon,
  ChevronLeftIcon,
  LockIcon,
  PhoneIcon,
  UserIcon,
} from "lucide-react";

export default function ClientRegistrationForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [first_name, setFirst_name] = useState("");
  const [second_name, setSecond_name] = useState("");
  const [tel, setTel] = useState("");
  const [user_email, setUser_email] = useState("");
  const [password, setPassword] = useState("");
  const [company_name, setCompany_name] = useState("");

  const validateForm = (formData) => {
    const newErrors = {};

    // Get form values
    const first_name = formData.get("firstName");
    const second_name = formData.get("lastName");
    const user_email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const tel = formData.get("phone");
    const company_name = formData.get("company");

    // Validate first name
    if (!first_name || first_name.trim() === "") {
      newErrors.first_name = "First name is required";
    }

    // Validate last name
    if (!second_name || second_name.trim() === "") {
      newErrors.second_name = "Last name is required";
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user_email || !emailRegex.test(user_email)) {
      newErrors.user_email = "Valid email is required";
    }

    // Validate password
    if (!password || password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Validate phone
    if (!tel || tel.trim() === "") {
      newErrors.tel = "Phone number is required";
    }

    if (!company_name || company_name.trim() === "") {
      newErrors.company_name = "company name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //Revisar como funciona o handleSubmit do projeto antigo

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const isValid = validateForm(formData);

    if (!isValid) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/account`,
        {
          user_email,
          password,
          tel,
          first_name,
          second_name,
          company_name,
        }
      );
      console.log("Client added:", response.data);

      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error adding client:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-green-600">
            Registro Sucedido!
          </CardTitle>
          <CardDescription className="text-center">
            Sua conta foi criada com sucesso
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <div className="rounded-full bg-green-100 p-3 mb-4">
            <CheckIcon className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-center mb-4">
            Obrigado pelo seu registro. Você será redirecionado logo mais.
          </p>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="mt-2"
          >
            <ChevronLeftIcon className="mr-2 h-4 w-4" />
            Ir para login
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Criar Conta Cliente
        </CardTitle>
        <CardDescription className="text-center">
          Adicione suas informações ao registro para criar uma conta
        </CardDescription>
      </CardHeader>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nome</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Luiz"
                  value={first_name}
                  onChange={(e) => setFirst_name(e.target.value)}
                  className={`pl-10 ${
                    errors.firstName ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.firstName && (
                <p className="text-xs text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Sobrenome</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Machado"
                  value={second_name}
                  onChange={(e) => setSecond_name(e.target.value)}
                  className={`pl-10 ${errors.lastName ? "border-red-500" : ""}`}
                />
              </div>
              {errors.lastName && (
                <p className="text-xs text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <AtSignIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seuemail@exemplo.com"
                value={user_email}
                onChange={(e) => setUser_email(e.target.value)}
                className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Número de Telefone</Label>
            <div className="relative">
              <PhoneIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(13) 00000-0000"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                className={`pl-10 ${errors.phone ? "border-red-500" : ""}`}
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Nome da Empresa (Opcional)</Label>
            <div className="relative">
              <BuildingIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="company"
                name="company"
                placeholder="Exemplo inc."
                value={company_name}
                onChange={(e) => setCompany_name(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <LockIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Sua Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`pl-10 ${errors.password ? "border-red-500" : ""}`}
              />
            </div>
            {errors.password ? (
              <p className="text-xs text-red-500">{errors.password}</p>
            ) : (
              <p className="text-xs text-muted-foreground">
                A senha deve possuir ao menos 8 caracteres
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <div className="relative">
              <LockIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Sua senha"
                className={`pl-10 ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Criando Conta..." : "Criar Conta"}
          </Button>
          <div className="text-center text-sm">
            Já possui uma conta?{" "}
            <Link to="/" className="text-primary font-medium hover:underline">
              Acessar login
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
