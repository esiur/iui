# Declarative Rendering

# Text nodes
Text nodes are enclosed with `${...}`
<i-codepreview>
    ${ navigator.userAgent }
</i-codepreview>

# Fields
 starts with `:`
<i-codepreview>
    <input :value="navigator.userAgent">
</i-codepreview>
 
# Attributes
 starts with `::`
<i-codepreview>
    <input ::placeholder="navigator.appName">
</i-codepreview>
 
# Asynchronous

*Promise*
Promises are automatically resolved.

<i-codepreview>
    ${fetch("md/hello.md")}
</i-codepreview>

*Await*
To use await in text nodes **async** attribute must be added to the parent element


<i-codepreview>
    <div async>
        ${await (await fetch("md/hello.md")).text()}
    </div>
</i-codepreview>

In attributes, the attribute name must be preceded with **async:**

<i-codepreview>
<input async:value = "await (await fetch('md/hello.md')).text()">
</i-codepreview>

Attributes are similar they must start with *async::*


<i-codepreview>
<input async::placeholder = "await (await fetch('md/hello.md')).text()">
</i-codepreview>