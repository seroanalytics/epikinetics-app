import {Col, Row} from "react-bootstrap";

import {json} from "@remix-run/node"; // or cloudflare/deno
import {useLoaderData} from "@remix-run/react";
import {fs} from "../utils/fs-promises.server";
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import LineChart from "../components/LineChart";
import {ContextValue, initialState, RootContext, rootReducer} from "../RootContext";
import {useContext, useReducer} from "react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const loader = async () => {
    const jsonDirectory = __dirname + "/../../data";
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
                        <LineChart data={data} titre_type={t} history={h}></LineChart>
                    </Col>
                )
            } else {
                return <Col key={"k" + hidx}><LineChart data={data} titre_type={""} history={h}></LineChart></Col>
            }
        })}</Row>
    } else if (state.titre_type == "Facet") {
        return <Row> {
            titre_types.map((t, tidx) => <Col key={"k" + tidx}>
                <LineChart data={data} titre_type={t} history={""} />
            </Col>)}
        </Row>
    } else {
        return <Row>
            <Col>
                <LineChart
                    data={data} titre_type={""}
                    history={""} />
            </Col>
        </Row>
    }
}
