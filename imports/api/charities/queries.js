// set of homepage queries to be used on client & server
import { Charities } from './charities'

// "GrossIncome": { $type: number }

export const topGrossIncomeQuery = Charities.find({
  $or: [{ "GrossIncome": { $type: 1 } }, { "GrossIncome": { $type: 16 } }, { "GrossIncome": { $type: 18 } }],
  "RegistrationHistory.RemovalReason": { $eq: "" }
}, {
  sort: { "GrossIncome": -1 },
  limit: 10
});

export const topTotalExpenditureQuery = Charities.find({
  $or: [{ "TotalExpenditure": { $type: 1 } }, { "TotalExpenditure": { $type: 16 } }, { "TotalExpenditure": { $type: 18 } }],
  "RegistrationHistory.RemovalReason": { $eq: "" }
}, {
  sort: { "TotalExpenditure": -1 },
  limit: 10
});

// $or: [{ "Employees": { $type: 1 } }, { "Employees": { $type: 16 } }, { "Employees": { $type: 18 } }]
export const topEmployeesQuery = Charities.find({
  "Employees": { $ne: "" },
  "RegistrationHistory.RemovalReason": { $eq: "" }
}, {
  sort: { "Employees": -1 },
  limit: 10
});

export const topVolunteersQuery = Charities.find({
  $or: [{ "Volunteers": { $type: 1, $gt: 0 } }, { "Volunteers": { $type: 16, $gt: 0 } }, { "Volunteers": { $type: 18, $gt: 0 } }],
  "RegistrationHistory.RemovalReason": { $eq: "" }
}, {
  sort: { "Volunteers": -1 },
  limit: 10
});
//
export const bottomGrossIncomeQuery = function(val) {
  return Charities.find({
    "GrossIncome": { $type: 1, $gt: 0 },
    "RegistrationHistory.RemovalReason": { $eq: "" }
  }, {
    sort: { "GrossIncome": 1 }
  });
}

export const bottomTotalExpenditureQuery = function(val) {
  return Charities.find({
    "TotalExpenditure": { $type: 1, $gt: 0 },
    "RegistrationHistory.RemovalReason": { $eq: "" }
  }, {
    sort: { "TotalExpenditure": 1 }
  });
}

export const currentCharity = function(val) {
  return Charities.find({ "RegisteredCharityNumber": val })
}
