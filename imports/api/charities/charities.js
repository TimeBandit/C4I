/*jshint esversion: 6 */

// collection holding charity commission data
// server only, no client side cache needed
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Charities = new Mongo.Collection('charities');
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
    type: Number
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
        return new Date;
      }
    }
  }
});

Charities.attachSchema(Charities.schema);