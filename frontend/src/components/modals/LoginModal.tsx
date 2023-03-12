import React, { useState } from "react";
import { Button, Modal, TextField, Typography, Box } from "@mui/material";

type LoginModalProps = {
  open: boolean;
  onClose: () => void;
};

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginModal = ({ open, onClose }: LoginModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  //   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     console.log(email, password);
  //   };

  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(formValues);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();
      console.log(`Data successful = ${data}`);

      if (response.ok) {
        alert(`Login Successful`);
      } else {
        alert(`Login Failed`);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Modal open={open} onClose={onClose} sx={styles.modal}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <Typography sx={styles.title}>MARGAUX</Typography>
        </div>
        <div>
          <Typography sx={styles.desc}>Log in to your account</Typography>
        </div>
        <div>
          <TextField
            label="E-MAIL"
            variant="standard"
            value={formValues.email}
            onChange={handleInputChange}
            required
            InputLabelProps={{
              style: {
                fontSize: "12px",
              },
            }}
            name="email"
          />
        </div>
        <div>
          <TextField
            label="PASSWORD"
            type="password"
            variant="standard"
            value={formValues.password}
            onChange={handleInputChange}
            required
            InputLabelProps={{
              style: {
                fontSize: "12px",
              },
            }}
            name="password"
          />
        </div>
        <div>
          <Button type="submit" variant="contained" sx={styles.login}>
            Login
          </Button>
        </div>
      </form>
    </Modal>
  );
};

//Styling
type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";

const styles: {
  modal: React.CSSProperties;
  form: React.CSSProperties;
  title: React.CSSProperties;
  desc: React.CSSProperties;
  login: React.CSSProperties;
} = {
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    backgroundColor: "#FFF",
    padding: 10,
    width: "300px",
    display: "flex",
    flexDirection: "column" as FlexDirection,
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontWeight: 600,
    fontSize: "30px",
    fontStyle: "italic",
    letterSpacing: "-0.15em",
  },
  desc: {
    textTransform: "uppercase",
    fontSize: "10px",
  },
  login: {
    backgroundColor: "#000",
    padding: "0.4em 5.4em",
    marginTop: 2,
  },
};

export default LoginModal;
