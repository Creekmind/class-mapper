import { any, array, boolean, date, number, skipBoxing, skipUnboxing, string } from '../decorators';

export class SingleAnyField {
  @any()
  payload: any;
}

export class SkipField {
  @any() @skipBoxing()
  id: any;
  @any() @skipUnboxing()
  meta: any;
}

export class ChildNameField extends SingleAnyField {
  @string()
  name: string;

  constructor(name) {
    super();
    this.name = name;
  }
}

export class SubChildField extends ChildNameField {
  @date()
  createdAt: Date;

  constructor(name) {
    super(name);
    this.createdAt = new Date();
  }
}

export class ChildIdField extends SingleAnyField {
  @number()
  id: number;

  constructor(id: number) {
    super();
    this.id = id;
  }
}

export class PrimitiveFields {
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

export class WithNestedObject {
  @number()
  id: number;
  @array(PrimitiveFields)
  values: PrimitiveFields[];

  constructor(id: number) {
    this.id = id;
  }
}
