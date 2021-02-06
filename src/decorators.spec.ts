import { assert } from 'chai';
import { box, unbox } from './index';
import { it } from 'mocha';
import { PrimitiveFields, SkipField, WithNestedObject } from './test-data/classes';

describe('Mapper', () => {
  describe('#unbox', () => {
    it('should unbox raw object to decorated properties with correct types', () => {
      const raw = {
        id: '31',
        name: 33441,
        displayName: 'G-Man'
      }

      const target = unbox<PrimitiveFields>(raw, PrimitiveFields);

      assert.isTrue(target instanceof PrimitiveFields);
      assert.strictEqual(target.id, 31);
      assert.strictEqual(target.name, '33441');
      assert.strictEqual(target.displayName, undefined);
    });

    it('should unbox raw object with nested objects to decorated properties with correct types', () => {
      const raw = {
        id: '31',
        values: [{
          id: '1',
          name: 'Freeman'
        }, {
          id: '2',
          name: 'Barney'
        }]
      }

      const target = unbox<WithNestedObject>(raw, WithNestedObject);

      assert.isTrue(target instanceof WithNestedObject);
      assert.strictEqual(target.id, 31);
      assert.strictEqual(target.values.length, 2);
      assert.isTrue(target.values[0] instanceof PrimitiveFields);
      assert.strictEqual(target.values[0].id, 1);
      assert.strictEqual(target.values[0].name, 'Freeman');
      assert.isTrue(target.values[1] instanceof PrimitiveFields);
      assert.strictEqual(target.values[1].id, 2);
      assert.strictEqual(target.values[1].name, 'Barney');
    });

    it('should leave default values', () => {
      const raw = {
        id: '31',
      }

      const target = unbox<WithNestedObject>(raw, WithNestedObject);
      assert.isNotNull(target.values);
      assert.isEmpty(target.values);
    });

    it('should skip property on unboxing', () => {
      const meta = {};
      const target = unbox<SkipField>({
        id: 31,
        meta: meta
      }, SkipField);

      assert.strictEqual(target.id, 31)
      assert.strictEqual(target.meta, undefined)
    });
  });

  describe('#box', () => {
    it('should box decorated properties', () => {
      const now = new Date();
      const target = new PrimitiveFields(31, 'Gordon', true, now);
      target.displayName = 'Gordon Freeman';
      const raw = box<PrimitiveFields>(target);

      assert.strictEqual(raw.id, target.id);
      assert.strictEqual(raw.name, target.name);
      assert.strictEqual(raw.displayName, undefined);
      assert.strictEqual(raw.createDate, now.getTime());
    });

    it('should box nested object', () => {
      const target = new WithNestedObject(23);
      target.id = 55;
      target.values = [
        new PrimitiveFields(31, 'Gordon'),
        new PrimitiveFields(32, 'Barney'),
      ];

      const raw = box<WithNestedObject>(target);

      assert.strictEqual(raw.id, target.id);
      assert.strictEqual(raw.values.length, 2);
      assert.strictEqual(raw.values[0].id, target.values[0].id)
      assert.strictEqual(raw.values[1].id, target.values[1].id)
    });

    it('should skip property on boxing', () => {
      const target = new SkipField();
      const meta = {};
      target.id = 31;
      target.meta = meta;

      const raw = box<SkipField>(target);
      assert.strictEqual(raw.id, undefined)
      assert.strictEqual(raw.meta, meta)
    });
  });
})
