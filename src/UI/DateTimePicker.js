import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";

export default IUI.module(class DateTimePicker extends IUIElement {


    constructor() {
        super();
    }



    get layout() {
        return this._layout;
    }

    set layout(value) {

        if (value == this._layout)
            return;

        this.innerHTML = "";

        this._layout = value;

        this.calendar = document.createElement("div");
        this.calendar.className = this.cssClass + "-calendar";


        this.calendarContent = document.createElement("div");
        this.calendarContent.className = this.cssClass + "-calendar-content";

        this.table = document.createElement("table");
        this.header = this.table.createTHead();
        this.body = this.table.createTBody();

        this.calendarContent.appendChild(this.table);

        var tr = this.header.insertRow();

        for (var i = 0; i < 7; i++) {
            var td = tr.insertCell();
            td.innerHTML = this.layout.day.formatter((i + this.layout.weekStart) % 7);
            td.className = this.cssClass + "-day";
        }

        this.tools = document.createElement("div");
        this.tools.className = this.cssClass + "-tools";

        this.month = document.createElement("div");
        this.month.className = this.cssClass + "-month";
        this.monthName = document.createElement("div");
        this.monthName.className = this.cssClass + "-name";
        this.nextMonth = document.createElement("div");
        this.nextMonth.className = this.cssClass + "-next";
        this.previousMonth = document.createElement("div");;
        this.previousMonth.className = this.cssClass + "-previous";

        this.month.appendChild(this.previousMonth);
        this.month.appendChild(this.monthName);
        this.month.appendChild(this.nextMonth);

        this.year = document.createElement("div");
        this.year.className = this.cssClass + "-year";
        this.yearName = document.createElement("div");
        this.yearName.className = this.cssClass + "-name";
        this.nextYear = document.createElement("div");
        this.nextYear.className = this.cssClass + "-next";
        this.previousYear = document.createElement("div");
        this.previousYear.className = this.cssClass + "-previous";

        this.year.appendChild(this.previousYear);
        this.year.appendChild(this.yearName);
        this.year.appendChild(this.nextYear);

        this.tools.appendChild(this.month);
        this.tools.appendChild(this.year);

        let self = this;

        this.nextMonth.addEventListener("click", function () {
            self._month = (self._month + 1) % 12;
            self.render();
        });

        this.previousMonth.addEventListener("click", function () {
            self._month = (self._month + 11) % 12;
            self.render();
        });

        this.nextYear.addEventListener("click", function () {
            self._year++;
            self.render();
        });

        this.previousYear.addEventListener("click", function () {
            self._year--;
            self.render();
        });


        for (let i = 0; i < 6; i++) {
            tr = this.body.insertRow();

            for (var j = 0; j < 7; j++) {
                let td = tr.insertCell(tr);
                td.className = this.cssClass + "-day";
                td.innerHTML = i + "x" + j;
                td.addEventListener("click", function () {
                    self._day = parseInt(this.getAttribute("data-day"));
                    self._month = parseInt(this.getAttribute("data-month"));
                    self._year = parseInt(this.getAttribute("data-year"));
                    self._value.setDate(self._day);
                    self._value.setFullYear(self._year);
                    self._value.setMonth(self._month);
                    self.render();

                    if (self.isAuto)
                        self.revert();

                    self._emit("select", { value: self._value });
                    self._emit(":value", { value });
                });
            }
        }

        this.calendar.appendChild(this.tools);
        this.calendar.appendChild(this.calendarContent);

        /*
        this.minutes = document.createElement("div");
        this.minutes.className = this.cssClass + "-clock";

        for (var i = 1; i < 61; i++) {
            var range = document.createElement("div");

            range.className = this.cssClass + "-time";
            range.innerHTML = i;
            this.minutes.appendChild(range);

        }

        this.hours = document.createElement("div");
        this.hours.className = this.cssClass + "-clock";

        for (var i = 1; i < 25; i++) {
            var range = document.createElement("div");

            range.className = this.cssClass + "-time";
            range.innerHTML = i;
            this.hours.appendChild(range);


        }
        */
        this.clock = document.createElement("div");
        this.clock.className = this.cssClass + "-clock";

        for (let i = 0; i < 1440; i += this.layout.time.range) {
            var range = document.createElement("div");
            range.className = this.cssClass + "-time";
            range.innerHTML = this.layout.time.formatter(i);
            range.setAttribute("data-time", i);
            this.clock.appendChild(range);

            range.addEventListener("click", function () {
                var t = parseInt(this.getAttribute("data-time"));
                var h = Math.floor(t / 60);
                var m = Math.floor(t % 60);
                self._value.setHours(h);
                self._value.setMinutes(m);

                if (self.isAuto)
                    self.revert();

                self._emit("select", self._value);
                self.render();
            });
        }

        //this.timeList = document.createElement("div");
        //this.timeList = 
        this.appendChild(this.calendar);
        this.appendChild(this.clock);
        //      this.appendChild(this.minutes);
        //        this.appendChild(this.hours);

        this.value = new Date();
    }

    async create() {

        await super.create();

        this.isAuto = this.hasAttribute("auto");
        this.field = this.getAttribute("field");

        if (this.field != null) {
            this.setAttribute(":data", `d != null ? d['${this.field}'] : null`);
            this.setAttribute(
                "async:revert",
                `d != null ? d['${this.field}'] = this.data : null`
            );
        }

        var self = this;


        this._register("select");

        this.classList.add(this.cssClass);

        this.layout = {
            day: {
                formatter: function (index) {
                    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index];
                    //return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][index];
                }
            },
            month: {
                formatter: function (index) {
                    return ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"][index];
                }
            },
            year: {
                formatter: function (value) {
                    return value;
                }
            },
            time: {
                formatter: function (value) {
                    var formatDigit = function (d) { return (d < 10) ? "0" + d : d; };
                    var h = Math.floor(value / 60);
                    var m = Math.floor(value % 60);
                    return formatDigit(h) + ":" + formatDigit(m);
                },
                range: 15
            },

            weekStart: 5
        };
    }

    render() {

        var start = new Date(this._year, this._month, 1);
        var offset = 1 - start.getDay() - (7 - this.layout.weekStart) % 7;//(this.weekStart > 3 ? (this.weekStart - 7) : this.weekStart);

        this.yearName.innerHTML = this.layout.year.formatter(this._year);
        this.monthName.innerHTML = this.layout.month.formatter(this._month);

        var today = new Date();

        for (var i = 0; i < 42; i++) {
            var rowIndex = Math.floor(i / 7);
            var cellIndex = i % 7;

            var td = this.body.rows[rowIndex].cells[cellIndex];

            var d = new Date(this._year, this._month, offset + i);

            td.classList.remove(this.cssClass + "-different-month");

            // gray it
            if (d.getMonth() != this._month)
                td.classList.add(this.cssClass + "-different-month");

            if (d.getDate() == today.getDate() && d.getMonth() == today.getMonth() && d.getFullYear() == today.getFullYear())
                td.classList.add(this.cssClass + "-day-today");
            else
                td.classList.remove(this.cssClass + "-day-today");

            if (d.getDate() == this._value.getDate()
                && d.getFullYear() == this._value.getFullYear()
                && d.getMonth() == this._value.getMonth())
                td.classList.add(this.cssClass + "-day-selected");
            else
                td.classList.remove(this.cssClass + "-day-selected");


            td.setAttribute("data-day", d.getDate());
            td.setAttribute("data-month", d.getMonth());
            td.setAttribute("data-year", d.getFullYear());

            td.innerHTML = d.getDate();
        }


        for (var i = 0; i < this.clock.children.length; i++)
            this.clock.children[i].classList.remove(this.cssClass + "-time-selected");

        var time = (this._value.getHours() * 60) + this._value.getMinutes();

        if (time % this.layout.time.range == 0)
            this.clock.children[time / this.layout.time.range].classList.add(this.cssClass + "-time-selected");
    }

    async setData(value) {

        await super.setData(value);


        if (value != null && this.field != null)
            this.value = this.data[this.field];

    }

    get data() {
        return this.value;
    }


    async setData(value) {
        await super.setData(value);

        this.value = value;

        if (this.isAuto)
            this.revert();
    }

    /*
    modified(name, value) {
        if (name == this.field)
            this.value = value;
    }
    */

    set value(value) {
        if (value && !isNaN(value.getTime())) {
            this._value = value;
            this._month = value.getMonth();
            this._year = value.getFullYear();
            this._day = value.getDate();
            this.render();
            this._emit("select", { value });
            this._emit("modified", { value, property: "value" });
            //this.modified("value", );
            //this.modified("modified", { value });

            if (this.isAuto)
                this.revert();
        }
    }

    get value() {
        return this._value;
    }
});