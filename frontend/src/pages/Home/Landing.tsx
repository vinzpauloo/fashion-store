import React, { useState } from "react";
import { Box, Typography, Link, Button } from "@mui/material";

import "./styles/Landing.scss";

import UserList from "../../components/UserList";
import LoginModal from "../../components/modals/LoginModal";

const Landing = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <Box className="container">
      {/* Men's */}
      <Box className="side left">
        <Box className="image men"></Box>

        <Box className="caption">
          <Typography className="header">Men</Typography>
          <Link sx={styles.link}>
            <Button className="landingBtn">
              2023 Men's Fall/Winter Collection
            </Button>
          </Link>
        </Box>
      </Box>

      <Box sx={styles.centerBtnContainer}>
        <Box sx={styles.centerBtns}>
          <Button sx={styles.centerBtn}>
            <Typography sx={styles.text}>Register</Typography>
          </Button>
          <Button sx={styles.centerBtn} onClick={handleOpenModal}>
            <Typography sx={styles.text}>Login</Typography>
          </Button>
          <LoginModal open={openModal} onClose={handleOpenModal} />
        </Box>
      </Box>

      {/* Women's */}
      <Box className="side right">
        <Box className="image women"></Box>

        <Box className="caption">
          <Typography className="header">Women</Typography>
          <Link sx={styles.link}>
            <Button className="landingBtn">
              2023 Women's Fall/Winter Collection
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

// Styles for MaterialUI sx prop
const styles = {
  centerBtnContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  centerBtns: {
    position: "absolute",
    zIndex: 20,
    display: "flex",
    flexDirection: {
      xs: "row",
      md: "row",
      lg: "column",
    },
    gap: 2,
  },
  centerBtn: {
    backgroundColor: "#FFF",
    color: "#000",
    fontWeight: 600,
    borderRadius: "10px",
    width: {
      xs: "110px",
      md: "110px",
      lg: "200px",
    },
    "&:hover": {
      backgroundColor: "#ffd346",
      color: "#000",
    },
    boxShadow: "1px 1px grey",
  },
  text: {
    fontFamily: "Arial,Helvetica,sans-serif",
    fontSize: 12,
    fontWeight: 600,
  },
  link: {
    textDecoration: "none",
  },
};

export default Landing;
