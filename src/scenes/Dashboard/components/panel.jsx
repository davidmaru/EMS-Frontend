// src/components/Panel.jsx
import { useState } from "react";
import { useNavigate, useResolvedPath } from "react-router-dom";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import EventIcon from "@mui/icons-material/Event";
import "../scss/panel.scss";

const StyledPanelItem = styled(Box)(({ theme, close }) => ({
  display: "flex",
  alignItems: "center",
  padding: "8px 16px",
  transition: "all 0.3s",
  cursor: "pointer",
  "&:hover": { backgroundColor: theme.palette.action.hover },
  ".text": {
    opacity: close ? 0 : 1,
    width: close ? 0 : "auto",
    overflow: "hidden",
    transition: "opacity 0.3s, width 0.3s",
    whiteSpace: "nowrap",
  },
}));

function PanelItem({
  children,
  text,
  close = false,
  classes = "",
  handler = () => {},
}) {
  return (
    <StyledPanelItem className={`panel-item ${classes}`} onClick={handler} close={close}>
      <span className="icon" style={{ marginRight: "8px" }}>
        {children}
      </span>
      <span className={`text ${close ? "close" : "open"}`}>{text}</span>
    </StyledPanelItem>
  );
}

PanelItem.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string,
  close: PropTypes.bool,
  classes: PropTypes.string,
  handler: PropTypes.func,
};

export default function Panel() {
  const [closed, setClosed] = useState(false);
  const navigate = useNavigate();
  const res = useResolvedPath().pathname;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        width: closed ? "60px" : "200px",
        transition: "width 0.3s",
        height: "100vh",
        backgroundColor: "background.paper",
        boxShadow: 3,
      }}
    >
      <Paper
        sx={{
          padding: "16px",
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <MenuIcon
          fontSize="medium"
          onClick={() => setClosed(!closed)}
          sx={{ cursor: "pointer" }}
        />
      </Paper>
      <PanelItem
        text="Home"
        close={closed}
        classes={res === "/dashboard" ? "active" : ""}
        handler={() => navigate("/dashboard")}
      >
        <HomeIcon />
      </PanelItem>
      <PanelItem
        text="Events"
        close={closed}
        classes={res.startsWith("/dashboard/event") ? "active" : ""}
        handler={() => navigate("/dashboard/event")}
      >
        <EventIcon />
      </PanelItem>
      <PanelItem
        text="Users"
        close={closed}
        classes={res.startsWith("/dashboard/user") ? "active" : ""}
        handler={() => navigate("/dashboard/user")}
      >
        <PersonIcon />
      </PanelItem>
      <PanelItem text="Roles" close={closed}>
        <GroupAddIcon />
      </PanelItem>
      <PanelItem text="Tickets" close={closed}>
        <ConfirmationNumberIcon />
      </PanelItem>
      <Box sx={{ flexGrow: 1 }}></Box>
      <PanelItem text="" close={closed}>
        <AccountCircleIcon fontSize="large" />
      </PanelItem>
      <PanelItem text="" close={closed} handler={() => navigate("/")}>
        <SettingsIcon fontSize="large" />
      </PanelItem>
    </Card>
  );
}
