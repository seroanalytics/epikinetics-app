import Form from "react-bootstrap/Form";
import {Col, Row} from "react-bootstrap";
import React, {ChangeEventHandler, ReactElement, useContext} from "react";
import {AppContext, Covariate, RootContext} from "~/RootContext";
import {useParams} from "@remix-run/react";
import {isEmpty} from "~/utils/utils";
import useSelectedModel from "~/hooks/useSelectedModel";

interface Props {
    covariate: Covariate;
    onSelect: ChangeEventHandler
    selected: string
}

const CovariateOptions = ({covariate, onSelect, selected}: Props): ReactElement => {
    return <Row className={"mt-2"}>
        <Form.Label column sm="6">
            {covariate.displayName}
        </Form.Label>
        <Col sm="6">
            <Form.Select value={selected} id={covariate.key} onChange={onSelect}>
                <option value={"trace"}>Trace</option>
                <option value={"facet"}>Facet</option>
            </Form.Select>
        </Col>
    </Row>
}

export default function PlotForm({plot}): ReactElement[] | null {

    const {state, dispatch} = useContext<AppContext>(RootContext);
    const [status, selected] = useSelectedModel();

    function onSelect(e) {
        const newState = {...state}
        newState.selectedPlotOptions[plot.key][e.target.id] = e.target.value;
        dispatch(newState);
    }

    if (status == 404) {
        return [<h1>404</h1>]
    }

    if (!selected || isEmpty(state.selectedPlotOptions)) {
        return null
    }

    const {selectedModel, selectedRegressionModel} = selected;

    return [<Form.Label key={"label" + plot.key} htmlFor="data">{plot.displayName}</Form.Label>,
        <Form.Group className="mb-3" key={"group" + plot.key}>
            <Form.Text id="help" muted>
                Choose how each variable is displayed
            </Form.Text>
            {[selectedRegressionModel].concat(selectedModel.variables)
                .map(o => <CovariateOptions
                    key={o.key + plot.key}
                    covariate={o}
                    onSelect={onSelect}
                    selected={state.selectedPlotOptions[plot.key][o.key]}
                ></CovariateOptions>)}
        </Form.Group>, <hr key={"hr" + plot.key}/>]
}
