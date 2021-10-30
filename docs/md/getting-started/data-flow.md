# Data flow

When the :data attribute is set to an element any other attribute and child will be able to access this field directly using the variable *data* or the shortended *d*.


<i-codepreview>
    <div :data="{name: 'Ahmed Zamil', job: 'Developer'} ">
        My name is ${d.name} and I work as a ${d.job}.
    </div>
</i-codepreview>

 Child element will be provided with the data of its parent

 <i-codepreview>
    <ul :data="screen">
        <li>Width: <b>${d.width}</b></li>
        <li>Height: <b>${d.height}</b></li>
    </ul>
</i-codepreview>

Child element can set its data with *:data* attribute 

 <i-codepreview>
    <ul :data="screen">
        <li>Width: <b>${d.width}</b></li>
        <li>Height: <b>${d.height}</b></li>
        <li :data="d.width / d.height"> Ratio: ${d} </li>
    </ul>
</i-codepreview>

Every element in the tree will have a *data* property 

 <i-codepreview>
    <div :data="new Date()">
        <button onclick="this.innerText = ((new Date) - this.data) + ' milliseconds passed'">
            Click me
        </button>
    </div>
</i-codepreview>
