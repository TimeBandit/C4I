/*jshint esversion: 6 */

// collection holding charity commission data
// server only, no client side cache needed
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const transformer = function transformer(doc) {
  const data = JSON.parse(JSON.stringify(doc));
  console.info(data);
  return {
    name: data.CharityName || "",
    address: data.Address || {},
    postCode: ((data.Address || {}).Postcode || ""),
    charityRoleName: ((data.ContactName || {}).CharityRoleName || "").toLowerCase(),
    registeredCharityNumber: data.RegisteredCharityNumber || "",
    registeredCompanyNumber: data.RegisteredCompanyNumber || "",
    registrationHistory: ((data.RegistrationHistory || [])[0] || {}),
    publicTelephoneNumber: data.PublicTelephoneNumber || "",
    publicFaxNumber: data.PublicFaxNumber || "",
    emailAddress: data.EmailAddress || "",
    webSiteAddress: data.WebsiteAddress || "",
    activities: data.Activities || "",
    how: ((data.Classification || {}).How || []),
    what: ((data.Classification || {}).What || []),
    who: ((data.Classification || {}).Who || []),
    areaOfBenefit: data.AreaOfBenefit || "",
    areaOfOperation: data.AreaOfOperation || [],
    assets: ((((data.Returns || [])[0] || {}).AssetsAndLiabilities || {}).Assets || {}),
    funds: ((((data.Returns || [])[0] || {}).AssetsAndLiabilities || {}).Funds || {}),
    incoming: ((((data.Returns || [])[0] || {}).Resources || {}).Incoming || {}),
    expended: ((((data.Returns || [])[0] || {}).Resources || {}).Expended || {}),
    accountListing: data.AccountListing || [],
    submission: data.Submission || [],
    employees: (((data.Returns || [])[0] || {}).Employees || {}),
    trustees: data.Trustees || []
  };

};

export const Charities = new Mongo.Collection('charities', {
  transform: transformer
});
// create & attach schema

const RegistrationHistorySchema = new SimpleSchema({
  RegistrationDate: {
    type: Date
  },
  RegistrationRemovalDate: {
    type: Date
  },
  RemovalReason: {
    type: String
  }
});

const AddressSchema = new SimpleSchema({
  Line1: {
    type: String
  },
  Line2: {
    type: String
  },
  Line3: {
    type: String
  },
  Line4: {
    type: String
  },
  Line5: {
    type: String
  },
  Postcode: {
    type: String
  }
});

const TrusteesSchema = new SimpleSchema({
  TrusteeNumber: {
    type: Number
  },
  TrusteeName: {
    type: String
  },
  RelatedCharitiesCount: {
    type: Number
  }
});

Charities.schema = new SimpleSchema({
  CharityName: {
    type: Number
  },
  RegisteredCharityNumber: {
    type: Number
  },
  RegistrationHistory: {
    type: [RegistrationHistorySchema]
  },
  Address: {
    type: AddressSchema
  },
  Activities: {
    type: String
  },
  Trustees: {
    type: [TrusteesSchema]
  },
  GrossIncome: {
    type: Number
  },
  TotalExpenditure: {
    type: Number
  },
  Employees: {
    type: Number
  },
  Volunteers: {
    type: Number
  },
  created: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    }
  }
});

Charities.attachSchema(Charities.schema);
