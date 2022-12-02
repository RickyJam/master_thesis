import fs from "fs";
import readline from "readline";

class FileReader {
  header;
  constructor() {
    this.readStream = fs.createReadStream(
      "../../Datasets/csv/HomeA/2014/HomeA-meter2_2014.csv",
      "utf-8"
    );
    this.readL = readline.createInterface({ input: this.readStream });
  }

  async readHeader() {
    this.header = await this.readLine();
  }

  async readLine() {
    return (await this.readL[Symbol.asyncIterator]().next()).value;
  }
}

export default FileReader;