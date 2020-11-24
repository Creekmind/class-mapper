import { any, array, boolean, date, number, object, string } from './decorators';
import { getOpts } from './reflect';
import { assert } from 'chai';
import { box, unbox } from './index';
import { it } from 'mocha';

class SingleAnyField {
  @any()
  payload: any;
}

class ChildNameField extends SingleAnyField {
  @string()
  name: string;

  constructor(name) {
    super();
    this.name = name;
  }
}

class SubChildField extends ChildNameField {
  @date()
  createdAt: Date;

  constructor(name) {
    super(name);
    this.createdAt = new Date();
  }
}

class ChildIdField extends SingleAnyField {
  @number()
  id: number;

  constructor(id: number) {
    super();
    this.id = id;
  }
}

class PrimitiveFields {
  @number()
  id: number;
  @string()
  name: string;
  @boolean()
  enabled: boolean;

  displayName: string;

  constructor(id: number, name: string, enabled = true) {
    this.id = id;
    this.name = name;
    this.enabled = enabled;
  }
}

class WithNestedObject {
  @number()
  id: number;
  @array(PrimitiveFields)
  values: PrimitiveFields[];

  constructor(id: number) {
    this.id = id;
  }
}

describe('Reflect', () => {
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
      assert.equal(opts[0].type, 'any');
      assert.equal(opts[1].type, 'date');
      assert.equal(opts[2].type, 'string');
    });

  });
});

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
  });

  describe('#box', () => {
    it('should box decorated properties', () => {
      const target = new PrimitiveFields(31, 'Gordon');
      target.displayName = 'Gordon Freeman';
      const raw = box<PrimitiveFields>(target);

      assert.strictEqual(raw.id, target.id);
      assert.strictEqual(raw.name, target.name);
      assert.strictEqual(raw.displayName, undefined);
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
  });
})
