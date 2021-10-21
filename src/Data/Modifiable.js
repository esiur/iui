export default class Modifiable
{
    static _copy(val){
        if (typeof val === 'object' && val !== null)
        {
            let rt = {};
            for(var i in val)
                if (val[i] instanceof Array)
                    // copy array
                    rt[i] = [...val[i]];
                else
                    rt[i] = val[i];

            return rt;
        }
        else 
            return val;
    }

    // @TODO: Remove this when esiur adds suport to partially modified arrays with modified flag
    static _areEqual(ar1, ar2)
    {
        if (!(ar1 instanceof Array) || !( ar2 instanceof Array))
            return false;

        if (ar1.length != ar2.length)
            return false;

        for(var i = 0; i < ar1.length; i++)
            if (ar1[i] != ar2[i])
                return false;
        
        return true;
    }

    constructor(original){

        this._events = {};
        this._data = Modifiable._copy(original);
        this._original = original;

        for(let p in this._data)
        {
            if (p.startsWith("_"))
                continue;

            this._register(":" + p);

            Object.defineProperty(this, p, {
                get() {
                  return this._data[p];
                },
                set(value) {
                  this._data[p] = value;
                  this._emit(":" + p, value);
                }
              });
        }

    }


    get _diff() {
        if (this._original == null)
            return this._data;

        var rt = {};
        for (var i in this._data)
            if (this._data[i] != this._original[i])
            {
                if (this._data[i] instanceof Array && Modifiable._areEqual(this._data[i], this._original[i]))
                    continue;
                else
                    rt[i] = this._data[i];
            }
            
        return rt;
    }

    _register(event)
    {
        this._events[event] = [];
    }
 

    _emit(event)
    {
        event = event.toLowerCase();
        var args = Array.prototype.slice.call(arguments, 1);
        if (this._events[event])
            for(var i = 0; i < this._events[event].length; i++)
                if (this._events[event][i].f.apply(this._events[event][i].i, args))
                    return true;

        return false;
    }

    _emitArgs(event, args)
    {
        event = event.toLowerCase();
        if (this._events[event])
            for(var i = 0; i < this._events[event].length; i++)
                if (this._events[event][i].f.apply(this._events[event][i].i, args))
                    return true;
        return this;
    }

    on(event, fn, issuer)
    {
        if (!(fn instanceof Function))
            return this;

        event = event.toLowerCase();
        // add
        if (!this._events[event])
            this._events[event] = [];
        this._events[event].push({f: fn, i: issuer == null ? this: issuer});
        return this;
    }

    
    off(event, fn)
    {
        event = event.toLowerCase();
        if (this._events[event])
        {
            if (fn)
            {
                for(var i = 0; i < this._events[event].length; i++)
                    if (this._events[event][i].f == fn)
                        this._events[event].splice(i--, 1);
            }
            else
            {
                this._events[event] = [];
            }
        }
    }
}