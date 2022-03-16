import React from "react";
import { Container, Table, Button, Row, Col } from "react-bootstrap";
import { AddNewModal } from "./AddNewModal";
import { DeleteModal } from "./DeleteModal";
import { EditModal } from "./EditModal";

export function ListAll() {
    const [showAddNewModal, setAddNewModal] = React.useState(false);
    const [showDeleteModal, setDeleteModal] = React.useState(false);
    const [showEditModal, setEditModal] = React.useState(false);
    const [expenses, setExpenses] = React.useState([]);
    const [total, setTotal] = React.useState("0.00");
    const [idToDelete, setIdToDelete] = React.useState(0);
    const [expenseToEdit, setExpenseToEdit] = React.useState();

    // pag nagload yung component
    React.useEffect(function () {
        _loadExpenses();
    }, []);

    const _toggleShowAddNewModal = () => {
        setAddNewModal(!showAddNewModal); // !false = true | !true = false
        _loadExpenses();
    }

    const _toggleShowDeleteModal = (id) => {
        setIdToDelete(id);
        setDeleteModal(!showDeleteModal);
        _loadExpenses();
    }

    const _toggleShowEditModal = (expense) => {
        setExpenseToEdit(expense);
        setEditModal(!showEditModal);
        _loadExpenses();
    }

    const _loadExpenses = () => {
        const expensesFromStorage = localStorage.getItem("expenses");
        if (expensesFromStorage != null) {
            const jsonExpenses = JSON.parse(expensesFromStorage);
            setExpenses(jsonExpenses);

            var totalExpense = 0;
            for (var i = 0; i < jsonExpenses.length; i++) {
                totalExpense += Number(jsonExpenses[i].amount);
                // totalExpense = totalExpense + Number(jsonExpenses[i].amount);
            }
            var totalExpenseFormatted = _numberWithCommas(totalExpense);
            setTotal(totalExpenseFormatted);
        }
    }

    const _numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return (
        <>
            <Container>
                <Row className="mt-5">
                    <Col sm="6">
                        <h3>Expenses ({total})</h3>
                    </Col>
                    <Col sm="6" className="text-end">
                        <Button onClick={_toggleShowAddNewModal} variant="primary">Add new</Button>
                    </Col>
                </Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th className="text-end">Amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense, index) =>
                            <tr key={index}>
                                <td><Button onClick={() => _toggleShowEditModal(expense)} variant="link">{expense.title}</Button></td>
                                <td>{expense.date}</td>
                                <td className="text-end">{_numberWithCommas(expense.amount)}</td>
                                <td className="text-end">
                                    <Button onClick={() => _toggleShowDeleteModal(expense.id)} variant="danger">Delete</Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>

            <AddNewModal show={showAddNewModal} onClose={_toggleShowAddNewModal} />
            <DeleteModal show={showDeleteModal} onClose={_toggleShowDeleteModal} id={idToDelete} />
            {expenseToEdit != undefined &&
                <EditModal show={showEditModal} onClose={_toggleShowEditModal} expense={expenseToEdit} />
            }
        </>
    )
}