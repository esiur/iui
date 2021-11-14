# Referencing

To avoid duplication, IUI relies on referencing instead of element id.

Refs is a scope variable contains a collection of every element in the tree, unless overwritten by another component.

<i-codepreview>
    <button @click="refs.modification.innerHTML = new Date()">Click me</button>
    <div>Last modification : </div><div ref="modification"></div>
</i-codepreview>

When a duplicated referecing happens, the key in the refs collection will represent an array of the duplicated elements. *note: this always happends in I-Repeat components*

<i-codepreview>
    <button @click="refs.name[0].innerHTML = 'Zak'; refs.name[1].innerHTML = 'Bilal'">
        Click me
    </button>
    <div>First Name : </div><div ref="name"></div>
    <div>Last Name : </div><div ref="name"></div>
</i-codepreview>
