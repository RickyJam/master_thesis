class LineRecord {
  line;
  dateTime;
  useKW;
  genKW;
  specificMetrics;

  constructor(line) {
    this.line = line;
  }

  parseLine() {
    const [dateTime, useKW, genKW, ...specificMetrics] = this.line.split(",");
    this.dateTime = new Date(dateTime);
    this.genKW = genKW;
    this.useKW = useKW;
    this.specificMetrics = specificMetrics;
  }
}

export default LineRecord;