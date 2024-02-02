import {
  DataGrid,
  GridColDef,
  GridComparatorFn,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import dayjs from "dayjs";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ArrowBackSharp, CalculateRounded, Save } from "@mui/icons-material";
import { CompletedTask } from "../../apis/api.ts";
import FilterDrawer from "./FilterDrawer.tsx";
import * as React from "react";
import { useEffect, useState } from "react";
import List from "@mui/material/List";
import TimePerMachineModal from "./TimePerMachineModal.tsx";
import SelectAllFiltersPopup from "./SelectAllFiltersPopup.tsx";
import { CSVLink } from "react-csv";

const dateComperatorAsc: GridComparatorFn<CompletedTask> = (
  a: CompletedTask,
  b: CompletedTask,
) => {
  const dateDiff: number =
    dayjs(a.taskStartDate).unix() - dayjs(b.taskStartDate).unix();
  if (dateDiff != 0) {
    return dateDiff;
  }
  return dayjs(a.taskStartTime).unix() - dayjs(b.taskStartTime).unix();
};

const dateComperatorDesc: GridComparatorFn<CompletedTask> = (
  a: CompletedTask,
  b: CompletedTask,
) => {
  const dateDiff: number =
    dayjs(a.taskStartDate).unix() - dayjs(b.taskStartDate).unix();
  if (dateDiff != 0) {
    return dateDiff * -1;
  }
  return dayjs(a.taskStartTime).unix() - dayjs(b.taskStartTime).unix() * -1;
};
const columns: GridColDef[] = [
  {
    disableColumnMenu: true,
    field: "taskStartDate",
    headerName: "Tarih",
    valueGetter: (params: GridValueGetterParams) => {
      if (params.row.isRental) {
        return dayjs(params.row.taskStartDate).format("DD/MM/YYYY");
      } else {
        return (
          dayjs(params.row.taskStartDate).format("DD/MM/YYYY") +
          " - " +
          dayjs(params.row.taskStartTime).format("HH:mm")
        );
      }
    },

    width: 170,
    sortable: true,
    sortComparator: dateComperatorDesc,
  },
  {
    disableColumnMenu: true,
    sortable: false,
    field: "companyName",
    headerName: "Şirket Adı",
    width: 160,
  },
  {
    disableColumnMenu: true,
    field: "branchName",
    headerName: "Şube Adı",
    width: 160,
    sortable: false,
  },
  {
    disableColumnMenu: true,
    field: "machineName",
    headerName: "Makine Adı",
    width: 160,
    sortable: false,
  },
  {
    disableColumnMenu: true,
    field: "taskDurationInMinutes",
    headerName: "İş süresi",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) => {
      if (params.row.isRental) {
        return `${params.row.taskDurationInMinutes / 1440} gün(kiralık)`;
      } else {
        return `${(params.row.taskDurationInMinutes / 60).toFixed(2)} saat`;
      }
    },
  },
  {
    disableColumnMenu: true,
    field: "taskDetail",
    headerName: "Detay",
    sortable: false,
    width: 200,
  },
];

