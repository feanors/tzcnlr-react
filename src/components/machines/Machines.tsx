import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import IconButton from "@mui/material/IconButton";

import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";
import { Add, ArrowBackSharp, Close } from "@mui/icons-material";
import {
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  Modal,
  TextField,
} from "@mui/material";
import { styleModalBox } from "../../globalstyles/styles.ts";

function DeleteMachineModal({ isOpen, onClose, onPost, selectedMachine }) {
  const handleClose = () => {
    onClose();
  };
  const handlePost = () => {
    onPost(selectedMachine);
    handleClose();
  };
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModalBox}>
        <Box display={"flex"} justifyContent={"right"}>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
        <br />
        <TextField
          fullWidth
          id="outlined-read-only-input"
          label="Silinecek Makinenin Adı"
          value={selectedMachine}
          InputProps={{
            readOnly: true,
          }}
        />
        <br />
        <br />

        <Button
          onClick={handlePost}
          fullWidth
          color={"error"}
          variant={"contained"}
        >
          SİL!!
        </Button>
      </Box>
    </Modal>
  );
}

function EditMachineModal({ isOpen, onClose, onPost, selectedMachine }) {
  const [newMachineName, setNewMachineName] = useState("");
  const handleClose = () => {
    onClose();
    setNewMachineName("");
  };

  const handlePost = () => {
    onPost(selectedMachine, newMachineName);
    handleClose();
  };
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModalBox}>
        <Box display={"flex"} justifyContent={"right"}>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
        <br />
        <TextField
          fullWidth
          id="outlined-read-only-input"
          label="Değiştirilecek Makinenin Adı"
          value={selectedMachine}
          InputProps={{
            readOnly: true,
          }}
        />
        <br />
        <br />
        <TextField
          required
          fullWidth
          id="machineNameInput"
          label="Değiştirilecek Makinenin Yeni Adı"
          value={newMachineName}
          onChange={(event) => {
            setNewMachineName(event.target.value);
          }}
        />
        <br />
        <br />
        <Button
          onClick={handlePost}
          fullWidth
          color={"success"}
          variant={"contained"}
        >
          Kaydet
        </Button>
      </Box>
    </Modal>
  );
}

function CreateNewMachineModal({ isOpen, onClose, onPost }) {
  const [newMachineName, setNewMachineName] = useState("");
  const handleClose = () => {
    onClose();
    setNewMachineName("");
  };

  const handlePost = () => {
    onPost(newMachineName);
    handleClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModalBox}>
        <Box display={"flex"} justifyContent={"right"}>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
        <br />
        <Box display={"flex"} flexDirection={"column"}>
          <FormControl fullWidth>
            <TextField
              required
              id="outlined-required"
              label="Yeni Eklenicek Makine Adı"
              value={newMachineName}
              onChange={(event) => setNewMachineName(event.target.value)}
            />
          </FormControl>
          <br />

          <Button
            onClick={handlePost}
            type={"submit"}
            fullWidth
            color={"success"}
            variant={"contained"}
          >
            Kaydet
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default function Machines({
  machines,
  handleUpdateMachineByName,
  handleDeleteMachineByName,
  handlePostNewMachine,
  handleFetchMachines,
  onAuthTokenChange,
  authToken,
}) {
  useEffect(() => {
    onAuthTokenChange();
    handleFetchMachines();
  }, [authToken]);
  const [selectedMachine, setSelectedMachine] = useState("");
  const [createMachineModalOpen, setCreateMachineModalOpen] = useState(false);
  const closeCreateMachineModal = () => setCreateMachineModalOpen(false);
  const openCreateMachineModal = () => setCreateMachineModalOpen(true);

  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const closeDeleteModal = () => setDeleteModalOpen(false);
  const openDeleteModal = () => setDeleteModalOpen(true);

  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const closeEditModal = () => setEditModalOpen(false);
  const openEditModal = () => setEditModalOpen(true);

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Box>
        <IconButton component={Link} to={"/home"} sx={{ borderRadius: "0" }}>
          <ArrowBackSharp />
          Anasayfaya Dön
        </IconButton>
      </Box>

      <br />
      <br />

      <Typography variant={"h5"} textAlign={"center"}>
        Makineler
      </Typography>

      <br />
      <br />

      <Box justifyContent={"center"} display={"flex"}>
        <Button
          sx={{ width: "94%" }}
          onClick={openCreateMachineModal}
          fullWidth
          variant={"contained"}
          color={"success"}
        >
          <Add />
          <Typography>YENİ MAKİNE Ekle</Typography>
        </Button>
        <CreateNewMachineModal
          isOpen={createMachineModalOpen}
          onClose={closeCreateMachineModal}
          onPost={handlePostNewMachine}
        />
      </Box>

      <br />
      <br />

      <List>
        {machines.map(({ machineName, id }) => (
          <Box key={id}>
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography variant={"h4"} fontSize={20}>
                {machineName}
              </Typography>

              <ButtonGroup size={"small"}>
                <Button
                  onClick={() => {
                    openEditModal();
                    setSelectedMachine(machineName);
                  }}
                  variant={"outlined"}
                  color={"warning"}
                >
                  Düzenle
                </Button>
                <EditMachineModal
                  isOpen={editModalOpen}
                  onClose={closeEditModal}
                  onPost={handleUpdateMachineByName}
                  selectedMachine={selectedMachine}
                />

                <Button
                  onClick={() => {
                    openDeleteModal();
                    setSelectedMachine(machineName);
                  }}
                  variant={"contained"}
                  color={"error"}
                >
                  Sil
                </Button>
                <DeleteMachineModal
                  isOpen={deleteModalOpen}
                  onClose={closeDeleteModal}
                  onPost={handleDeleteMachineByName}
                  selectedMachine={selectedMachine}
                />
              </ButtonGroup>
            </ListItem>
            <Divider orientation={"horizontal"} flexItem />
          </Box>
        ))}
      </List>
    </Box>
  );
}
