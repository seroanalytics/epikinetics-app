import Form from 'react-bootstrap/Form';
import {Col, Row} from "react-bootstrap";
import React, {useContext} from "react";
import {AppContext, RootContext} from "../RootContext";
import PlotForm from "./PlotForm";

export default function Sidebar() {

    const {state, dispatch} = useContext<AppContext>(RootContext)

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
                        {state.models.map(m =>
                            <option key={m.key} value={m.key}>{m.displayName}</option>)}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="data">Dataset</Form.Label>
                    <Form.Select id="data">
                        {state.selectedModel.datasets.map(d =>
                            <option key={d.key} value={d.key}>{d.displayName}</option>)}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="data">Covariates</Form.Label>
                    <Form.Select id="data">
                        {state.selectedModel.regressionModels.map(c =>
                            <option key={c.key} value={c.key}>{c.displayName}</option>)}
                    </Form.Select>
                </Form.Group>
                <hr/>
                {state.selectedModel.plots.map(p => <PlotForm plot={p} key={p.key}></PlotForm>)}
            </fieldset>
        </Form>
    </Col>
}