export default function CompletedTaskDisplay({
  completedTasks,
  handleFetchCompletedTasks,
  handleFetchCompanyBranchMap,
  handleFetchCompanies,
  companies,
  machines,
  companyBranchMap,
}) {
  useEffect(() => {
    handleFetchCompanyBranchMap();
    handleFetchCompanies();
  }, []);

  const [totalMachineTimePerMachine, setTotalMachineTimePerMachine] = useState(
    new Map<string, number>(),
  );
  const [totalMachineTimePerMachineRent, setTotalMachineTimePerMachineRent] =
    useState(new Map<string, number>());
  const [taskSumModal, setTaskSumModal] = React.useState(false);
  const closeTaskSumModal = () => setTaskSumModal(false);
  const openTaskSumModal = () => setTaskSumModal(true);

  const [filtersApplied, setFiltersApplied] = React.useState(false);
  const closeFiltersApplied = () => setFiltersApplied(false);
  const openFiltersApplied = () => setFiltersApplied(true);

  const calculateTotalMachineTime = () => {
    setTotalMachineTimePerMachineRent(new Map());
    setTotalMachineTimePerMachine(new Map());
    const machineMap = new Map<string, number>();
    const machineRentMap = new Map<string, number>();
    completedTasks.forEach((task: CompletedTask) => {
      if (!task.isRental) {
        if (!machineMap.has(task.machineName)) {
          machineMap.set(task.machineName, 0);
        }
        machineMap.set(
          task.machineName,
          machineMap.get(task.machineName) + Number(task.taskDurationInMinutes),
        );
        setTotalMachineTimePerMachine(machineMap);
      } else {
        if (!machineRentMap.has(task.machineName)) {
          machineRentMap.set(task.machineName, 0);
        }
        machineRentMap.set(
          task.machineName,
          machineRentMap.get(task.machineName) +
            Number(task.taskDurationInMinutes),
        );
        setTotalMachineTimePerMachineRent(machineRentMap);
      }
    });
    console.log(totalMachineTimePerMachine);
    console.log(machineMap);
  };

  const [selectedCompany, setSelectedCompanyName] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [startDate, setStartDate] = useState<dayjs.Dayjs>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs>(null);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={"100%"}
      height={"500px"}
    >
      <Box display={"flex"} justifyContent={"space-between"}>
        <IconButton component={Link} to={"/home"} sx={{ borderRadius: "0" }}>
          <ArrowBackSharp />
          Anasayfaya Dön
        </IconButton>
      </Box>
      <FilterDrawer
        companies={companies}
        companyBranchMap={companyBranchMap}
        handleFetchCompletedTasks={handleFetchCompletedTasks}
        selectedCompany={selectedCompany}
        selectedBranch={selectedBranch}
        startDate={startDate}
        endDate={endDate}
        setEndDate={setEndDate}
        setStartDate={setStartDate}
        setSelectedBranch={setSelectedBranch}
        setSelectedCompanyName={setSelectedCompanyName}
      />
      <DataGrid
        sx={{ fontSize: "17px" }}
        getRowHeight={() => "auto"}
        rows={completedTasks}
        columns={columns}
        sortingOrder={["asc", "desc"]}
        disableColumnSelector={true}
        disableRowSelectionOnClick={true}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
          sorting: {
            ...completedTasks.initialState?.sorting,
            sortModel: [
              {
                field: "taskStartDate",
                sort: "asc",
              },
            ],
          },
        }}
        pageSizeOptions={[5, 10, 20]}
      />
      <br />
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent={"space-between"}
      >
        <IconButton
          onClick={() => {
            if (
              selectedCompany &&
              selectedBranch &&
              startDate.isValid() &&
              endDate.isValid()
            ) {
              calculateTotalMachineTime();
              openTaskSumModal();
            } else {
              openFiltersApplied();
            }
          }}
          sx={{ borderRadius: "0", justifyContent: "left" }}
        >
          <Typography fontSize={"20px"}>Hesap dökümü oluştur </Typography>
          <CalculateRounded />
        </IconButton>
        <TimePerMachineModal
          completedTasks={completedTasks}
          startDate={startDate}
          endDate={endDate}
          companyName={selectedCompany}
          branchName={selectedBranch}
          isOpen={taskSumModal}
          onClose={closeTaskSumModal}
          totalMachineTimePerMachine={totalMachineTimePerMachine}
          totalMachineTimePerMachineRent={totalMachineTimePerMachineRent}
        />
        <SelectAllFiltersPopup
          isOpen={filtersApplied}
          onClose={closeFiltersApplied}
        />
        <IconButton sx={{ borderRadius: "0px", justifyContent: "left" }}>
          <CSVLink
            style={{
              color: "inherit",
              fontSize: "inherit",
              fontFamily: "inherit",
              textDecoration: "none",
              display: "flex",
              flexDirection: "row",
            }}
            filename={
              "console.tezcanlarvinc-yedek-" +
              dayjs().format("DD/MM/YYYY") +
              ":" +
              dayjs().format("HH:mm") +
              ".csv"
            }
            data={completedTasks}
          >
            <Typography fontSize={"20px"}>CSV yedeği oluştur</Typography>
            <Save />{" "}
          </CSVLink>
        </IconButton>
      </Stack>
      <List sx={{ maxWidth: "500px" }}></List>
    </Box>
  );
}
