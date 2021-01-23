class Serialize {
  constructor() {
    this.classes = {};
  }

  addClass(cls) {
    this.classes[cls.constructor.name];
    return this;
  }

  _isPrimitive(name) {
    return ["Object", "Function", "Number", "Array", "String"].includes(name);
  }

  stringify(data, space) {
    return JSON.stringify(
      data,
      (key, value) => {
        if (
          value &&
          value.constructor &&
          !this._isPrimitive(value.constructor.name)
        ) {
          this.classes[value.constructor.name] = value.constructor;
          return {
            json: { ...value },
            ___class: value.constructor.name
          };
        }
        return value;
      },
      space
    );
  }

  parse(data) {
    return JSON.parse(data, (key, value) => {
      if (typeof value === "object" && "___class" in value) {
        const cls = this.classes[value["___class"]];
        if (cls) {
          return cls.fromJSON ? cls.fromJSON(value.json) : new cls(value.json);
        } else {
          return value.json;
        }
      }
      return value;
    });
  }
}

export default Serialize;
