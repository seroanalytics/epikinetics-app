import {json} from "@remix-run/node"; // or cloudflare/deno
import {fs} from "../utils/fs-promises.server";
import {useContext, useEffect} from "react";
import {AppContext, RootContext} from "~/RootContext";
import ConfiguredPlot from "~/components/ConfiguredPlot";
import {useLoaderData, useParams} from "@remix-run/react";

export const loader = async ({params}) => {
    const jsonDirectory = "./data";
    const fileContents = await fs.readFile([jsonDirectory, params.model, params.dataset, params.covariate, "res.json"].join("/"), "utf8");
    const data = JSON.parse(fileContents);
    return json(
        data,
    );
};

export default function Index() {
    const params = useParams();
    const {state, dispatch} = useContext<AppContext>(RootContext);
    const selectedModel = state.models.find(m => m.key == params.model)!!;
    const data = useLoaderData<typeof loader>();
    useEffect(() => {
        const newState = {...state}
        newState.selectedPlotOptions = Object.fromEntries(selectedModel.plots.map(p => [p.key,
            Object.fromEntries(selectedModel.variables.concat([selectedModel.regressionModels[0]]).map(
                v => [v.key, "trace"]
            ))
        ]))
        dispatch(newState);
    }, []);

    return data && selectedModel.plots.map(p => <ConfiguredPlot key={p.key} plot={p} data={data}></ConfiguredPlot>)
}
