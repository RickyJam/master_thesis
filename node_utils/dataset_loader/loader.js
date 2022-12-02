import FileReader from "./src/FileReader.js";
import LineRecord from "./src/LineRecord.js";
import FS from "fs";

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

async function handleSingleFolder(fileReaders) {
  const mergedHeaders = mergeHeaders(fileReaders);

  let lineRecords;
  do {
    lineRecords = [];
    for (const index in fileReaders) {
      lineRecords.push(await getNewLineWithFixedTime(fileReaders[index]));
    }

    const mergedLine = mergeLines(lineRecords);
  } while (lineRecords.every((record) => record != undefined));
}

async function job(basePath) {
  const fileReaders = [];
  const files = FS.readdirSync(basePath);
  for (const index in files) {
    if (files[index] === ".DS_Store") {
      continue;
    }
    fileReaders.push(await openFile(basePath + files[index]));
  }

  await handleSingleFolder(fileReaders);
}

// job("../../Datasets/csv/HomeA/2014/");
job("../../HomeA/2014/");
