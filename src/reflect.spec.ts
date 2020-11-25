import { getMeta, getOpts, setMeta } from './reflect';
import { assert } from 'chai';
import { it } from 'mocha';
import { ChildIdField, ChildNameField, PrimitiveFields, SingleAnyField, SubChildField } from './test-data/classes';


describe('Reflect', () => {
  describe('#setMeta', () => {
    it('should append new properties to meta, not override', function () {
      const container = {};
      const propertyKey = 'gravityGun';
      setMeta(container, propertyKey, {
        name: propertyKey,
        type: 'array'
      });

      let meta = getMeta(container, propertyKey);
      assert.equal(meta.type, 'array');

      setMeta(container, propertyKey, {
        name: propertyKey,
        skipBoxing: true
      });

      meta = getMeta(container, propertyKey);
      assert.equal(meta.type, 'array');
    });
  });

  describe('#getOpts', () => {
    it('should have one any property', () => {
      const target = new SingleAnyField();
      const opts = getOpts(target);
      assert.equal(opts.length, 1);
      assert.equal(opts[0].type, 'any');
    });

    it('should have string, number and boolean properties', () => {
      const target = new PrimitiveFields(null, null, null);
      const opts = getOpts(target);
      assert.equal(opts.length, 3);
      assert.equal(opts[0].type, 'number');
      assert.equal(opts[1].type, 'string');
      assert.equal(opts[2].type, 'boolean');
    });

    it('should have two properties: string and any', () => {
      const target = new ChildNameField('Alex');
      const opts = getOpts(target);
      assert.equal(opts.length, 2);
      assert.equal(opts[0].type, 'any');
      assert.equal(opts[1].type, 'string');
    });

    it('should have two properties: number and any', () => {
      const target = new ChildIdField(4561);
      const opts = getOpts(target);
      assert.equal(opts.length, 2);
      assert.equal(opts[0].type, 'any');
      assert.equal(opts[1].type, 'number');
    });

    it('should have three properties: date, number and any', () => {
      const target = new SubChildField('Lamarr');
      const opts = getOpts(target);
      assert.equal(opts.length, 3);
      assert.isAtLeast(opts.findIndex(o => o.type =='any'), 0);
      assert.isAtLeast(opts.findIndex(o => o.type =='date'), 0);
      assert.isAtLeast(opts.findIndex(o => o.type =='string'), 0);
    });

  });
});
