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

async function handleSingleFolder(fileReaders) {

  let haveRecords = true;
  do {
    let lineRecords = [];
    for (const index in fileReaders) {
      lineRecords.push(await getNewLineWithFixedTime(fileReaders[index]));
    }
    haveRecords = lineRecords.every((record) => record != undefined)
  } while (haveRecords);
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

job("../../Datasets/csv/HomeA/2014/");

