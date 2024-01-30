import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { Close } from "@mui/icons-material";
import { Button, CircularProgress, Modal, Typography } from "@mui/material";
import { styleModalBox } from "../globalstyles/styles.ts";

function CircularIndeterminate() {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
}

export default function TransactionStatusModal({ isOpen, onClose, txStatus }) {
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
          {txStatus == "pending" && (
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <CircularIndeterminate />
              <br />
              <Typography>İstek Gönderildi</Typography>
            </Box>
          )}
          {txStatus == "success" && (
            <Typography variant={"h6"} textAlign={"center"}>
              İşlem başarıyla gerçekleştirildi
            </Typography>
          )}
          {txStatus == "fail" && (
            <Typography variant={"h6"} textAlign={"center"}>
              İşlem gerçekleştirilemedi, lütfen tekrar deneyin
            </Typography>
          )}
          {txStatus == "unAuth" && (
            <Typography variant={"h6"} textAlign={"center"}>
              Lütfen önce giriş yapınız
            </Typography>
          )}
          {txStatus == "authFailed" && (
            <Typography variant={"h6"} textAlign={"center"}>
              Hatalı kullanıcı adı/şifre
            </Typography>
          )}
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
