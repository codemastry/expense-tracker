import { Modal, Button, Form } from "react-bootstrap"

export function AddNewModal(props) {
    const _handleSave = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const amount = e.target.amount.value;
        const date = e.target.date.value;
        const expense = {
            amount: amount,
            date: date,
            title: title
        };
        
        var existingExpenses = localStorage.getItem("expenses");
        if (existingExpenses == null) {
            existingExpenses = [];
        }
        else {
            existingExpenses = JSON.parse(existingExpenses);
        }
        // safe na mag-add
        expense.id = existingExpenses.length + 1;
        existingExpenses.push(expense);
        var toSave = JSON.stringify(existingExpenses);
        localStorage.setItem("expenses", toSave);
        alert('Successfully added!');
        props.onClose();
    }
    return (
        <Modal
            show={props.show}
            onHide={props.onClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Add new expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={_handleSave}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control name="title" type="text" placeholder="Type something..." />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control step="0.01" name="amount" type="number" placeholder="Expense amount" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control name="date" type="date" placeholder="Select date" />
                    </Form.Group>
                    <Button className="me-2" variant="secondary" onClick={props.onClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}