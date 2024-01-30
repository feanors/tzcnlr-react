import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import {
  Add,
  ArrowBackSharp,
  Close,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import {
  Button,
  ButtonGroup,
  Collapse,
  Divider,
  FormControl,
  Modal,
  TextField,
} from "@mui/material";
import { styleModalBox } from "../../globalstyles/styles.ts";

function CreateNewCompanyModal({ isOpen, onClose, onPost }) {
  const [companyName, setCompanyName] = useState("");

  const handleClose = () => {
    onClose();
    setCompanyName("");
  };
  const handlePost = () => {
    onPost(companyName);
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
              label="Yeni Eklenicek Şirket Adı"
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
            />
          </FormControl>

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
      </Box>
    </Modal>
  );
}

function CreateNewBranchModal({ isOpen, onClose, onPost, selectedCompany }) {
  const [branchName, setBranchName] = useState("");

  const handleClose = () => {
    onClose();
    setBranchName("");
  };
  const handlePost = () => {
    onPost(selectedCompany, branchName);
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
          <TextField
            fullWidth
            id="outlined-read-only-input"
            label="Şubenin Ekleneceği Şirket"
            value={selectedCompany}
            InputProps={{
              readOnly: true,
            }}
          />
          <br />
          <FormControl fullWidth>
            <TextField
              required
              id="outlined-required"
              label="Yeni Eklenicek Şube Adı"
              value={branchName}
              onChange={(event) => setBranchName(event.target.value)}
            />
          </FormControl>

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
      </Box>
    </Modal>
  );
}

function DeleteBranchModal({
  isOpen,
  onClose,
  onPost,
  selectedBranch,
  selectedCompany,
}) {
  const handlePost = () => {
    onPost(selectedCompany, selectedBranch);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModalBox}>
        <Box display={"flex"} justifyContent={"right"}>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <br />
        <TextField
          fullWidth
          id="outlined-read-only-input1"
          label="Silinecek Şubenin Ait Olduğu Şirket"
          value={selectedCompany}
          InputProps={{
            readOnly: true,
          }}
        />
        <br />
        <br />
        <TextField
          fullWidth
          id="outlined-read-only-input2"
          label="Silinecek Şubenin Adı"
          value={selectedBranch}
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

function EditModal({
  isOpen,
  onClose,
  onPost,
  selectedBranch,
  selectedCompany,
}) {
  const [newBranchName, setNewBranchName] = useState("");

  const handleClose = () => {
    onClose();
    setNewBranchName("");
  };

  const handlePost = () => {
    onPost(selectedCompany, selectedBranch, newBranchName);
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
          label="Değiştirilecek Şubenin Ait Olduğu Şirket"
          value={selectedCompany}
          InputProps={{
            readOnly: true,
          }}
        />
        <br />
        <br />

        <TextField
          fullWidth
          id="outlined-read-only-input"
          label="Değiştirilecek Şubenin Adı"
          value={selectedBranch}
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
          label="Değiştirilecek Şubenin Yeni Adı"
          value={newBranchName}
          onChange={(event) => {
            setNewBranchName(event.target.value);
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

export default function CompanyBranch({
  companies,
  companyBranchMap,
  handlePostNewCompany,
  handlePostNewBranch,
  handleDeletebranchByName,
  handleUpdateBranchByName,
  handleFetchCompanies,
  handleFetchCompanyBranchMap,
}) {
  useEffect(() => {
    handleFetchCompanies();
    handleFetchCompanyBranchMap();
  }, []);
  useEffect(() => {
    setBranchViewOpenArray(new Array(companies.length).fill(false));
  }, [companies]);

  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [createBranchModalOpen, setCreateBranchModalOpen] =
    React.useState(false);
  const [createCompanyModalOpen, setcreateCompanyModalOpen] =
    React.useState(false);

  const openCreateCompanyModal = () => setcreateCompanyModalOpen(true);
  const closeCreateCompanyModal = () => setcreateCompanyModalOpen(false);

  const openCreateBranchModal = () => setCreateBranchModalOpen(true);
  const closeCreateBranchModal = () => setCreateBranchModalOpen(false);

  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);

  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  const handleDetailedViewChange = (toggleIndex: number) => {
    const updatedViewState = branchViewOpenArray.map((val, index) => {
      if (toggleIndex == index) {
        return !val;
      }
      return val;
    });
    setBranchViewOpenArray(updatedViewState);
  };

  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [branchViewOpenArray, setBranchViewOpenArray] = React.useState(
    new Array(1).fill(false),
  );

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
        ŞİRKETLER VE ŞUBELER
      </Typography>

      <br />
      <br />

      <Box justifyContent={"center"} display={"flex"}>
        <Button
          sx={{ width: "94%" }}
          onClick={openCreateCompanyModal}
          fullWidth
          variant={"contained"}
          color={"success"}
        >
          <Add />
          <Typography>Yeni ŞİRKET Ekle</Typography>
        </Button>
        <CreateNewCompanyModal
          isOpen={createCompanyModalOpen}
          onClose={closeCreateCompanyModal}
          onPost={handlePostNewCompany}
        />
      </Box>

      <br />
      <br />

      <List>
        {companies.map(({ id, companyName }, index) => (
          <Box key={id}>
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography variant={"h5"}>{companyName}</Typography>
              <IconButton
                sx={{ borderRadius: "0" }}
                onClick={() => handleDetailedViewChange(index)}
              >
                {branchViewOpenArray[index] ? (
                  <Typography>Şubeleri Gizle</Typography>
                ) : (
                  <Typography>Şubeleri Göster</Typography>
                )}
                {branchViewOpenArray[index] ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </ListItem>
            <Collapse
              in={branchViewOpenArray[index]}
              timeout="auto"
              unmountOnExit
            >
              <Box display={"flex"} flexDirection={"column"}>
                <List sx={{ marginLeft: "5%" }}>
                  {companyBranchMap.has(companyName) &&
                    companyBranchMap
                      .get(companyName)
                      .map(({ branchName, id }) => (
                        <Box key={id}>
                          <ListItem
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography variant={"h4"} fontSize={18}>
                              {branchName}
                            </Typography>

                            <ButtonGroup size={"small"}>
                              <Button
                                onClick={() => {
                                  openEditModal();
                                  setSelectedCompany(companyName);
                                  setSelectedBranch(branchName);
                                }}
                                variant={"outlined"}
                                color={"warning"}
                              >
                                Düzenle
                              </Button>
                              <EditModal
                                isOpen={editModalOpen}
                                onClose={closeEditModal}
                                onPost={handleUpdateBranchByName}
                                selectedBranch={selectedBranch}
                                selectedCompany={selectedCompany}
                              />
                              <Button
                                onClick={() => {
                                  openDeleteModal();
                                  setSelectedCompany(companyName);
                                  setSelectedBranch(branchName);
                                }}
                                variant={"contained"}
                                color={"error"}
                              >
                                Sil
                              </Button>
                              <DeleteBranchModal
                                isOpen={deleteModalOpen}
                                onClose={closeDeleteModal}
                                selectedBranch={selectedBranch}
                                selectedCompany={selectedCompany}
                                onPost={handleDeletebranchByName}
                              />
                            </ButtonGroup>
                          </ListItem>
                          <Divider orientation={"horizontal"} flexItem />
                        </Box>
                      ))}
                </List>
                <Button
                  onClick={() => {
                    openCreateBranchModal();
                    setSelectedCompany(companyName);
                  }}
                  sx={{ marginLeft: "5%", justifyContent: "left" }}
                  color={"success"}
                >
                  <Add />
                  <Typography variant={"h4"} fontSize={16}>
                    {companyName} YENİ ŞUBE EKLE
                  </Typography>
                </Button>
                <CreateNewBranchModal
                  isOpen={createBranchModalOpen}
                  onClose={closeCreateBranchModal}
                  onPost={handlePostNewBranch}
                  selectedCompany={selectedCompany}
                />
                <Divider />
                <br />
              </Box>
            </Collapse>
          </Box>
        ))}
      </List>
    </Box>
  );
}
