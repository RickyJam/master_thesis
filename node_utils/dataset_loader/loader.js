import FileReader from './src/FileReader.js'
import LineRecord from './src/LineRecord.js'

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
      if (record.dateTime.getMinutes() % 30 == 0) {
        return record;
      }
    }
  } while (record != undefined);
  
  return undefined;
}

async function openFile() {
  const fileReader = new FileReader();
  await fileReader.readHeader();
  return fileReader;
}

async function job() {
  const fileReader = await openFile();
  let record;
  do {
    record = await getNewLineWithFixedTime(fileReader);
    console.log(record.dateTime);
  } while (record != undefined);
}

job();
