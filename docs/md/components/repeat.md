# I-Repeat

`<i-repeat>` performs a an iteration on an array and builds elements according to the given list


<i-codepreview>
    <i-repeat :data="['Apple', 'Orange', 'Grape']">
        <div>${d}</div>
    </i-repeat>
</i-codepreview>

if the iteration on a specific element is needed, *repeat* attribute must be added to the element.

*Note* each element in the iteration has an index property
