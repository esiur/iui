# Data flow

When the :data attribute is set to an element any other attribute and child will be able to access this field directly using the variable *data* or the shortended *d*.


<i-codepreview>
    <div :data="{name: 'Ahmed Zamil', job: 'Developer'} ">
        My name is ${d.name} and I work as a ${d.job}.
    </div>
</i-codepreview>

 