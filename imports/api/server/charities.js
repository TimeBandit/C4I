/*jshint esversion: 6 */

// collection holding charity commission data
// server only, no client side cache needed
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Charities = new Mongo.Collection('Charities');
// create & attach schema
Charities.schema = new SimpleSchema({
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
    TotalFunds: {
        type: Number,
        optional: true,
        min: 0,
        defaultValue: 0
    },
    Efficiency: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0,
        max: 1,
        defaultValue: 0
    },
    NumEmployees: {
        type: Number,
        optional: true,
        min: 0,
        defaultValue: 0
    },
    NumVolunteers: {
        type: Number,
        optional: true,
        min: 0,
        defaultValue: 0
    },
    Likes: {
        type: Number,
        optional: true,
        min: 0,
        defaultValue: 0
    },
    Pageviews: {
        type: Number,
        optional: true,
        min: 0,
        defaultValue: 0
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            return new Date();
        }
    }
});

Charities.attachSchema(Charities.schema);