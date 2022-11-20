import { Container, Header, NavHeader, BackIcon, Form, TextInput, TextLabel, ConfirmationButton, SmallButtonLoading, EditLoading } from "./Common";
import styled from "styled-components";
import { BASE_URL } from "./constants";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "./context";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import backIcon from "../assets/images/backIcon.png";

export const Edit = () => {
    const { user, transaction, setTransaction } = useContext(AppContext);
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState(transaction);
    const navigate = useNavigate();

    useEffect(() => {
        if (!transaction) {
            getTransaction();
        }
    }, []);

    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    };

    const getTransaction = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/transactions/${id}`, config);
            setTransaction(res.data);
            setForm(res.data);
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    const handleForm = e => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleRadioButton = e => {
        const { id } = e.target;
        setForm({ ...form, type: id })
    };

    const goBack = () => {
        navigate(`/transactions/${id}`);
    }

    const goToHome = () => {
        navigate("/transactions");
    }

    return (
        <Container>
            <NavHeader>
                <Header>Editar transação</Header>
                <BackIcon
                    src={backIcon}
                    alt="ícone de voltar"
                    onClick={goBack}
                />
            </NavHeader>
            {transaction
                ?
                <Form>
                    <TextLabel htmlFor="title">Título</TextLabel>
                    <TextInput
                        type="text"
                        id="title"
                        name="title"
                        value={form.title}
                        onChange={handleForm}
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
                        disabled={loading}
                    />

                    <Text>Tipo de transação</Text>
                    <Fieldset>
                        <RadioOption>
                            <RadioInput
                                type="radio"
                                id="inflow"
                                name="type"
                                value={form.type}
                                onChange={handleRadioButton}
                                disabled={loading}
                                checked={form.type === "inflow"}
                                required="required"
                            />
                            <RadioLabel htmlFor="inflow">Entrada</RadioLabel>
                        </RadioOption>
                        <RadioOption>
                            <RadioInput
                                type="radio"
                                id="outflow"
                                name="type"
                                value={form.type}
                                onChange={handleRadioButton}
                                disabled={loading}
                                checked={form.type === "outflow"}
                                required
                            />
                            <RadioLabel htmlFor="outflow">Saída</RadioLabel>
                        </RadioOption>
                    </Fieldset>

                    {!loading
                        ? <ConfirmationButton>Salvar alteração</ConfirmationButton>
                        : <SmallButtonLoading />
                    }

                    <ConfirmationButton onClick={goToHome}>Cancelar</ConfirmationButton>
                </Form>
                :
                <EditLoading />
            }
        </Container>
    );
}

const Text = styled.p`
    font-size: 20px;
    color: #ffffff;
    margin-bottom: 10px;
`;

const RadioInput = styled.input`
    width: 24px;
    height: 24px;
    border: none;
`;

const RadioLabel = styled.label`
    font-size: 20px;
    color: #ffffff;
    margin-left: 10px;
`;

const RadioOption = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
`;

const Fieldset = styled.div`
    margin-left: 10px;
`;

