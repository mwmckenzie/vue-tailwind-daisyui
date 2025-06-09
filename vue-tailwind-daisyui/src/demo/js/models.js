import {randomUUID} from "crypto";

export class dbItem {
    constructor(itemTypeId = null, id = null,  value = null, label = null, parentId = null) {
        this.itemTypeId = itemTypeId;
        this.id = id ? id : randomUUID();
        this.value = value;
        this.label = label;
        this.parentId = parentId;
    }
}

export class dbItemType {
    constructor(id = null, label = null) {
        this.id = id ? id : randomUUID();
        this.label = label;
    }
}

export class dbItemTree {
    constructor(id = null, label = null, children = []) {
        this.id = id ? id : randomUUID();
        this.label = label;
        this.children = children;
    }
}

// instruction_source + instruction_type + instruction_value
// request = request_source + request_action + request_predicate + request_time

// request(type.user, type.delete, type.name where value == 'john', type.datetime)


