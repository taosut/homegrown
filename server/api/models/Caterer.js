/**
 * Caterer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  attributes: {
    firstname: {
      type: 'string',
      required: true
    },
    lastname: {
      type: 'string',
      required: true
    },
    fullname: function() {
      return (''.concat(this.firstname,' ',this.lastname));
    },
    address: {
      type: 'string',
      required: true
    },
    phone: {
      type: 'string',
      unique: true,
      required: true
    },
    email: {
      type: 'string',
    },
    school: {
      model: 'School'
    },
    lga: {
      model: 'lga'
    },
    bankAccount: {
      model: 'BankAccount'
    },
    toJSON: function () {
        var obj = this.toObject();
        obj.fullname = (''.concat(obj.firstname,' ',obj.lastname));
        return obj;
    }
  }
};

