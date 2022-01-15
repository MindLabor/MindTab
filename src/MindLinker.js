"use strict";

import CONFIG from "./config.json";
import MindLinkGroup from "./MindLinkGroup";

export default class MindLinker {


	constructor() {

		// Create the link groups
		this.linkGroups = [];
		CONFIG.linkGroups.forEach(group => {
			const linkGroup = new MindLinkGroup(group);
			group.links.forEach(link => {
				linkGroup.addLink(link);
			});
			this.linkGroups.push(linkGroup);
		});

	}


	/**
	 * Manages hiding all groups on global events
	 */
	setUpLinkListDismisser() {
		document.addEventListener("click", ({ target }) => {

			// If the target is child of the link groups, do nothing
			if (target.closest(`#${document.getElementById("link-groups").id}`))
				return;

			// Hide all the link groups
			document.querySelectorAll(".link-list").forEach(list => {
				list.parentElement.classList.add("link-list-hidden")
			});
		});
	}


}
