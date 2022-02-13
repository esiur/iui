import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";

export default IUI.module(
  class Login extends IUIElement {
    constructor() {
      super();

      var template = `<div class='body' style='box-shadow: 0 2px 2px rgba(0, 0, 0, .3);
              background: white;
              border-radius: 3px;
              display: flex;
              flex-direction: column;
              user-select: none;
              border: 1px solid #b4b4b4;'>

            <div name="message"></div>
            <div style='display: flex; flex-direction: column;padding: 20px;'>

                <label class="textbox-with-label">
                    <input name="txtUsername" placeholder=" " autocomplete="no" style="width: calc(100% - 10px);">
                        <span name="spnUsername">Username</span>
            </label>


                    <label class="textbox-with-label" >
                        <input name="txtPassword" style="width: calc(100% - 10px);" type="password" placeholder=" " ">
                            <span name="spnPassword">Password</span>
            </label>

                        <div style="display: flex">
                            
                            <input type="checkbox" name="remember" >
                            <label for="remember" name="labelRemember">Remember</label>
            </div>

                        </div>
                        <div class='actions'>
                            <button class='button' name="login">Login</button>
                        </div>
          </div>`;

      this.innerHTML = template;

      this._message = this.querySelector("div[name='message']");

      this._usernameText = this.querySelector("span[name='spnUsername']");
      this._passwordText = this.querySelector("span[name='spnPassword']");
      this._rememberText = this.querySelector("label[name='labelRemember']");
      this._username = this.querySelector("input[name='txtUsername']");
      this._password = this.querySelector("input[name='txtPassword']");
      this._remember = this.querySelector("input[name='remember']");
      this._login = this.querySelector("button[name='login']");

      var self = this;

      this._password.addEventListener("keydown", e => {
        if (e.keyCode == 13) self.login();
      });

      if (this.hasAttribute("message")) {
        this._message.innerHTML = this.getAttribute("message");
      }

      if (this.hasAttribute("username")) {
        this._usernameText.innerHTML = this.getAttribute("username");
      }

      if (this.hasAttribute("password")) {
        this._passwordText.innerHTML = this.getAttribute("password");
      }

      if (this.hasAttribute("remember")) {
        this._rememberText.innerHTML = this.getAttribute("remember");
      }

      if (this.hasAttribute("login")) {
        this._login.innerHTML = this.getAttribute("login");
      }

      let username = this.username; // window.localStorage.getItem("iui.login.username");
      let password = this.password; // window.localStorage.getItem("iui.login.password");
      if (username != "") {
        this._username.value = username;
        this._password.value = password;
        this._remember.checked = true;
      }

      this._login.addEventListener("click", () => this.login());

      this._register("login");
      this._register("logout");
    }

    login() {
      let username = this._username.value;
      let password = this._password.value;

      if (username == "" || password == "") return;

      if (this._remember.checked) {
        this.username = username;
        this.password = password;
        //window.localStorage.setItem("iui.login.username", username);
        //window.localStorage.setItem("iui.login.password", password);
      } else {
        window.localStorage.removeItem("iui.login.username");
        window.localStorage.removeItem("iui.login.password");
      }

      this._emit("login", { username, password });
    }

    get username() {
      return window.localStorage.getItem("iui.login.username");
    }

    set username(value) {
      return window.localStorage.setItem("iui.login.username", value);
    }

    get password() {
      return window.localStorage.getItem("iui.login.password");
    }

    set password(value) {
      return window.localStorage.setItem("iui.login.password", value);
    }

    get token() {
      return window.localStorage.getItem("iui.login.token");
    }

    set token(value) {
      return window.localStorage.setItem("iui.login.token", value);
    }

    get message() {
      return this._message.innerHTML;
    }

    set message(value) {
      this._message.innerHTML = value;
    }

    logout() {
      window.localStorage.removeItem("iui.login.username");
      window.localStorage.removeItem("iui.login.password");
      window.localStorage.removeItem("iui.login.token");
      this._username.value = "";
      this._password.value = "";
      this._remember.checked = false;

      this._emit("logout");
    }

    created() {
      //if (this.hasAttribute("auto")) {
      //    let username = this.username;// window.localStorage.getItem("iui.login.username");
      //    let password = this.password;// window.localStorage.getItem("iui.login.password");
      //    if (this.username != "") {
      //        this._emit("login", { username, password });
      //    }
      //}
    }
  }
);
