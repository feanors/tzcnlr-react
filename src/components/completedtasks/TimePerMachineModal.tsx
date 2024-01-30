import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { Close, PictureAsPdfSharp } from "@mui/icons-material";
import { Divider, Modal, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import dayjs from "dayjs";

import { pdf } from "@react-pdf/renderer";
import MyDocument from "./PDFView.tsx";
import { useRef, useState } from "react";

const styleModalBoxSum = {
  position: "absolute" as "absolute",

  width: "100%",
  maxWidth: "500px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "100%",
  maxHeight: "800px",
  bgcolor: "background.paper",
  boxShadow: 4,
  borderRadius: "6px",
  p: 4,
};

export default function TimePerMachineModal({
  isOpen,
  onClose,
  totalMachineTimePerMachine,
  totalMachineTimePerMachineRent,
  companyName,
  branchName,
  startDate,
  endDate,
  completedTasks,
}) {
  const downloadLinkRef = useRef(null);
  const [isDocumentReady, setDocumentReady] = useState(false);

  const handleDownloadClick = async () => {
    const blob = await pdf(
      <MyDocument
        totalMachineTimePerMachineRent={totalMachineTimePerMachineRent}
        totalMachineTimePerMachine={totalMachineTimePerMachine}
        startDate={startDate}
        endDate={endDate}
        companyName={companyName}
        branchName={branchName}
        completedTasks={completedTasks}
      />,
    ).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download =
      companyName +
      " - " +
      branchName +
      " - " +
      startDate.format("DD/MM/YYYY") +
      " - " +
      endDate.format("DD/MM/YYYY") +
      ".pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={styleModalBoxSum}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        <Box>
          <Box display={"flex"} justifyContent={"right"}>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>
          <Box display={"flex"} justifyContent={"left"}>
            <Typography textAlign={"left"} fontSize={21} variant={"h4"}>
              Toplam makine çalışma süreleri
            </Typography>
          </Box>
          <br />
          <Box
            display={"flex"}
            justifyContent={"left"}
            flexDirection={"column"}
          >
            <Typography fontSize={17}>Şirket: {companyName}</Typography>
            <Typography fontSize={17}>Şube: {branchName}</Typography>
            <Typography fontSize={17}>
              Tarih aralığı: {dayjs(startDate).format("DD/MM/YYYY")} -{" "}
              {dayjs(endDate).format("DD/MM/YYYY")}
            </Typography>
          </Box>
          <Divider />
          <br />

          <List>
            <ListItem
              key={1999}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: "0",
                maxWidth: "400px",
              }}
            >
              <Typography fontSize={17}>Makine</Typography>
              <Typography fontSize={17}>Süre</Typography>
            </ListItem>
            <Divider />
            {Array.from(totalMachineTimePerMachine).map(
              ([machineName, totalMins], index) => (
                <ListItem
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: "0",
                    maxWidth: "400px",
                  }}
                >
                  <Typography fontSize={17}>{machineName}</Typography>
                  <Typography fontSize={17}>{totalMins / 60} Saat</Typography>
                </ListItem>
              ),
            )}
          </List>
          <br />
          <List>
            <ListItem
              key={1999}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: "0",
                maxWidth: "400px",
              }}
            >
              <Typography fontSize={17}>Makine</Typography>
              <Typography fontSize={17}>Gün(Kiralık)</Typography>
            </ListItem>
            <Divider />
            {Array.from(totalMachineTimePerMachineRent).map(
              ([machineName, totalMins], index) => (
                <ListItem
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: "0",
                    maxWidth: "400px",
                  }}
                >
                  <Typography fontSize={17}>{machineName}</Typography>
                  <Typography fontSize={17}>
                    {totalMins / 1440} Gün(Kiralık)
                  </Typography>
                </ListItem>
              ),
            )}
          </List>
        </Box>

        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <IconButton
            onClick={handleDownloadClick}
            sx={{ borderRadius: "0px" }}
          >
            <PictureAsPdfSharp />
            PDF OLUŞTUR
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
}
