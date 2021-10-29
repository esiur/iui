import {IUI, iui} from "./Core/IUI.js";

import "./Core/IUIElement.js";
import './Core/App.js';

import './Router/Router.js';
import './Router/Route.js';
import './Router/Link.js';
import './Router/Target.js';

import './Data/Repeat.js';
import './Data/Include.js';
import './Data/Form.js';
import './UI/Login.js';
import './UI/Window.js';
import './UI/Dialog.js';
import './UI/Input.js';
import './UI/Tab.js';
import './UI/Tabs.js';

import './UI/Table.js';

import './UI/Check.js';
import './UI/Button.js';
import './UI/Navbar.js';

import './UI/DateTimePicker.js';

import './Data/Layout.js';
import './Data/Field.js';

import './UI/Background.js';
import './UI/Menu.js';
import './Data/TableRow.js';

import './UI/Select.js';

import './UI/DropDown.js';
import './UI/Grid.js';

import './UI/Location.js';
import './UI/CodePreview.js';

window.addEventListener("beforeprint", (e)=>{
   let viewRoute = router.current.viewRoute;
   viewRoute.style.height = "auto";
   router.style.height = viewRoute.clientHeight + "px";
});

window.addEventListener("afterprint", (e)=>{
   let viewRoute = router.current.viewRoute;
   viewRoute.style.height = "";
   router.style.height = "";
});

window.addEventListener("load", async function () {
    await IUI.create(document.body);
    await IUI.created(document.body);
    //if (window.app != null) {
      //  window.app._emit("load", { app: window.app });
   // }
});

window.iui = iui;