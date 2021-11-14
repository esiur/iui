
#Scripts

Scripts within tags are executed as functions with the scope varaiables and *this* argument is set to the parent element

<i-codepreview>
    <button>
        <script>
            this.onclick = () => { alert("Hello World !")};
            this.innerHTML = "Click me";
        </script>
    </button>
</i-codepreview>

When the function returns an object it will be projected to the parent element.

<i-codepreview>
    <button>
        <script>
            this.onclick = () => { alert("Hello World !")};
            return {innerHTML: "Click Me"}
        </script>
    </button>
</i-codepreview>

Scope variables example

<i-codepreview>
    <button>
        <script>
            this.onclick = () => { 
                refs.msg.innerHTML = new Date().toTimeString();
            };
            return {innerHTML: "Click Me"}
        </script>
    </button>
    <div ref="msg"></div>
</i-codepreview>
