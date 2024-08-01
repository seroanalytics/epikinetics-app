import {json} from "@remix-run/node"; // or cloudflare/deno
import {fs} from "../utils/fs-promises.server";
import {useContext, useEffect} from "react";
import {AppContext, RootContext} from "~/RootContext";
import ConfiguredPlot from "~/components/ConfiguredPlot";
import {useLoaderData, useParams} from "@remix-run/react";
import useSelectedModel from "~/hooks/useSelectedModel";

export const loader = async ({params}) => {
    const jsonDirectory = "./data";
    let data = {};
    try {
        const fileContents = await fs.readFile([jsonDirectory, params.model, params.dataset, params.covariate, "res.json"].join("/"), "utf8");
        data = JSON.parse(fileContents);
    } catch (e) {
        console.error(e);
    }
    return json(
        data,
    );
};

export default function Index() {
    const {state, dispatch} = useContext<AppContext>(RootContext);
    const [status, selected] = useSelectedModel();
    if (status == 404) {
        console.error(selected);
        return <div className={"text-center"}><h1>404</h1>
            <p>{selected}</p>
        </div>
    }
    if (!selected) {
        return null
    }
    const {selectedModel} = selected;
    if (status == 200) {
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
}
