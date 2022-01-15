"use strict";

export default class MindSearcher {


	constructor() {
		this.searchInputElement = document.querySelector("#search > input");
	}


	/**
	 * Bind the search input to the search event handler on enter key
	 */
	setUpSearch() {
		this.searchInputElement.addEventListener("keyup", ({ key, target }) => {
			if (key === "Enter")
				this.onSearchInput.call(this, target);
		});
	}


	/**
	 * Search Event Handler for the search input
	 * @param {HTMLInputElement} target The search input element
	 */
	onSearchInput(target) {
		const searchTerm = target.value;
		const encodedSearchTerm = encodeURIComponent(searchTerm);
		window.location.href = `https://www.google.com/search?q=${encodedSearchTerm}`;
	}


}
