import { BASE_URL } from "./constants";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./context";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { Container, TransactionLoading } from "./Common";
import logout from "../assets/images/logout.png";
import decrease from "../assets/images/decrease.png";
import increase from "../assets/images/increase.png";

export const Transactions = () => {
    const { user, setTransactionId } = useContext(AppContext);
    const [transactions, setTransactions] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        getTransactions();
    }, [setTransactions]);

    const getTransactions = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };

        try {
            const res = await axios.get(`${BASE_URL}/transactions`, config);
            setTransactions(res.data);
        } catch(err) {
            alert(err.response.data.message);
        }
    };

    const chooseTransaction = id => {
        setTransactionId(id);
        navigate(`/transactions/${id}`);
    };

    const ListOfTransactions = ({ id, title, amount, date, type }) => {
        return (
            <ListItem onClick={() => chooseTransaction(id)}>
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
                <Message>Não há registros de
                    entrada ou saída</Message>
            );
        } else if (transactions) {
            const { total, status } = calculateBottomLine(transactions);
            return (
                <>
                    <ul>
                        {transactions.map(t => <ListOfTransactions
                            key={t._id}
                            id={t._id}
                            title={t.title}
                            amount={t.amount}
                            date={t.date}
                            type={t.type}
                        />)}
                    </ul>
                    <AccountBalance>
                        <Label>saldo</Label>
                        <Balance status={status}>{total}</Balance>
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

    const calculateBottomLine = (transactions) => {
        const filteredInflow = transactions.filter(t => t.type === "inflow");
        const filteredOutflow = transactions.filter(t => t.type === "outflow");

        const inflow = calculateSum(filteredInflow);
        const outflow = calculateSum(filteredOutflow);

        const netBalance = inflow - outflow;

        return {
            total: ((netBalance / 100)).toString().replace(".", ","),
            status: netBalance >= 0 ? "positive" : "negative",
        };
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
            <Footer>
                <Button to="/transactions/add-inflow">
                    <img
                        src={increase}
                        alt="ícone de adição"
                    />
                    <div>Nova entrada</div>
                </Button>
                <Button to="/transactions/add-outflow">
                    <img
                        src={decrease}
                        alt="ícone de subtração"
                    />
                    <div>Nova saída</div>
                </Button>
            </Footer>
        </Container>
    );
};

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

const Message = styled.p`
    font-size: 20px;
    text-align: center;
    margin: auto 73px;
    color : #868686;
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
    color: ${props => props.type === "inflow" ? "#0ec20c" : "#f50a0a"};
`;

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
    color: ${props => props.status === "positive" ? "#0ec20c" : "#f50a0a"};
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
    img {
        width: 25px;
        height: 25px;
    }
    div {
        width: 64px;
    }
`;
