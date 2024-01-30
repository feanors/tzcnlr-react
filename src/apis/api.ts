import dayjs from "dayjs";

const apiURL = import.meta.env.VITE_API_URL;

export type Company = {
  id: number;
  companyName: string;
};

export type Branch = {
  id: number;
  branchName: string;
  companyName: string;
};

export type Machine = {
  id: number;
  machineName: string;
};

export type CompletedTask = {
  id: number;
  companyName: string;
  branchName: string;
  machineName: string;
  taskStartDate: string;
  taskStartTime: string;
  taskDurationInMinutes: string;
  isRental: boolean;
  taskDetail: string;
};

function throwError(response, responseText: string = "") {
  const error = new Error(
    `Network response was not ok: ${response.status} ${response.statusText}`,
  );
  error.status = response.status;
  error.statusText = response.statusText;
  error.responseText = responseText;
  throw error;
}

export const fetchCompanies = async () => {
  const response = await fetch(apiURL + "/api/companies");
  if (!response.ok) {
    throwError(response);
  }
  const companies = (await response.json()) as Company[];
  return companies.sort((a: Company, b: Company) => {
    return a.companyName.localeCompare(b.companyName);
  });
};

export const updateCompanyName = async (
  companyName: string,
  newCompanyName: string,
) => {
  const response = await fetch(
    apiURL + `/api/companies/${encodeURIComponent(companyName)}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ companyName: newCompanyName }),
    },
  );

  if (!response.ok) {
    throwError(response);
  }
};

export const deleteCompanyByName = async (companyName: string) => {
  const response = await fetch(
    apiURL + `/api/companies/${encodeURIComponent(companyName)}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throwError(response);
  }
};

export const postNewCompany = async (companyName: string) => {
  const response = await fetch(apiURL + "/api/companies", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ companyName: companyName }),
  });

  if (!response.ok) {
    throwError(response);
  }
};

export const fetchBranchData = async () => {
  const response = await fetch(apiURL + "/api/branches");
  if (!response.ok) {
    throwError(response);
  }
  const data: Branch[] = (await response.json()) as Branch[];
  const sortedData = data.sort((a: Branch, b: Branch) => {
    return a.branchName.localeCompare(b.branchName);
  });
  const map = new Map<string, Branch[]>();
  sortedData.forEach(({ companyName, branchName, id }) => {
    if (!map.has(companyName)) {
      map.set(companyName, new Array<Branch>(0));
    }
    map.get(companyName).push({ companyName, branchName, id });
  });
  return map;
};

export async function postNewBranch(companyName: string, branchName: string) {
  const response = await fetch(apiURL + "/api/branches", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ companyName: companyName, branchName: branchName }),
  });

  if (!response.ok) {
    throwError(response);
  }
}

export const deleteBranchByName = async (
  companyName: string,
  branchName: string,
) => {
  const response = await fetch(
    apiURL +
      `/api/branches/${encodeURIComponent(companyName)}/${encodeURIComponent(branchName)}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throwError(response);
  }
};

export const updateBranchByName = async (
  companyName: string,
  branchName: string,
  newBranchName: string,
) => {
  const response = await fetch(
    apiURL +
      `/api/branches/${encodeURIComponent(companyName)}/${encodeURIComponent(branchName)}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ branchName: newBranchName }),
    },
  );

  if (!response.ok) {
    throwError(response);
  }
};

export const fetchMachines = async () => {
  const response = await fetch(apiURL + "/api/machines");
  if (!response.ok) {
    throwError(response);
  }
  const machines = (await response.json()) as Machine[];
  return machines.sort((a: Machine, b: Machine) => {
    return a.machineName.localeCompare(b.machineName);
  });
};

export async function postNewMachine(machineName: string) {
  const response = await fetch(apiURL + "/api/machines", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ machineName: machineName }),
  });

  if (!response.ok) {
    throwError(response);
  }
}

export async function updateMachine(
  machineName: string,
  newMachineName: string,
) {
  const response = await fetch(
    `${apiURL}/api/machines/${encodeURIComponent(machineName)}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ machineName: newMachineName }),
    },
  );

  if (!response.ok) {
    throwError(response);
  }
}

export const deleteMachineByName = async (machineName: string) => {
  const response = await fetch(
    apiURL + `/api/machines/${encodeURIComponent(machineName)}`,
    {
      method: "DELETE",
    },
  );
  if (!response.ok) {
    throwError(response);
  }
};

export const postNewCompletedTask = async (
  companyName: string,
  branchName: string,
  machineName: string,
  taskStartDate: dayjs.Dayjs,
  taskStartTime: dayjs.Dayjs,
  taskDurationInMinutes: number,
  taskDetail: string,
  isRental: boolean,
) => {
  const response = await fetch(apiURL + "/api/completedTasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      companyName,
      branchName,
      machineName,
      taskStartDate,
      taskStartTime,
      taskDurationInMinutes,
      taskDetail,
      isRental,
    }),
  });

  if (!response.ok) {
    throwError(response);
  }
};

export const fetchCompletedTasks = async (
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs,
  companyName: string,
  branchName: string,
) => {
  const baseUrl = apiURL + "/api/completedTasks";

  let params = {};

  if (startDate && !startDate.isSame(dayjs("Invalid Date"))) {
    params.startDate = startDate.format("YYYY-MM-DD");
  }
  if (endDate && !endDate.isSame(dayjs("Invalid Date"))) {
    params.endDate = endDate.format("YYYY-MM-DD");
  }
  if (companyName) {
    params.companyName = companyName;
  }
  if (branchName) {
    params.branchName = branchName;
  }

  const queryString = new URLSearchParams(params).toString();

  const urlWithParams = `${baseUrl}?${queryString}`;

  const response = await fetch(urlWithParams);
  if (!response.ok) {
    throwError(response);
  }
  const completedTasks = (await response.json()) as CompletedTask[];

  const sortedCompletedTasks = completedTasks.sort(
    (a: CompletedTask, b: CompletedTask) => {
      const dateDiff: number =
        dayjs(a.taskStartDate).unix() - dayjs(b.taskStartDate).unix();
      if (dateDiff != 0) {
        return dateDiff;
      }
      return dayjs(a.taskStartTime).unix() - dayjs(b.taskStartTime).unix();
    },
  );
  return sortedCompletedTasks;
};

export const login = async (username: string, password: string) => {
  const response = await fetch(apiURL + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const responseText = await response.text();
  if (!response.ok) {
    throwError(response, responseText);
  }
  return responseText;
};
