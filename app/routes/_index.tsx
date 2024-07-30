import {Col, Row} from "react-bootstrap";

import {json} from "@remix-run/node"; // or cloudflare/deno
import {useLoaderData} from "@remix-run/react";
import {fs} from "../utils/fs-promises.server";
import {ContextValue, RootContext} from "../RootContext";
import {useContext} from "react";
import LocalPlot from "../components/LocalPlot";

export const loader = async () => {
    const jsonDirectory = "./data";
    // Read the json data file data.json
    const fileContents = await fs.readFile(jsonDirectory + "/res.json", "utf8");
    // Parse the json data file contents into a json object
    const data = JSON.parse(fileContents);

    return json(
        data,
    );
};

export default function Index() {
    const data = useLoaderData<typeof loader>();
    const {state} = useContext<ContextValue>(RootContext);

    const titre_types = [...new Set(data.map(entry => entry.titre_type))]
    const histories = [...new Set(data.map(entry => entry.infection_history))]
    if (state.history == "Facet") {
        return <Row> {histories.map((h, hidx) => {
            if (state.titre_type == "Facet") {
                return titre_types.map((t, tidx) => <Col xs="4" key={"k" + hidx + "" + tidx}>
                        <LocalPlot data={data} titre_type={t} history={h}></LocalPlot>
                    </Col>
                )
            } else {
                return <Col key={"k" + hidx}><LocalPlot data={data} titre_type={""} history={h}></LocalPlot></Col>
            }
        })}</Row>
    } else if (state.titre_type == "Facet") {
        return <Row> {
            titre_types.map((t, tidx) => <Col key={"k" + tidx}>
                <LocalPlot data={data} titre_type={t} history={""}/>
            </Col>)}
        </Row>
    } else {
        return <Row>
            <Col>
                <LocalPlot data={data} titre_type={""} history={""}></LocalPlot>
            </Col>
        </Row>
    }
}
