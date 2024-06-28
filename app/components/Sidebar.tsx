import Form from 'react-bootstrap/Form';
import {Col} from "react-bootstrap";

export default function Sidebar() {
    return <Col xs="3" className="pt-3 border-1 border-end border-secondary">
        <Form>
            <fieldset>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="data">Model</Form.Label>
                    <Form.Select id="data">
                        <option>Cycle Thresholds</option>
                        <option>SARS-CoV-2 Antibodies</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="data">Dataset</Form.Label>
                    <Form.Select id="data">
                        <option>Legacy</option>
                    </Form.Select>
                </Form.Group>
            </fieldset>
        </Form>
    </Col>
}