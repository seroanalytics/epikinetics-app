import {Col, Row} from "react-bootstrap";
import LocalPlot from "../components/LocalPlot";

export default function Index() {
    return <Col className="pt-3">
        <Row key="r1">
            <Col>
                <LocalPlot></LocalPlot>
            </Col>
            <Col>
                <LocalPlot></LocalPlot></Col>
        </Row>
        <Row key="r2">
            <Col>
                <LocalPlot></LocalPlot>
            </Col>
            <Col>
                <LocalPlot></LocalPlot></Col>
        </Row>
    </Col>
}
