# Scope Variables

Scope variables are provided during the rendering process to the scripts and declarative rendering functions.

These variables propagate from an element to its children and could be altered or overwritten by any element in the tree so the children of that element receive a new value for these variables.


<i-codepreview>
    <div :scope="{now: new Date()}">
        <div>Date: ${now.toDateString()}</div>
        <div>Time: ${now.toTimeString()}</div>
    </div>
</i-codepreview>

# Events

Events can access scope variables when declared with *@eventName*

<i-codepreview>
    <div :scope="{now: new Date()}">
        <button @click="this.innerHTML = now">Click me</button>
    </div>
</i-codepreview>

