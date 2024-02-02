import { Navigate, useNavigate, useRoutes } from "react-router-dom";
import HomePage from "./HomePage.tsx";
import NewCompletedTask from "./components/completedtasks/NewCompletedTask.tsx";
import EditCompany from "./components/company/EditCompany.tsx";
import Machines from "./components/machines/Machines.tsx";
import CompanyBranch from "./components/company/CompanyBranch.tsx";
import CompletedTaskDisplay from "./components/completedtasks/CompletedTaskDisplay.tsx";
import { useEffect, useState } from "react";
import {
  Branch,
  Company,
  CompletedTask,
  deleteBranchByName,
  deleteCompanyByName,
  deleteMachineByName,
  fetchBranchData,
  fetchCompanies,
  fetchCompletedTasks,
  fetchMachines,
  login,
  Machine,
  postNewBranch,
  postNewCompany,
  postNewCompletedTask,
  postNewMachine,
  updateBranchByName,
  updateCompanyName,
  updateMachine,
} from "./apis/api.ts";
import TransactionStatusModal from "./components/TransactionStatusModal.tsx";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import Login from "./components/login/Login.tsx";

export function AppRoutes() {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyBranchMap, setCompanyBranchMap] = useState<
    Map<string, Branch[]>
  >(new Map());
  const [machines, setMachines] = useState<Machine[]>([]);
  const [completedTasks, setCompletedTasks] = useState<CompletedTask[]>([]);
  const [txStatus, setTxStatus] = useState("");
  const [progressModalOpen, setProgressModalOpen] = useState(false);
  const closeProgressModal = () => setProgressModalOpen(false);
  const openProgressModal = () => setProgressModalOpen(true);

  const updateFetchWithJWT = () => {
    const originalFetch = window.fetch;

    window.fetch = (url, options = {}) => {
      const mergedHeaders = {
        Authorization: `Bearer ${authToken}`,
        ...options.headers,
      };

      const requestOptions = {
        ...options,
        headers: mergedHeaders,
      };

      return originalFetch(url, requestOptions);
    };
  };

  useEffect(() => {
    updateFetchWithJWT();
    // auth check
    handleFetchMachines();
  }, [authToken]);

  const handleAPICall = async (apiMethod, onSuccess, displayStatus = true) => {
    setTxStatus("pending");
    if (displayStatus) {
      openProgressModal();
    }
    try {
      const json = await apiMethod();
      setTxStatus("success");
      onSuccess(json);
    } catch (error) {
      if (error.status == 401) {
        navigate("/login");
        if (error.responseText == "wrong credentials\n") {
          setTxStatus("authFailed");
        } else {
          setTxStatus("unAuth");
        }
      } else {
        setTxStatus("fail");
      }
    }
  };
  const handlePostNewMachine = (machineName: string) => {
    handleAPICall(() => postNewMachine(machineName), handleFetchMachines);
  };
  const handleFetchMachines = () => {
    handleAPICall(() => fetchMachines(), setMachines, false);
  };
  const handleDeleteMachineByName = (machineName: string) => {
    handleAPICall(() => deleteMachineByName(machineName), handleFetchMachines);
  };
  const handleUpdateMachineByName = (
    machineName: string,
    newMachineName: string,
  ) => {
    handleAPICall(
      () => updateMachine(machineName, newMachineName),
      handleFetchMachines,
    );
  };
  const handlePostNewCompany = (companyName: string) => {
    handleAPICall(() => postNewCompany(companyName), handleFetchCompanies);
  };
  const handleFetchCompanies = () => {
    handleAPICall(() => fetchCompanies(), setCompanies, false);
  };
  const handleDeleteCompanyByName = (companyName: string) => {
    handleAPICall(
      () => deleteCompanyByName(companyName),
      () => {
        handleFetchCompanies();
        handleFetchCompanyBranchMap();
      },
    );
  };
  const handleUpdateCompanyByName = (
    companyName: string,
    newCompanyName: string,
  ) => {
    handleAPICall(
      () => updateCompanyName(companyName, newCompanyName),
      () => {
        handleFetchCompanies();
        handleFetchCompanyBranchMap();
      },
    );
  };
  const handlePostNewBranch = (companyName: string, branchName: string) => {
    handleAPICall(
      () => postNewBranch(companyName, branchName),
      handleFetchCompanyBranchMap,
    );
  };
  const handleFetchCompanyBranchMap = () => {
    handleAPICall(() => fetchBranchData(), setCompanyBranchMap, false);
  };
  const handleDeleteBranchByName = (
    companyName: string,
    branchName: string,
  ) => {
    handleAPICall(
      () => deleteBranchByName(companyName, branchName),
      handleFetchCompanyBranchMap,
    );
  };
  const handleUpdateBranchByName = (
    companyName: string,
    branchName: string,
    newBranchName: string,
  ) => {
    handleAPICall(
      () => updateBranchByName(companyName, branchName, newBranchName),
      handleFetchCompanyBranchMap,
    );
  };
  const handlePostNewCompletedTask = (
    companyName: string,
    branchName: string,
    machineName: string,
    taskStartDate: dayjs.Dayjs,
    taskStartTime: dayjs.Dayjs,
    taskDurationInMinutes: number,
    taskDetail: string,
    isRental: true,
  ) => {
    handleAPICall(
      () =>
        postNewCompletedTask(
          companyName,
          branchName,
          machineName,
          taskStartDate,
          taskStartTime,
          taskDurationInMinutes,
          taskDetail,
          isRental,
        ),
      () => {},
    );
  };
  const handleFetchCompletedTasks = (
    startDate: dayjs.Dayjs,
    endDate: dayjs.Dayjs,
    companyName: string,
    branchName: string,
  ) => {
    handleAPICall(
      () => fetchCompletedTasks(startDate, endDate, companyName, branchName),
      setCompletedTasks,
      false,
    );
  };

  const navigate = useNavigate();
  const handleLogin = (username: string, password: string) => {
    handleAPICall(
      () => login(username, password),
      (token) => {
        localStorage.setItem("token", token);
        setAuthToken(token);
        closeProgressModal();
        navigate("/home");
      },
    );
  };

  return useRoutes([
    { index: true, element: <Navigate replace to="/home" /> },
    {
      path: "/home",
      element: (
        <Box
          paddingLeft={"5%"}
          paddingRight={"5%"}
          maxWidth={"600px"}
          width={"100%"}
        >
          <HomePage />
        </Box>
      ),
    },
    {
      path: "/newCompletedTask",
      element: (
        <Box
          paddingLeft={"5%"}
          paddingRight={"5%"}
          maxWidth={"600px"}
          width={"100%"}
        >
          <NewCompletedTask
            handleFetchMachines={handleFetchMachines}
            handleFetchCompanyBranchMap={handleFetchCompanyBranchMap}
            handleFetchCompanies={handleFetchCompanies}
            companies={companies}
            companyBranchMap={companyBranchMap}
            machines={machines}
            handlePostCompletedTask={handlePostNewCompletedTask}
            authToken={authToken}
            onAuthTokenChange={updateFetchWithJWT}
          />
          <TransactionStatusModal
            isOpen={progressModalOpen}
            onClose={closeProgressModal}
            txStatus={txStatus}
          />
        </Box>
      ),
    },
    {
      path: "/editCompany",
      element: (
        <Box
          paddingLeft={"5%"}
          paddingRight={"5%"}
          maxWidth={"600px"}
          width={"100%"}
        >
          <EditCompany
            handleFetchCompanies={handleFetchCompanies}
            companies={companies}
            handleUpdateCompanyByName={handleUpdateCompanyByName}
            handleDeleteCompanyByName={handleDeleteCompanyByName}
            authToken={authToken}
            onAuthTokenChange={updateFetchWithJWT}
          />
          <TransactionStatusModal
            isOpen={progressModalOpen}
            onClose={closeProgressModal}
            txStatus={txStatus}
          />
        </Box>
      ),
    },
    {
      path: "/machines",
      element: (
        <Box
          paddingLeft={"5%"}
          paddingRight={"5%"}
          maxWidth={"600px"}
          width={"100%"}
        >
          <Machines
            machines={machines}
            handleFetchMachines={handleFetchMachines}
            handleUpdateMachineByName={handleUpdateMachineByName}
            handleDeleteMachineByName={handleDeleteMachineByName}
            handlePostNewMachine={handlePostNewMachine}
            authToken={authToken}
            onAuthTokenChange={updateFetchWithJWT}
          />
          <TransactionStatusModal
            isOpen={progressModalOpen}
            onClose={closeProgressModal}
            txStatus={txStatus}
          />
        </Box>
      ),
    },
    {
      path: "/companyBranch",
      element: (
        <Box
          paddingLeft={"5%"}
          paddingRight={"5%"}
          maxWidth={"600px"}
          width={"100%"}
        >
          <CompanyBranch
            handleFetchCompanies={handleFetchCompanies}
            handleFetchCompanyBranchMap={handleFetchCompanyBranchMap}
            companies={companies}
            companyBranchMap={companyBranchMap}
            handlePostNewCompany={handlePostNewCompany}
            handlePostNewBranch={handlePostNewBranch}
            handleDeletebranchByName={handleDeleteBranchByName}
            handleUpdateBranchByName={handleUpdateBranchByName}
            authToken={authToken}
            onAuthTokenChange={updateFetchWithJWT}
          />
          <TransactionStatusModal
            isOpen={progressModalOpen}
            onClose={closeProgressModal}
            txStatus={txStatus}
          />
        </Box>
      ),
    },
    {
      path: "/completedTaskDisplay",
      element: (
        <Box
          paddingLeft={"5%"}
          paddingRight={"5%"}
          maxWidth={"1200px"}
          width={"100%"}
        >
          <CompletedTaskDisplay
            completedTasks={completedTasks}
            handleFetchCompletedTasks={handleFetchCompletedTasks}
            handleFetchCompanyBranchMap={handleFetchCompanyBranchMap}
            handleFetchCompanies={handleFetchCompanies}
            companies={companies}
            companyBranchMap={companyBranchMap}
            machines={machines}
            authToken={authToken}
            onAuthTokenChange={updateFetchWithJWT}
          />
        </Box>
      ),
    },
    {
      path: "/login",
      element: (
        <Box
          paddingLeft={"5%"}
          paddingRight={"5%"}
          maxWidth={"450px"}
          width={"100%"}
        >
          <Login handleLogin={handleLogin} />
          <TransactionStatusModal
            isOpen={progressModalOpen}
            onClose={closeProgressModal}
            txStatus={txStatus}
          />
        </Box>
      ),
    },
  ]);
}
