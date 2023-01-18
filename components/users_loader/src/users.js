const HomeA = [
  {
    userId: "homeOwnerA",
    home: ["homeA"],
    role: "HomeOwner",
    lengthOfStay: {
      from: new Date("2014-01-01"),
      to: undefined,
    },
  },
  {
    userId: "homeOwnerA2",
    home: ["homeA"],
    role: "HomeOwner",
    lengthOfStay: {
      from: new Date("2014-01-01"),
      to: undefined,
    },
  },
];

const HomeB = [
  {
    userId: "homeOwnerB",
    home: ["homeB"],
    role: "HomeOwner",
    lengthOfStay: {
      from: new Date("2014-01-01"),
      to: undefined,
    },
  },
];

const HomeC = [
  {
    userId: "homeOwnerC",
    home: ["homeC"],
    role: "HomeOwner",
    lengthOfStay: {
      from: new Date("2014-01-01"),
      to: undefined,
    },
  },
  {
    userId: "homeOwnerC2",
    home: ["homeC"],
    role: "HomeOwner",
    lengthOfStay: {
      from: new Date("2014-01-01"),
      to: undefined,
    },
  },
  {
    userId: "underageResidentC1",
    home: ["homeC"],
    role: "UnderageResident",
    lengthOfStay: {
      from: new Date("2014-01-01"),
      to: undefined,
    },
  },
];

const HomeD = [
  {
    userId: "tenantD1",
    home: ["homeD"],
    role: "Tenant",
    lengthOfStay: {
      from: new Date("2015-07-21"),
      to: new Date("2015-12-31"),
    },
  },
  {
    userId: "tenantD2",
    home: ["homeD"],
    role: "Tenant",
    lengthOfStay: {
      from: new Date("2016-01-01"),
      to: new Date("2016-05-09"),
    },
  },
];

const HomeE = [
  {
    userId: "tenantE1",
    home: ["homeE"],
    role: "Tenant",
    lengthOfStay: {
      from: new Date("2016-06-09"),
      to: new Date("2016-12-31"),
    },
  },
];

const HomeF = [
  {
    userId: "tenantF1",
    home: ["homeF"],
    role: "Tenant",
    lengthOfStay: {
      from: new Date("2014-01-01"),
      to: new Date("2014-12-31"),
    },
  },
  {
    userId: "homeOwnerF1",
    home: ["homeF"],
    role: "HomeOwner",
    lengthOfStay: {
      from: new Date("2015-01-01"),
      to: undefined,
    },
  },
  {
    userId: "homeOwnerF2",
    home: ["homeF"],
    role: "HomeOwner",
    lengthOfStay: {
      from: new Date("2015-01-01"),
      to: undefined,
    },
  },
  {
    userId: "underageResidentF1",
    home: ["homeF"],
    role: "UnderageResident",
    lengthOfStay: {
      from: new Date("2015-01-01"),
      to: undefined,
    },
  },
];

const others = [
  // ResidanceOwner
  {
    userId: "residenceOwner",
    home: ["homeA", "homeB", "homeC", "homeD", "homeE", "homeF"],
    role: "ResidenceOwner",
    lengthOfStay: undefined,
  },

  // CleaningCompanyEmployee
  {
    userId: "cleaningCompanyEmployee1",
    home: ["homeA", "homeF"],
    role: "CleaningCompanyEmployee",
    lengthOfStay: undefined,

  },
  {
    userId: "cleaningCompanyEmployee2",
    home: ["homeB", "homeE"],
    role: "CleaningCompanyEmployee",
    lengthOfStay: undefined,
  },
  {
    userId: "cleaningCompanyEmployee3",
    home: ["homeC", "homeD"],
    role: "CleaningCompanyEmployee",
    lengthOfStay: undefined,
  },
];

const users = [
  ...HomeA,
  ...HomeB,
  ...HomeC,
  ...HomeD,
  ...HomeE,
  ...HomeF,
  ...others,
];

export default users;
