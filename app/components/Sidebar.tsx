import Form from 'react-bootstrap/Form';
import {Col} from "react-bootstrap";
import React, {useContext} from "react";
import {AppContext, RootContext} from "../RootContext";
import PlotForm from "./PlotForm";
import {useNavigate, useParams} from "@remix-run/react";
import useSelectedModel from "~/hooks/useSelectedModel";

export default function Sidebar() {

    const {state, dispatch} = useContext<AppContext>(RootContext)
    const navigate = useNavigate();
    const params = useParams();
    const [status, selected] = useSelectedModel();

    if (status == 404 || !selected) {
        return null
    }

    const {selectedModel, selectedDataset, selectedRegressionModel} = selected;

    function onSelectModel(e) {
        const dataset = selectedModel.datasets[0]!!;
        const covariate = selectedModel?.regressionModels[0]!!;
        navigate(["/model", e.target.value, dataset.key, covariate.key].join("/"));
    }

    function onSelectData(e) {
        navigate(["/model", selectedModel.key, e.target.value, selectedRegressionModel].join("/"));
    }

    function onSelectCovariates(e) {
        navigate(["/model", selectedModel.key, selectedDataset.key, e.target.value].join("/"))
    }

    return <Col xs="3" className="pt-3 border-1 border-end border-secondary">
        <Form method="post">
            <fieldset>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="model">Model</Form.Label>
                    <Form.Select id="model" onChange={onSelectModel} value={params.model}>
                        {state.models.map(m =>
                            <option key={m.key} value={m.key}>{m.displayName}</option>)}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="data">Dataset</Form.Label>
                    <Form.Select id="data" onChange={onSelectData} value={params.dataset}>
                        {selectedModel.datasets.map(d =>
                            <option key={d.key} value={d.key}>{d.displayName}</option>)}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="covariates">Covariates</Form.Label>
                    <Form.Select id="covariates" onChange={onSelectCovariates} value={params.covariate}>
                        {selectedModel.regressionModels.map(c =>
                            <option key={c.key} value={c.key}>{c.displayName}</option>)}
                    </Form.Select>
                </Form.Group>
                <hr/>
                {selectedModel.plots.map(p => <PlotForm plot={p} key={p.key}></PlotForm>)}
            </fieldset>
        </Form>
    </Col>
}