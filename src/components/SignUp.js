import styled from "styled-components";
import { PurpleContainer, Logo, Form, TextInput, TextLabel, ConfirmationButton, ContainerLink } from "./Common";

export const SignUp = () => {
    return (
        <PurpleContainer>
            <Logo>MyWallet</Logo>
            <Form>
            <TextLabel htmlFor="name">Nome</TextLabel>
            <TextInput
                type="text"
                id="name"
                placeholder="Insira seu nome aqui"
                required
            />
            <TextLabel htmlFor="email">E-mail</TextLabel>
            <TextInput
                type="text"
                id="email"
                placeholder="nome@email.com"
                required
            />
            <TextLabel htmlFor="password">Senha</TextLabel>
            <TextInput
                type="text"
                id="password"
                placeholder="Digite sua senha"
                required
            />
            <TextLabel htmlFor="confirmation">Confirme a senha</TextLabel>
            <TextInput
                type="text"
                id="confirmation"
                placeholder="Digite a senha novamente"
                required
            />
            <ConfirmationButton>Cadastrar</ConfirmationButton>
            </Form>
            <ContainerLink>Já tem uma conta? Entre agora!</ContainerLink>
        </PurpleContainer>
    );
}