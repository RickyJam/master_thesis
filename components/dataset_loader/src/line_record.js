class LineRecord {
  line;
  dateTime;
  useKW;
  genKW;
  specificMetrics;

  constructor(line) {
    this.line = line || "";
  }

  parseLine() {
    const [dateTime, useKW, genKW, ...specificMetrics] = this.line.split(",");
    this.dateTime = new Date(dateTime);
    this.genKW = genKW;
    this.useKW = useKW;
    this.specificMetrics = specificMetrics;
  }

  deepClone({ header = false, specificMetrics = false }) {
    const clone = new LineRecord(this.line);
    if (header) {
      clone.dateTime = this.dateTime;
      clone.genKW = this.genKW;
      clone.useKW = this.useKW;
    }
    if (specificMetrics) {
      clone.specificMetrics = [...this.specificMetrics];
    } else {
      clone.specificMetrics = [];
    }
    return clone;
  }

  getNumberOfParameters() {
    let total = this.specificMetrics.length;
    total += this.useKW != undefined ? 1 : 0;
    total += this.dateTime != undefined ? 1 : 0;
    total += this.genKW != undefined ? 1 : 0;
    return total;
  }
}

export default LineRecord;
