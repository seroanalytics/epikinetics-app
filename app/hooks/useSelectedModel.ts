import {useParams} from "@remix-run/react";
import {useContext} from "react";
import {AppContext, RootContext} from "~/RootContext";

export default function useSelectedModel() {
    const params = useParams();
    const {state,} = useContext<AppContext>(RootContext);

    if (!params.model) {
        return [200, null]
    }
    const selectedModel = state.models.find(m => m.key == params.model);

    if (!selectedModel) {
        return [404, `Model with key ${params.model} not found`]
    }
    const selectedDataset = selectedModel?.datasets.find(d => d.key == params.dataset);
    if (!selectedDataset) {
        return [404, `Dataset with key ${params.dataset} not found`]
    }

    const selectedRegressionModel = selectedModel?.regressionModels.find(c => c.key == params.covariate);

    if (!selectedRegressionModel) {
        return [404, `Covariate with key ${params.covariate} not found`]
    }

    return [200, {
        selectedModel,
        selectedDataset,
        selectedRegressionModel
    }]
}
