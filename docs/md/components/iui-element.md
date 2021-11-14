# IUI Element

*IUIElement* is the base class for all IUI components, it extends the HTMLElement, adds more functionality and define itself as a customElement in the browser.

IuI Widgets tags start with `<i-...>` to differentiate them from the built in html tags.

# Initialization Process

When the document is loaded or new HTML is inserted in the document, IUI process of initialization start which consists of

1- IUI.create(rootElement) 
    create is called on every IUI element in the tree, asking these elements to create themselves, in this phase an element can add more children to itself. (**IUIElement**)

1- IUI.bind(rootElement)
    IUI.bind ensures that all executable attributes starting with : are compiled and tested for data binding.
    Any property that is used by the `d` variable will be a candidate for binding, which means IUI will handle any modification on that property. (**IUIElement** and **HTMLElement**)

3- IUI.created(rootElement)
    Notify every IUI element that the create and bind process has ended. (**IUIElement**)

4- IUI.render(element)
    Render invokes the data binding functions and sets the element text nodes and attributes to the value returned by the binding functions. The process is recursive to all children in the element tree (**IUIElement** and **HTMLElement**)

The rootElement is the first `<i-app>` in the document when its loaded.


# Extension to the Scope

IUI components might extend the scope with 