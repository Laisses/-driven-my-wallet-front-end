import { PurpleContainer, Logo, Form, TextInput, TextLabel, ConfirmationButton, ContainerLink, SmallButtonLoading } from "./Common";
import { BASE_URL } from "./constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ username: "", email: "", password: "", repeat_password: "" });
    const navigate = useNavigate();

    const handleForm = e => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const createUser = async () => {
        setLoading(true);
        try {
            await axios.post(`${BASE_URL}/sign-up`, form);
            setLoading(false);
            alert("Usuário cadastrado com sucesso!");
            navigate("/");
        } catch (err) {
            alert(err.response.data.message);
            setLoading(false);
        }
    };

    return (
        <PurpleContainer>
            <Logo>MyWallet</Logo>
            <Form>
                <TextLabel htmlFor="username">Nome</TextLabel>
                <TextInput
                    type="text"
                    id="username"
                    name="username"
                    value={form.username}
                    onChange={handleForm}
                    placeholder="Insira seu nome aqui"
                    disabled={loading}
                    required
                />
                <TextLabel htmlFor="email">E-mail</TextLabel>
                <TextInput
                    type="text"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleForm}
                    placeholder="nome@email.com"
                    disabled={loading}
                    required
                />
                <TextLabel htmlFor="password">Senha</TextLabel>
                <TextInput
                    type="password"
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleForm}
                    placeholder="Digite sua senha"
                    disabled={loading}
                    required
                />
                <TextLabel htmlFor="repeat_password">Confirme a senha</TextLabel>
                <TextInput
                    type="password"
                    id="repeat_password"
                    name="repeat_password"
                    value={form.repeat_password}
                    onChange={handleForm}
                    placeholder="Digite a senha novamente"
                    disabled={loading}
                    required
                />
                {!loading
                    ? <ConfirmationButton onClick={createUser}>Cadastrar</ConfirmationButton>
                    : <SmallButtonLoading />
                }
            </Form>
            <ContainerLink to="/">Já tem uma conta? Entre agora!</ContainerLink>
        </PurpleContainer>
    );
}