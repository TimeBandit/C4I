// collection holding charity commission data
// server only, no client side cache needed
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// create & export model
class CharityListCollection extends Mongo.Collection {
    insert(charity, callback) {
    	const ourCharity = doc;
        ourCharity.createdAt = ourCharity.createdAt || new Date();
    }

}

export const CharityList = new CharityListCollection('CharityList');

// create & attach schema
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
    },
    createdAt: {
        type: Date
    }
});

CharityList.attachSchema(CharityList.schema);
