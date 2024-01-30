import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { Close, Error } from "@mui/icons-material";
import { Button, Modal, Typography } from "@mui/material";
import { styleModalBox } from "../../globalstyles/styles.ts";

export default function SelectAllFiltersPopup({ isOpen, onClose }) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={styleModalBox}
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Box display={"flex"} justifyContent={"right"}>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <br />
        <Box display={"flex"} justifyContent={"center"}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Error />
            <br />
            <Typography>Bütün filtreleri seçmeniz lazım</Typography>
          </Box>
        </Box>

        <br />
        <br />

        <Box display={"flex"} flexDirection={"column"}>
          <Button
            onClick={onClose}
            fullWidth
            color={"success"}
            variant={"contained"}
          >
            Tamam
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
