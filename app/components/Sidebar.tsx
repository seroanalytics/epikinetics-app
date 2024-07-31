import Form from 'react-bootstrap/Form';
import {Col} from "react-bootstrap";
import React, {useContext} from "react";
import {AppContext, RootContext} from "../RootContext";
import PlotForm from "./PlotForm";

export default function Sidebar() {

    const {state, dispatch} = useContext<AppContext>(RootContext)

    function onSelectModel(e) {
        const newState = {...state}
        newState.selectedModel = state.models
            .find(m => m.key == e.target.value) ?? state.selectedModel
        dispatch(newState);
    }

    function onSelectData(e) {
        const newState = {...state}
        newState.selectedDataset = state.selectedModel.datasets
            .find(d => d.key == e.target.value) ?? state.selectedDataset
        dispatch(newState);
    }

    function onSelectCovariates(e) {
        const newState = {...state}
        newState.selectedRegressionModel = state.selectedModel.regressionModels
            .find(c => c.key == e.target.value) ?? state.selectedRegressionModel
        dispatch(newState);
    }

    return <Col xs="3" className="pt-3 border-1 border-end border-secondary">
        <Form method="post">
            <fieldset>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="model">Model</Form.Label>
                    <Form.Select id="model" onChange={onSelectModel}>
                        {state.models.map(m =>
                            <option key={m.key} value={m.key}>{m.displayName}</option>)}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="data">Dataset</Form.Label>
                    <Form.Select id="data" onChange={onSelectData}>
                        {state.selectedModel.datasets.map(d =>
                            <option key={d.key} value={d.key}>{d.displayName}</option>)}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="covariates">Covariates</Form.Label>
                    <Form.Select id="covariates" onChange={onSelectCovariates}>
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