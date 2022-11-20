import { BASE_URL } from "./constants";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./context";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container, TransactionLoading, BackIcon } from "./Common";
import backIcon from "../assets/images/backIcon.png";
import deleteIcon from "../assets/images/deleteIcon.png";
import editIcon from "../assets/images/editIcon.png";

export const Transaction = () => {
    const { user, transactionId } = useContext(AppContext);
    const [transaction, setTransaction] = useState(undefined);

    useEffect(() => {
        getTransaction();
    }, []);

    const getTransaction = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };

        try {
            const res = await axios.get(`${BASE_URL}/transactions/${transactionId}`, config);
            setTransaction(res.data);
        } catch (err) {
            alert(err.response.data.message);
        }
    }

    const selectType = (type) => {
        if (type === "outflow") {
            return " saída";
        } else if (type === "inflow") {
            return " entrada";
        }
    };

    const MainTransaction = () => {
        if (transaction) {
            return (
                <>
                    <Title>{transaction.title}</Title>
                    <Date>{transaction.date}</Date>
                    <Amount>R$ {transaction.amount}</Amount>
                    <Description>{transaction.description}</Description>
                    <Type>
                        Tipo de operação:{selectType(transaction.type)}
                    </Type>
                </>
            );
        } else {
            return <TransactionLoading />
        }
    };

    return (
        <Container>
            <Header>
                <HeaderImg to="/transactions">
                    <BackIcon
                        src={backIcon}
                        alt="ícone de voltar"
                    />
                </HeaderImg>
            </Header>
            <Main>
                <MainTransaction />
            </Main>
            <Footer>
                <Button>
                    <DeleteIcon
                        src={deleteIcon}
                        alt="ícone de deletar"
                    />
                    <div>Excluir transação</div>
                </Button>
                <Button>
                    <EditIcon
                        src={editIcon}
                        alt="ícone de editar"
                    />
                    <div>Editar Transação</div>
                </Button>
            </Footer>
        </Container>
    );
};

const Header = styled.div`
    display: flex;
    align-items: center;
`;

const HeaderImg = styled(Link)`
    img {
        width: 30px;
        height: 30px;
    }
`;

const Main = styled.div`
    display: flex;
    flex-direction: column;
    width: 326px;
    height: 440px;
    margin-top: 23px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #ffffff;
    border-radius: 5px;
`;

const Title = styled.h1`
    font-size: 32px;
    text-align: center;
    margin: 40px auto 5px auto;
`;

const Date = styled.p`
    font-size: 18px;
    font-weight: bold;
    text-align: center;
`;

const Amount = styled.p`
    font-size: 40px;
    text-align: center;
    margin: 50px auto;
`;

const Description = styled.p`
    font-size: 24px;
    margin-top: 10px;
    margin-bottom: 40px;
`;

const Type = styled.p`
    font-size: 24px;
`;

const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Button = styled(Link)`
    width: 155px;
    height: 115px;
    margin-top: 15px;
    padding-left: 10px;
    font-size: 17px;
    font-weight: bold;
    text-decoration: none;
    color: #ffffff;
    background-color: #A328D6;
    border: none;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    div {
        width: 64px;
    }
`;

const DeleteIcon = styled.img`
    width: 25px;
    height: 28px;
`;

const EditIcon = styled.img`
    width: 23px;
    height: 26px;
`;