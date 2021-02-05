import { anyToBoolean, dateToEpoch, anyToNumber, anyToString, epochToDate } from './converters';
import { assert } from 'chai';
import { it } from 'mocha';

describe('Converters', () => {
  describe('#anyToNumber', () => {
    it('should return number without conversion', () => {
      assert.equal(anyToNumber(400), 400);
    });

    it('should convert value to number', () => {
      assert.equal(anyToNumber('400'), 400);
    });

    it('should throw error if NaN', () => {
      assert.throws(anyToNumber.bind(this, ['Lamarr' ]));
    });
  });

  describe('#anyToString', () => {
    it('should convert value to string', () => {
      assert.equal(anyToString(5801), "5801");
    });
  });

  describe('#anyToBoolean', () => {
    it('should convert value to boolean', () => {
      assert.equal(anyToBoolean("any"), true);
      assert.equal(anyToBoolean(""), false);
    });
  });

  describe('#dateToEpoch', () => {
    it('should convert date to epoch', () => {
      const date = new Date();
      assert.equal(dateToEpoch(date), date.getTime());
    });

    it('should throw error if NaN', () => {
      assert.throws(dateToEpoch.bind(this, ['Lamarr' ]));
    });
  });

  describe('#epochToDate', () => {
    it('should convert epoch to date', () => {
      const date = new Date();
      const epoch = date.getTime();
      assert.equal(epochToDate(epoch).getTime(), date.getTime());
    });

    it('should throw error if NaN', () => {
      assert.throws(epochToDate.bind(this, ['Lamarr']));
    });
  });
});
