import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { ArrowBackSharp, Close } from "@mui/icons-material";
import { Button, ButtonGroup, Divider, Modal, TextField } from "@mui/material";
import { styleModalBox } from "../../globalstyles/styles.ts";

function DeleteCompanyModal({ isOpen, onClose, onPost, selectedCompany }) {
  const handleClose = () => {
    onClose();
  };
  const handlePost = () => {
    onPost(selectedCompany);
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
          label="Silinecek Şirketin Adı"
          value={selectedCompany}
          InputProps={{
            readOnly: true,
          }}
        />
        <br />
        <br />

        <Button
          onClick={handlePost}
          type={"submit"}
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

function EditCompanyModal({ isOpen, onClose, onPost, selectedCompany }) {
  const [newCompanyName, setNewCompanyName] = useState("");
  const handleClose = () => {
    onClose();
    setNewCompanyName("");
  };

  const handlePost = () => {
    onPost(selectedCompany, newCompanyName);
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
          label="Değiştirilecek Şirketin Adı"
          value={selectedCompany}
          InputProps={{
            readOnly: true,
          }}
        />
        <br />
        <br />
        <TextField
          required
          fullWidth
          id="companynameinput"
          label="Değiştirilecek Şirketin Yeni Adı"
          value={newCompanyName}
          onChange={(event) => {
            setNewCompanyName(event.target.value);
          }}
        />
        <br />
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
    </Modal>
  );
}

export default function EditCompany({
  companies,
  handleUpdateCompanyByName,
  handleDeleteCompanyByName,
  handleFetchCompanies,
}) {
  useEffect(() => {
    handleFetchCompanies();
  }, []);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const closeDeleteModal = () => setDeleteModalOpen(false);
  const openDeleteModal = () => setDeleteModalOpen(true);

  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const closeEditModal = () => setEditModalOpen(false);
  const openEditModal = () => setEditModalOpen(true);

  const [selectedCompany, setSelectedCompany] = useState("");

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
        Şirket Düzenleme
      </Typography>

      <br />
      <br />

      <List>
        <Divider orientation={"horizontal"} flexItem />
        {companies.map(({ id, companyName }) => (
          <Box key={id}>
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography variant={"h4"} fontSize={20}>
                {companyName}
              </Typography>
              <ButtonGroup size={"small"}>
                <Button
                  onClick={() => {
                    openEditModal();
                    setSelectedCompany(companyName);
                  }}
                  variant={"outlined"}
                  color={"warning"}
                >
                  Düzenle
                </Button>
                <EditCompanyModal
                  isOpen={editModalOpen}
                  onClose={closeEditModal}
                  onPost={handleUpdateCompanyByName}
                  selectedCompany={selectedCompany}
                />
                <Button
                  onClick={() => {
                    openDeleteModal();
                    setSelectedCompany(companyName);
                  }}
                  variant={"contained"}
                  color={"error"}
                >
                  Sil
                </Button>
                <DeleteCompanyModal
                  isOpen={deleteModalOpen}
                  onClose={closeDeleteModal}
                  onPost={handleDeleteCompanyByName}
                  selectedCompany={selectedCompany}
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
