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

  toDocument(headers) {
    const [_, __, ___, ...remainingHeader] = headers;
    const doc = {
      dateTime: this.dateTime,
      usedKw: convertValue(this.useKW),
      generateKw: convertValue(this.genKW),
    };
    for (const index in remainingHeader) {
      const header = remainingHeader[index];
      const value = convertValue(this.specificMetrics[index]);
      doc[header] = value;
    }
    return doc;
  }
}

const convertValue = (value) => {
  if(!value) return 0.0;
  return parseFloat(value);
}

export default LineRecord;
