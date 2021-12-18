# I-Input

Text input
<i-codepreview>
    <i-input :data="'Hello World'"> </i-input>
</i-codepreview>

Field attribute

<i-codepreview>
    <div :data="{msg: 'Hello World'}">
        <i-input field="msg"></i-input>
    </div>
</i-codepreview>

Auto

<i-codepreview>
    <div :data="{msg: 'Edit me'}">
        <i-input field="msg" auto></i-input>
        <button onclick="alert(this.data.msg)"> Click Me </button>
    </div>
</i-codepreview>

Auto with Modifiable

<i-codepreview>
    <div :data="new Modifiable({msg: 'Write something'})">
        <i-input field="msg" auto></i-input>
        <div>${d.msg}</div>
    </div>
</i-codepreview>


Types

<i-codepreview>
    <i-input type="number"></i-input>
    <i-input type="checkbox"></i-input>
    <i-input type="date"></i-input>
    <i-input type="file"></i-input>
</i-codepreview>

Validation

<i-codepreview>
    <i-input auto :validate="() => this.data.length > 5" vmsg="Min length 6 letters"></i-input>
</i-codepreview>
