# Conditional rendering

*:if* attribute is responsilbe for showing or hiding any element in the tree.

<i-codepreview>
<div :data="new Date().getHours()">
    <span :if="d < 12">Good morning</span>
    <span :if="d >= 12 && d < 18">Good afternoon</span>
    <span :if="d >= 18">Good evening</span>
</div>
</i-codepreview>

**note:** if uses CSS display property to show and hide and element which means the element will not be removed from the DOM.


# Filling

*:content* attribute can be used to fill an element with html content.

<i-codepreview>
    <ul :data="['Hello', 'World']" :content="'<li>' + d.join('</li><li>') + '</li>'">
    </ul>
</i-codepreview>