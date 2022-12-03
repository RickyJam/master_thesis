import FileReader from "./src/file_reader.js";
import LineRecord from "./src/line_record.js";
import FS from "fs";
import formatDocument from "./src/document_formatter.js";
import insertDocIn, {
  closeConnection,
  openConnection,
} from "./src/mongo_loader.js";

async function getLineRecordFromFile(fileReader) {
  const line = await fileReader.readLine();

  if (line) {
    const record = new LineRecord(line);
    record.parseLine();
    return record;
  }

  return undefined;
}

async function getNewLineWithFixedTime(fileReader) {
  let record;

  do {
    record = await getLineRecordFromFile(fileReader);
    if (record) {
      if (record.dateTime.getMinutes() % 30 === 0) {
        return record;
      }
    }
  } while (record != undefined);

  return undefined;
}

async function openFile(filePath) {
  const fileReader = new FileReader(filePath);
  await fileReader.readHeader();
  return fileReader;
}

function mergeLines(lineRecords) {
  const firstDefinedElement = lineRecords.find(
    (record) => record !== undefined
  );
  if (firstDefinedElement === undefined) return;
  const mergedLineRecord = firstDefinedElement.deepClone({ header: true });
  lineRecords.forEach((record) => {
    if (record) {
      mergedLineRecord.specificMetrics = [
        ...mergedLineRecord.specificMetrics,
        ...record.specificMetrics,
      ];
    }
  });
  return mergedLineRecord;
}

function mergeHeaders(fileReaders) {
  const [first, ...remaining] = fileReaders;
  let header = first.header.split(",");

  remaining?.forEach((reader) => {
    const [_, __, ___, ...metricsHeader] = reader.header.split(",");
    header = [...header, ...metricsHeader];
  });

  return header;
}

function insertLineInMongo(mergedHeaders, mergedLine, mongoCollection) {
  console.log("inserimento di un obj in: " + mongoCollection);
}

async function importFiles(fileReaders, mongoCollection) {
  const mergedHeaders = mergeHeaders(fileReaders);

  let lineRecords;
  do {
    lineRecords = [];
    for (const index in fileReaders) {
      lineRecords.push(await getNewLineWithFixedTime(fileReaders[index]));
    }

    const mergedLine = mergeLines(lineRecords);
    insertLineInMongo(mergedHeaders, mergedLine, mongoCollection);
  } while (lineRecords.every((record) => record != undefined));
}

async function importFolder(path, mongoCollection) {
  const fileReaders = [];
  const files = FS.readdirSync(path);
  for (const index in files) {
    if (files[index] === ".DS_Store") {
      continue;
    }
    fileReaders.push(await openFile(path + files[index]));
  }

  await importFiles(fileReaders, mongoCollection);
}

function importYearFolders(path, mongoCollection) {
  FS.readdirSync(path).forEach((yearFolderName) => {
    if (yearFolderName !== ".DS_Store") {
      importFolder(path + yearFolderName + "/", mongoCollection);
    }
  });
}

// "../../Datasets/csv/"
function importHomeFolders(basePath) {
  FS.readdirSync(basePath).forEach((homefolderName) => {
    if (homefolderName !== ".DS_Store") {
      importYearFolders(
        basePath + homefolderName + "/",
        collectionName[homefolderName]
      );
    }
  });
}

const collectionName = {
  HomeA: "homeA",
  HomeB: "homeB",
  HomeC: "homeC",
  HomeD: "homeD",
  HomeE: "homeE",
  HomeF: "homeF",
};

openConnection();
importHomeFolders("../../Datasets/csv/");
closeConnection(); // potrebbero esserci problemi di chiusura anticipata per via delle funzion async... vedere