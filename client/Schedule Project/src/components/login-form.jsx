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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LockIcon,
  MailIcon,
  ShieldIcon,
  UserIcon,
  UserPlusIcon,
} from "lucide-react";

export default function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [clientEmail, setClientEmail] = useState("");
  const [clientPassword, setClientPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleSubmit = async (event, userType) => {
    event.preventDefault();
    setIsLoading(true);

    if (userType === "client") {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/account`
        );
        const users = response.data;

        const user = users.find(
          (user) =>
            user.user_email === clientEmail && user.password === clientPassword
        );

        if (user) {
          navigate("/client/dashboard");
        } else {
          alert("Email ou senha inválidos");
        }
      } catch (err) {
        console.error("Erro ao buscar dados:", err.message);
        alert("Erro ao conectar com o servidor");
      } finally {
        setIsLoading(false);
      }
    } else if (userType === "admin") {
      // Obtenha o código especial de admin
      const adminCodeInput = document.getElementById("admin-special-code");
      const adminCode = adminCodeInput?.value.trim();
      const specialPassword =
        import.meta.env.VITE_REACT_APP_SPECIAL_PASSWORD.trim();

      try {
        // Busque os administradores
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/admin`
        );
        const admins = response.data;
        console.log("Dados de admin recebido:", admins);

        console.log("Email digitado:", adminEmail);
        console.log("Senha digitada:", adminPassword);

        // Procure o admin com email e senha correspondentes
        const adminUser = admins.find(
          (admin) =>
            admin.email === adminEmail && admin.password === adminPassword
        );

        console.log("admin encontrado:", adminUser);
        // Verifique se o código especial confere e se o admin existe
        if (adminCode === specialPassword && adminUser) {
          navigate("/admin/dashboard");
        } else {
          alert("Email, senha ou código de segurança inválidos");
        }
      } catch (err) {
        console.error("Erro ao buscar dados de admin:", err.message);
        alert("Erro ao conectar com o servidor");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        <CardDescription className="text-center">
          Escolha o seu tipo de conta para continuar
        </CardDescription>
      </CardHeader>
      <Tabs
        defaultValue="client"
        className="w-full flex flex-col justify-center items-center"
      >
        <TabsList className="grid grid-cols-2 mb-4  w-11/12 ">
          <TabsTrigger
            value="client"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <UserIcon className="h-4 w-4 mr-2" />
            Cliente
          </TabsTrigger>
          <TabsTrigger
            value="admin"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <ShieldIcon className="h-4 w-4 mr-2" />
            Adm
          </TabsTrigger>
        </TabsList>

        <TabsContent value="client" className="w-full">
          <form
            className="flex flex-col gap-8"
            onSubmit={(e) => handleSubmit(e, "client")}
          >
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="client-email">Email</Label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="client-email"
                    type="email"
                    placeholder="seuemail@exemplo.com"
                    className="pl-10"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="client-password">Senha</Label>
                  <a href="#" className="text-sm text-primary hover:underline">
                    Esqueceu sua senha?
                  </a>
                </div>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="client-password"
                    type="password"
                    placeholder="Sua Senha"
                    className="pl-10"
                    value={clientPassword}
                    onChange={(e) => setClientPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logando..." : "Acessar Sua Conta"}
              </Button>
              <div className="flex items-center justify-center w-full">
                <div className="border-t border-gray-200 flex-grow mr-4"></div>
                <span className="text-xs text-muted-foreground">OU</span>
                <div className="border-t border-gray-200 flex-grow ml-4"></div>
              </div>
              <Button
                variant="outline"
                type="button"
                className="w-full"
                onClick={() => navigate("/register")}
              >
                <UserPlusIcon className="h-4 w-4 mr-2" />
                Criar Conta Nova
              </Button>

              <div className="px-8 py-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Não tem uma conta?{" "}
                  <Link
                    to="/register"
                    className="text-primary font-medium hover:underline"
                  >
                    Criar Conta Nova
                  </Link>
                </p>
              </div>
            </CardFooter>
          </form>
        </TabsContent>

        <TabsContent value="admin" className="w-full">
          <form
            className="flex flex-col gap-8"
            onSubmit={(e) => handleSubmit(e, "admin")}
          >
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email</Label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@exemplo.com"
                    className="pl-10"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="admin-password">Senha</Label>
                  <a href="#" className="text-sm text-primary hover:underline">
                    Esqueceu sua Senha?
                  </a>
                </div>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="Sua Senha"
                    className="pl-10"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-special-code">Senha de Segurança</Label>
                <div className="relative">
                  <ShieldIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="admin-special-code"
                    type="password"
                    placeholder="Senha Especial"
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Insira a Senha de Segurança
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logando..." : "Acessar conta Adm"}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                A conta de Administrador somente permite pessoas autorizadas
              </p>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
