// collection holding charity commission data
// server only, no client side cache needed
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { attachSchema } from 'meteor/aldeed:collection2';

CharityList = new Mongo.Collection("charitylist");

const CharityList.schema = new SimpleSchema({
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
        type: String
    },
    MainPhoneNumber: {
        type: String
    }
});

CharityList.attachSchema(CharityList.schema);