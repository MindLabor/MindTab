"use strict";

export default class MindClock {


	constructor() {
		this.timeElement = document.getElementById("time");
	}


    /**
     * Start the clock
     */
	start() {
		this.updateTime();
		setInterval(() => this.updateTime(), 1000);
	}


    /**
     * Update the time
     */
	updateTime() {
		const date = new Date();
		this.timeElement.textContent = date.toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		});
	}


}
