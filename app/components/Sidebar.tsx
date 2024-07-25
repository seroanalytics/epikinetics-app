import Form from 'react-bootstrap/Form';
import {Col, Row} from "react-bootstrap";
import React, {useContext} from "react";
import {ContextValue, RootContext} from "../RootContext";

export default function Sidebar() {

    const {state, dispatch} = useContext<ContextValue>(RootContext)
    function onSelect(e) {
        const newState = {...state}
        newState[e.target.id] = e.target.value
        dispatch(newState);
    }

    return <Col xs="3" className="pt-3 border-1 border-end border-secondary">
        <Form method="post">
            <fieldset>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="data">Model</Form.Label>
                    <Form.Select id="data">
                        <option>SARS-CoV-2 Antibodies</option>
                        <option>Cycle Thresholds</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="data">Dataset</Form.Label>
                    <Form.Select id="data">
                        <option>Legacy</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="data">Hierarchical variables</Form.Label>
                    <Form.Select id="data">
                        <option>Infection history</option>
                        <option>Last Vax Type</option>
                        <option>Infection history + Last Vax Type</option>
                    </Form.Select>
                </Form.Group>

                <hr/>
                <Form.Label htmlFor="data">Population fits</Form.Label>
                <Form.Group className="mb-3">
                    <Form.Text id="help" muted>
                        Choose how each variable is displayed
                    </Form.Text>
                    <Row className={"mt-2"}>
                        <Form.Label column sm="6">
                            Titre type
                        </Form.Label>
                        <Col sm="6">
                            <Form.Select value={state.titre_type} id="titre_type" onChange={onSelect}>
                                <option>Trace</option>
                                <option>Facet</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row className={"mt-2"}>
                        <Form.Label column sm="6">
                            Infection history
                        </Form.Label>
                        <Col sm="6">
                            <Form.Select value={state.history} id="history" onChange={onSelect}>
                                <option>Trace</option>
                                <option>Facet</option>
                            </Form.Select>
                        </Col>
                    </Row>
                </Form.Group>
                <hr/>
                <Form.Group className={"mb-3"}>
                    <Form.Label htmlFor="data">Peak titre values</Form.Label>
                </Form.Group>
            </fieldset>
        </Form>
    </Col>
}