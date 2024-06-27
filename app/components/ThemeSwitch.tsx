import {MoonStar, Sun} from "lucide-react";
import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";

export default ({theme, setTheme}) => {

    const tooltip = (
        <Tooltip id="tooltip">
            Toggle theme
        </Tooltip>
    );

    return (
        <OverlayTrigger placement="left" overlay={tooltip}>
            {theme === "dark" ? (
                <Button aria-label="theme-dark" variant="ghost" size="icon" onClick={() => setTheme("light")}>
                    <MoonStar/>
                </Button>
            ) : (
                <Button aria-label="theme-light" variant="ghost" size="icon" onClick={() => setTheme("dark")}>
                    <Sun/>
                </Button>
            )}
        </OverlayTrigger>
    );
};