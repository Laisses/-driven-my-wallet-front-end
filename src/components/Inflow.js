import { Container, Header, Form, TextInput, TextLabel, ConfirmationButton, SmallButtonLoading } from "./Common";
import styled from "styled-components";
import { BASE_URL } from "./constants";
import { useContext, useState } from "react";
import { AppContext } from "./context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Inflow = () => {
    const { user } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ title: "", amount: "", date: "", description: "" });
    const navigate = useNavigate();

    const handleForm = e => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };


    return (
        <Container>
            <Header>Nova entrada</Header>
            <Form>
            <TextLabel htmlFor="title">Título</TextLabel>
                <TextInput
                    type="text"
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={handleForm}
                    placeholder="Digite o título"
                    disabled={loading}
                    required
                />
                <TextLabel htmlFor="amount">Valor</TextLabel>
                <TextInput
                    type="text"
                    id="amount"
                    name="amount"
                    value={form.amount}
                    onChange={handleForm}
                    placeholder="Digite o valor"
                    disabled={loading}
                    required
                />
                <TextLabel htmlFor="date">Data</TextLabel>
                <TextInput
                    type="date"
                    id="date"
                    name="date"
                    value={form.date}
                    onChange={handleForm}
                    disabled={loading}
                    required
                />
                <TextLabel htmlFor="description">Descrição</TextLabel>
                <TextInput
                    type="text"
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleForm}
                    placeholder="Adicone uma descrição"
                    disabled={loading}
                />
                <Footer>
                {!loading
                    ? <ConfirmationButton>Salvar entrada</ConfirmationButton>
                    : <SmallButtonLoading />
                }
                </Footer>
            </Form>
        </Container>
    );
}

const Footer = styled.div`
    margin-top: 20px;
`;