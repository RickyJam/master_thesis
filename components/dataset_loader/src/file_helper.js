import FileReader from "./file_reader.js";
import LineRecord from "./line_record.js";
import FS from "fs";
import getHeaderByCollection from "./converted_headers.js";
import insertDocIn from "./mongo_loader.js";

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

async function insertLineInMongo(mergedHeaders, mergedLine, mongoCollection) {
  const doc = mergedLine.toDocument(mergedHeaders);
  await insertDocIn(mongoCollection, doc);
}

async function importFiles(fileReaders, mongoCollection) {
  const mergedHeaders = getHeaderByCollection(mongoCollection).split(',');//mergeHeaders(fileReaders);

  let lineRecords;
  do {
    lineRecords = [];
    for (const index in fileReaders) {
      lineRecords.push(await getNewLineWithFixedTime(fileReaders[index]));
    }

    const mergedLine = mergeLines(lineRecords);
    if (mergedLine) {
      await insertLineInMongo(mergedHeaders, mergedLine, mongoCollection);
    }
  } while (lineRecords.every((record) => record != undefined));
}

async function importFolder(path, mongoCollection) {
  const fileReaders = [];
  const files = FS.readdirSync(path);
  for (const file of files) {
    if (file === ".DS_Store") {
      continue;
    }
    fileReaders.push(await openFile(path + file));
  }

  await importFiles(fileReaders, mongoCollection);
}

async function importYearFolders(path, mongoCollection) {
  const yearDirs = FS.readdirSync(path);
  for (const yearFolderName of yearDirs) {
    console.log("import folder: " + yearFolderName + "/", mongoCollection);
    if (yearFolderName !== ".DS_Store") {
      await importFolder(path + yearFolderName + "/", mongoCollection);
    }
  }
}

async function importHomeFolders(basePath) {
  const homeDirs = FS.readdirSync(basePath);
  for (const homefolderName of homeDirs) {
    if (homefolderName !== ".DS_Store") {
      await importYearFolders(
        basePath + homefolderName + "/",
        collectionName[homefolderName]
      );
    }
  }
}

const collectionName = {
  HomeA: "homeA",
  HomeB: "homeB",
  HomeC: "homeC",
  HomeD: "homeD",
  HomeE: "homeE",
  HomeF: "homeF",
};

export default importHomeFolders;
