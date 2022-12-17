// {
// 	"userId": "abcdefghi",
// 	"home": [all|homeA|homeB|homeC|homeD|homeE|homeF], # "all" or "Residence"
// 	"role": "Role name"
// 	"lengthOfStay": undefined | { # definito solo se sei un abitante
// 		"from": DateTime,
// 		"to": undefined | DateTime
// 		},
// 		"accessTimePermission": { # definito solo per ruoli ad accesso programmato
// 			"from": DateTime,
// 			"to": DateTime
// 		}
// }
// ResidenceOwner, HomeOwner, UnderageResident, Tenant, CleaningCompanyEmployee

const users = [
  // ResidanceOwner
  {
    userId: "residenceOwner",
    home: "all",
    role: "ResidenceOwner",
    lengthOfStay: undefined,
    accessTimePermission: undefined,
  },
];

export default users;
