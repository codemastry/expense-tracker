import React from "react";
import { Form, Modal, Button } from "react-bootstrap";

// props: show, onClose, expense
export function EditModal(props) {
    const [title, setTitle] = React.useState(props.expense?.title);
    const [amount, setAmount] = React.useState(props.expense?.amount);
    const [date, setDate] = React.useState(props.expense?.date);

    const _handleTitleChange = (e) => {
        setTitle(e.target.value);
    }
    const _handleAmountChange = (e) => {
        setAmount(e.target.value);
    }
    const _handleDateChange = (e) => {
        setDate(e.target.value);
    }

    const _handleSave = (e) => {
        e.preventDefault(); // pipigilan yung form mag postback (refresh)
        const dataToSave = {
            id: props.expense.id,
            amount: amount,
            date: date,
            title: title
        };
        
        var expensesFromStorage = localStorage.getItem("expenses");
        if (expensesFromStorage != null) {
            var expenseJson = JSON.parse(expensesFromStorage);
            var foundIndex = expenseJson.findIndex(x => x.id == props.expense.id);
            expenseJson[foundIndex] = dataToSave;

            var expensesString = JSON.stringify(expenseJson);
            localStorage.setItem("expenses", expensesString);
            alert("Changes Saved!");
            props.onClose();
        }
    }
    return (
        <Modal
            show={props.show}
            onHide={props.onClose}
            backdrop="static"
            keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Edit expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={_handleSave}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control value={title} onChange={_handleTitleChange} name="title" type="text" placeholder="Type something..." />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control value={amount} onChange={_handleAmountChange} step="0.01" name="amount" type="number" placeholder="Expense amount" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control value={date} onChange={_handleDateChange} name="date" type="date" placeholder="Select date" />
                    </Form.Group>
                    <Button className="me-2" variant="secondary" onClick={props.onClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        Save changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}