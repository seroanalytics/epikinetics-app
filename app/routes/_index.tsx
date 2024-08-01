import {useNavigate} from "@remix-run/react";
import {AppContext, RootContext} from "../RootContext";
import {useContext, useEffect} from "react";

export default function Index() {
    const {state} = useContext<AppContext>(RootContext);
    const navigate = useNavigate();
    const selectedModel = state.models[0];
    const selectedDataset = selectedModel.datasets[0];
    const selectedCovariate = selectedModel.regressionModels[0];
    useEffect(() => {
        navigate(["/model", selectedModel.key, selectedDataset.key, selectedCovariate.key].join("/"))
    }, []);

    return <h1>Loading data</h1>
}
