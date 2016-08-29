/*jshint esversion: 6 */

// collection holding charity commission data
// server only, no client side cache needed
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const CharityList = new Mongo.Collection('CharityList');
// create & attach schema
CharityList.schema = new SimpleSchema({
    RegisteredCharityNumber: {
        type: Number
    },
    SubsidiaryNumber: {
        type: Number
    },
    CharityName: {
        type: String
    },
    MainCharityName: {
        type: String
    },
    RegistrationStatus: {
        type: String
    },
    PublicEmailAddress: {
        type: String,
        optional: true,
    },
    MainPhoneNumber: {
        type: String,
        optional: true,
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            return new Date();
        }
    }
});

CharityList.attachSchema(CharityList.schema);