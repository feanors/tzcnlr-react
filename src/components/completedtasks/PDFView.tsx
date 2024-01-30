// PDFView.tsx
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import dayjs from "dayjs";
import RobotoMedium from "../../assets/Roboto-Medium.ttf";
import { useState } from "react";

Font.register({
  family: "Roboto",
  format: "truetype",
  src: RobotoMedium,
});

const styles = StyleSheet.create({
  divided: {
    marginTop: 35,
    marginBottom: 3,
  },
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontFamily: "Roboto",
  },
  section: {
    margin: 10,
    padding: 10,
    fontFamily: "Roboto",
  },
  header: {
    fontSize: 15,
    marginBottom: 10,
    fontFamily: "Roboto",
  },
  subHeader: {
    fontSize: 13,
    marginVertical: 5,
    fontFamily: "Roboto",
  },
  listItem: {
    marginRight: 300,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 10,
    marginVertical: 2,
    fontFamily: "Roboto",
  },
  list: {
    fontFamily: "Roboto",
  },
  body: {
    fontFamily: "Roboto",
  },
  table: {
    marginTop: 2,
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    fontFamily: "Roboto",
    marginBottom: 9,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
    fontFamily: "Roboto",
  },
  tableCol: {
    width: "16.6%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 0,
    fontFamily: "Roboto",
  },
  tableCell: {
    marginLeft: 5,
    textAlign: "left",
    marginTop: 5,
    fontSize: 10,
    fontFamily: "Roboto",
  },
  listHeaderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 10,
    marginVertical: 2,
    fontFamily: "Roboto",
  },
  listHeader: {
    borderBottom: 1,
    borderStyle: "solid",
    marginRight: 300,
    marginBottom: 1,
  },
});

const MyDocument = ({
  companyName,
  branchName,
  startDate,
  endDate,
  totalMachineTimePerMachine,
  totalMachineTimePerMachineRent,
  completedTasks,
}) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  return (
    <Document style={styles.body}>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.subHeader}>Şirket: {companyName}</Text>
          <Text style={styles.subHeader}>Şube: {branchName}</Text>
          <Text style={styles.subHeader}>
            Tarih aralığı: {dayjs(startDate).format("DD/MM/YYYY")} -{" "}
            {dayjs(endDate).format("DD/MM/YYYY")}
          </Text>
        </View>
        <View style={styles.divided}>
          <Text style={styles.subHeader}>İş Tablosu</Text>
        </View>{" "}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Tarih</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Şirket</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Şube</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Makine</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Süre</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Detay</Text>
            </View>
          </View>
          {completedTasks.map((task, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {task.isRental &&
                    dayjs(task.taskStartDate).format("DD/MM/YYYY")}
                  {!task.isRental &&
                    dayjs(task.taskStartDate).format("DD/MM/YYYY") +
                      " " +
                      dayjs(task.taskStartTime).format("HH:mm")}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{task.companyName}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{task.branchName}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{task.machineName}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {task.isRental &&
                    task.taskDurationInMinutes / 1440 + " Gün(Kiralık)"}
                  {!task.isRental && task.taskDurationInMinutes / 60 + " Saat"}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{task.taskDetail}</Text>
              </View>
              {/* ... other columns ... */}
            </View>
          ))}
        </View>
        <View style={styles.divided}>
          <Text style={styles.subHeader}>Toplam makine çalışma süreleri</Text>
        </View>
        <View style={styles.listHeader}>
          <View style={styles.listHeaderItem}>
            <Text>Makine</Text>
            <Text>Süre</Text>
          </View>
        </View>
        <View style={styles.list}>
          {Array.from(totalMachineTimePerMachine).map(
            ([machineName, totalMins], index) => (
              <View key={index} style={styles.listItem}>
                <Text>{machineName}</Text>
                <Text>{totalMins / 60} Saat</Text>
              </View>
            ),
          )}
        </View>
        <View style={styles.list}>
          {Array.from(totalMachineTimePerMachineRent).map(
            ([machineName, totalMins], index) => (
              <View key={index} style={styles.listItem}>
                <Text>{machineName}</Text>
                <Text>{totalMins / 1440} Gün(Kiralık)</Text>
              </View>
            ),
          )}
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
