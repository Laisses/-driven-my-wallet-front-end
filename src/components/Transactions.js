import { BASE_URL } from "./constants";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container, TransactionLoading } from "./Common";
import logout from "../assets/images/logout.png";

/* const mockTransactions = [
    {
        title: "Mercado",
        amount: "325,80",
        date: "18/11",
        description: "Compras no Carrefour",
        type: "outflow"
    },
    {
        title: "Salário",
        amount: "3000,00",
        date: "17/11",
        description: "",
        type: "inflow"
    },
    {
        title: "Roupas",
        amount: "256,00",
        date: "17/11",
        description: "",
        type: "outflow"
    }
]; */

const mockTransactions = [];

//const mockTransactions = undefined;

export const Transactions = () => {
    const { user } = useContext(AppContext);
    const [transactions, setTransactions] = useState(mockTransactions);
    const [balanceStatus, setBalanceStatus] = useState("");
    const [balance, setBalance] = useState(undefined);

    useEffect(() => {
        calculateBottomLine();
    }, []);

    const ListOfTransactions = ({ title, amount, date, type }) => {
        return (
            <ListItem>
                <Purchase>
                    <Date>{date}</Date>
                    <Title>{title}</Title>
                </Purchase>
                <Amount type={type}>{amount}</Amount>
            </ListItem>
        );
    };

    const Purchases = () => {
        if (transactions === undefined) {
            return <TransactionLoading />
        } else if (transactions.length === 0) {
            return (
                <p>Não tem nada</p>
            );
        } else if (transactions) {
            return (
                <>
                    <ul>
                        {transactions.map(t => <ListOfTransactions
                            key={t.title}
                            title={t.title}
                            amount={t.amount}
                            date={t.date}
                            type={t.type}
                        />)}
                    </ul>
                    <AccountBalance>
                        <Label>saldo</Label>
                        <Balance status={balanceStatus}>{balance}</Balance>
                    </AccountBalance>
                </>
            );
        }
    };

    const calculateSum = arr => {
        return arr
            .map(t => t.amount)
            .map(t => Number(t.replace(",", ".")) * 100)
            .reduce((acc, curr) => acc + curr, 0);
    };

    const calculateBottomLine = () => {
        const filteredInflow = transactions.filter(t => t.type === "inflow");
        const filteredOutflow = transactions.filter(t => t.type === "outflow");

        const inflow = calculateSum(filteredInflow);
        const outflow = calculateSum(filteredOutflow);

        const netBalance = inflow - outflow;

        if (netBalance >= 0) {
            setBalanceStatus("positive");
        } else {
            setBalanceStatus("negative");
        }

        const total = ((netBalance / 100)).toString().replace(".", ",");
        setBalance(total);
    };

    return (
        <Container>
            <Header>
                <HeaderTitle>Olá, {user.username}</HeaderTitle>
                <HeaderImg>
                    <img
                        src={logout}
                        alt="ícone para deslogar"
                    />
                </HeaderImg>
            </Header>
            <Main>
                <Purchases />
            </Main>
        </Container>
    );
};

const AccountBalance = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 15px 20px;
`;

const Label = styled.h2`
    font-size: 17px;
    font-weight: bold;
    text-transform: uppercase;
    color: #121212;
`;

const Balance = styled.div`
    color: ${props => props.status === "positive" ? "#0ec20c" : "#f50a0a"}
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 28px;
`;

const HeaderTitle = styled.h2`
    font-weight: bold;
    font-size: 26px;
    color: #ffffff;
`;

const HeaderImg = styled.a`
    img {
        width: 23px;
        height: 24px;
    }
`;

const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 326px;
    height: 440px;
    margin-top: 23px;
    background-color: #ffffff;
    border-radius: 5px;
`;

const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    margin: 30px 10px 10px;
`;

const Purchase = styled.div`
    display: flex;
`;

const Date = styled.div`
    color: #C6C6C6;
`;

const Title = styled.div`
    color: #121212;
    margin-left: 10px;
`;

const Amount = styled.div`
    color: ${props => props.type === "inflow" ? "#0ec20c" : "#f50a0a"}
`;


