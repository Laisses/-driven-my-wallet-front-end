import { PurpleContainer, Logo, Form, TextInput, TextLabel, ConfirmationButton, ContainerLink, Loading } from "./Common";
import { BASE_URL } from "./constants";
import { useContext, useState } from "react";
import { AppContext } from "./context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ email: "", password: "" });
    const { setUser } = useContext(AppContext);
    const navigate = useNavigate();

    const handleForm = e => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const signIn = async () => {
        setLoading(true);
        try {
            const res = await axios.post(`${BASE_URL}/sign-in`, form);
            const user = {
                username: res.data.username,
                token: res.data.token
            };
            setLoading(false);
            setUser(user);
            navigate("/transactions");
        } catch (err) {
            alert(err.response.data.message);
            setLoading(false);
        }
    }

    return (
        <PurpleContainer>
            <Logo>MyWallet</Logo>
            <Form>
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
                {!loading
                    ? <ConfirmationButton onClick={signIn}>Entrar</ConfirmationButton>
                    : <Loading />
                }
            </Form>
            <ContainerLink to="/sign-up">Primeira vez? Cadastre-se!</ContainerLink>
        </PurpleContainer>
    );
}