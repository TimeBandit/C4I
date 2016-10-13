/*jshint esversion: 6 */

// collection holding charity commission data
// server only, no client side cache needed
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Charities = new Mongo.Collection('charities');
// create & attach schema

export const RegistrationHistorySchema = new SimpleSchema({
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

export const AddressSchema = new SimpleSchema({
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

export const TrusteesSchema = new SimpleSchema({
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
        type: String
    },
    RegisteredCharityNumber: {
        type: Number
    },
    RegistrationHistory: {
        type: [RegistrationHistorySchema]   
    },
    RegistrationDate: {
        type: String
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
    }
});

// Charities.attachSchema(Charities.schema);

// {
// SubsidiaryNumber:0,
// CharityName:0,
// MainCharityNam:0,
// RegistrationStatus:0,
// PublicEmailAddress:0,
// MainPhoneNumber:0
// }

// {
//     RegisteredCharityNumber: {
//         type: Number
//     },
//     SubsidiaryNumber: {
//         type: Number
//     },
//     CharityName: {
//         type: String
//     },
//     MainCharityName: {
//         type: String
//     },
//     RegistrationStatus: {
//         type: String
//     },
//     PublicEmailAddress: {
//         type: String,
//         optional: true,
//     },
//     MainPhoneNumber: {
//         type: String,
//         optional: true,
//     },
//     TotalFunds: {
//         type: Number,
//         optional: true,
//         min: 0,
//         defaultValue: 0
//     },
//     Efficiency: {
//         type: Number,
//         optional: true,
//         decimal: true,
//         min: 0,
//         max: 1,
//         defaultValue: 0
//     },
//     NumEmployees: {
//         type: Number,
//         optional: true,
//         min: 0,
//         defaultValue: 0
//     },
//     NumVolunteers: {
//         type: Number,
//         optional: true,
//         min: 0,
//         defaultValue: 0
//     },
//     Likes: {
//         type: Number,
//         optional: true,
//         min: 0,
//         defaultValue: 0
//     },
//     Pageviews: {
//         type: Number,
//         optional: true,
//         min: 0,
//         defaultValue: 0
//     },
//     updatedAt: {
//         type: Date,
//         autoValue: function() {
//             return new Date();
//         }
//     },
//     createdAt: {
//         type: Date,
//         autoValue: function() {
//             return new Date();
//         }
//     }
// }
