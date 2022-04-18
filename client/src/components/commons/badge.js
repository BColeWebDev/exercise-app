import { Chip } from "@mui/material";

const Badge = ({ label }) => {
    return (<>
        <Chip label={`${label}`} sx={{ textTransform: "capitalize" }} color="secondary" variant="outlined" />
    </>);
}

export default Badge;