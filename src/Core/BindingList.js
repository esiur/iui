
export default class BindingList extends Array {
    
    constructor(target, scope) {
        super();
        this.target = target;
        this.scope = scope;
    }

    getArgumentsNames(){
        if (this.scope == null)
            return [];

        let rt;
        for (var i in this.scope.length)
            rt.push(i);
        return rt;
    }

    
}