import fs from "fs";
import readline from "readline";

class FileReader {
  header;
  iterator;
  constructor(fileName) {
    this.readStream = fs.createReadStream(
      fileName,
      "utf-8"
    );
    this.readL = readline.createInterface({ input: this.readStream });
    this.readL.removeAllListeners();
    this.iterator = this.readL[Symbol.asyncIterator]()
  }

  async readHeader() {
    this.header = await this.readLine();
  }

  async readLine() {
    return (await this.iterator.next()).value;
  }
}

export default FileReader;