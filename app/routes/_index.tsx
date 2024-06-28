import {Col, Row} from "react-bootstrap";

import {json} from "@remix-run/node"; // or cloudflare/deno
import {useLoaderData} from "@remix-run/react";
import {fs} from "../utils/fs-promises.server";
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import LineChart from "../components/LineChart";

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
    const titre_types = [...new Set(data.map(entry => entry.titre_type))]
    const histories = [...new Set(data.map(entry => entry.infection_history))]

    return histories.map((h, hidx) => <Row key={h}>
        {titre_types.map((t, tidx) => {
                return <Col key={"k" + hidx + "" + tidx}>
                    <LineChart data={data} titre_type={t} history={h}></LineChart>
                </Col>
            }
        )}
    </Row>)
}
