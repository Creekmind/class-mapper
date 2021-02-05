import { any, array, boolean, epoch, number, skipBoxing, skipUnboxing, string } from '../decorators';

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
  @epoch()
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
  @epoch()
  createDate: Date;

  displayName: string;

  constructor(id: number, name: string, enabled = true, createDate = null) {
    this.id = id;
    this.name = name;
    this.enabled = enabled;
    this.createDate = createDate;
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
