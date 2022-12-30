from datetime import datetime

dateFormat = '%Y-%m-%d'  # 2014-01-01

users = [
    {
        "userId": "homeOwnerA",
        "home": ["homeA"],
        "role": "HomeOwner",
        "lengthOfStay": {
            "fromDate": datetime.strptime("2014-01-01", dateFormat),
        },
    },
    {
        "userId": "homeOwnerA2",
        "home": ["homeA"],
        "role": "HomeOwner",
        "lengthOfStay": {
            "fromDate": datetime.strptime("2014-01-01", dateFormat)
        },
    },
    {
        "userId": "homeOwnerB",
        "home": ["homeB"],
        "role": "HomeOwner",
        "lengthOfStay": {
            "fromDate": datetime.strptime("2014-01-01", dateFormat),
            "toDate": None,
        },
    },
    {
        "userId": "homeOwnerC",
        "home": ["homeC"],
        "role": "HomeOwner",
        "lengthOfStay": {
            "fromDate": datetime.strptime("2014-01-01", dateFormat),
            "toDate": None,
        },
    },
    {
        "userId": "homeOwnerC2",
        "home": ["homeC"],
        "role": "HomeOwner",
        "lengthOfStay": {
            "fromDate": datetime.strptime("2014-01-01", dateFormat),
            "toDate": None,
        },
    },
    {
        "userId": "underageResidentC1",
        "home": ["homeC"],
        "role": "UnderageResident",
        "lengthOfStay": {
            "fromDate": datetime.strptime("2014-01-01", dateFormat),
            "toDate": None,
        },
    },
    {
        "userId": "tenantD1",
        "home": ["homeD"],
        "role": "Tenant",
        "lengthOfStay": {
            "fromDate": datetime.strptime("2015-07-21", dateFormat),
            "toDate": datetime.strptime("2015-12-31", dateFormat),
        },
    },
    {
        "userId": "tenantD2",
        "home": ["homeD"],
        "role": "Tenant",
        "lengthOfStay": {
            "fromDate": datetime.strptime("2016-01-01", dateFormat),
            "toDate": datetime.strptime("2016-05-09", dateFormat),
        },
    },
    {
        "userId": "tenantE1",
        "home": ["homeE"],
        "role": "Tenant",
        "lengthOfStay": {
          "fromDate": datetime.strptime("2016-01-01", dateFormat),
          "toDate": datetime.strptime("2016-12-31", dateFormat),
        },
    },
    {
        "userId": "tenantF1",
        "home": ["homeF"],
        "role": "Tenant",
        "lengthOfStay": {
            "fromDate": datetime.strptime("2014-01-01", dateFormat),
            "toDate": datetime.strptime("2014-12-31", dateFormat),
        },
    },
    {
        "userId": "homeOwnerF1",
        "home": ["homeF"],
        "role": "HomeOwner",
        "lengthOfStay": {
            "fromDate": datetime.strptime("2015-01-01", dateFormat),
            "toDate": None,
        },
    },
    {
        "userId": "homeOwnerF2",
        "home": ["homeF"],
        "role": "HomeOwner",
        "lengthOfStay": {
            "fromDate": datetime.strptime("2015-01-01", dateFormat),
            "toDate": None,
        },
    },
    {
        "userId": "underageResidentF1",
        "home": ["homeF"],
        "role": "UnderageResident",
        "lengthOfStay": {
            "fromDate": datetime.strptime("2015-01-01", dateFormat),
            "toDate": None,
        },
    },
    {
        "userId": "residenceOwner",
        "home": ["homeA", "homeB", "homeC", "homeD", "homeE", "homeF"],
        "role": "ResidenceOwner",
        "lengthOfStay": None,
    },
    {
        "userId": "cleaningCompanyEmployee1",
        "home": ["homeA", "homeF"],
        "role": "CleaningCompanyEmployee",
        "lengthOfStay": None,
        #
    },
    {
        "userId": "cleaningCompanyEmployee2",
        "home": ["homeB", "homeE"],
        "role": "CleaningCompanyEmployee",
        "lengthOfStay": None,
    },
    {
        "userId": "cleaningCompanyEmployee3",
        "home": ["homeC", "homeD"],
        "role": "CleaningCompanyEmployee",
        "lengthOfStay": None,
    },
]
