import {json} from "@remix-run/node"; // or cloudflare/deno
import {fs} from "../utils/fs-promises.server";
import {AppContext, RootContext} from "../RootContext";
import {useContext} from "react";
import ConfiguredPlot from "~/components/ConfiguredPlot";
import {useLoaderData} from "@remix-run/react";

export const loader = async () => {
    const jsonDirectory = "./data";
    const fileContents = await fs.readFile([jsonDirectory, "legacy", "infection_history", "res.json"].join("/"), "utf8");
    const data = JSON.parse(fileContents);

    return json(
        data,
    );
};

export default function Index() {
    const {state} = useContext<AppContext>(RootContext);
    const data = useLoaderData<typeof loader>();
    return state.selectedModel.plots.map(p => <ConfiguredPlot key={p.key} plot={p} data={data}></ConfiguredPlot>)
}
