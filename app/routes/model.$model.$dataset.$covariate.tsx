import {json} from "@remix-run/node"; // or cloudflare/deno
import {fs} from "../utils/fs-promises.server";
import {useContext, useEffect} from "react";
import {AppContext, RootContext} from "~/RootContext";
import ConfiguredPlot from "~/components/ConfiguredPlot";
import {useLoaderData, useParams} from "@remix-run/react";
import useSelectedModel from "~/hooks/useSelectedModel";

interface Response {
    status: "ERROR" | "SUCCESS"
    data?: any
    message?: string
}

export const loader = async ({params}) => {
    const jsonDirectory = "./data";
    let data: Response;
    try {
        const fileContents = await fs.readFile([jsonDirectory, params.model, params.dataset, params.covariate, "res.json"].join("/"), "utf8");
        data = {status: "SUCCESS", data: JSON.parse(fileContents)};
    } catch (e) {
        console.error(e);
        data = {status: "ERROR", message: "Data file not found"}
    }
    return json(
        data,
    );
};

export default function Index() {
    const {state, dispatch} = useContext<AppContext>(RootContext);
    const [status, selected] = useSelectedModel();
    const data = useLoaderData<Response>();
    if (status == 404) {
        console.error(selected);
        return <div className={"text-center"}><h1>404</h1>
            <p>{selected}</p>
        </div>
    }
    if (!selected) {
        return null
    }
    if (data.status == "ERROR") {
        console.error("Data not found");
        return <div className={"text-center"}><h1>404</h1>
            <p>{data.message}</p>
        </div>
    }
    const {selectedModel} = selected;

    return data.data && selectedModel.plots.map(p => <ConfiguredPlot key={p.key} plot={p} data={data.data}></ConfiguredPlot>)
}
