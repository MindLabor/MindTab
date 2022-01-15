"use strict";

import ChromeTabManager from "./ChromeTabManager";

export default class MindLinkGroup {


	constructor(group) {
		this.name = group.name;
		this.links = new Map();
		this.faviconSite = group.faviconHost;
		const { component, linkListWrapper } = this.buildGroup();
		this.component = component;
		this.linkListWrapper = linkListWrapper;
	}


	/**
	 * Event handler for when this group is clicked
	 */
	async onGroupClick() {

		// Hide all other groups
		document.querySelectorAll(".link-list").forEach(list => {
			list.parentElement.classList.add("link-list-hidden")
		});

		// Show this group
		this.linkListWrapper.parentElement.classList.remove("link-list-hidden");
	}


	/**
	 * Event handler for when a link is clicked
	 * @param {string} url The url of the link
	 */
	onItemClick(url) {

		// Hide this group
		this.linkListWrapper.parentElement.classList.add("link-list-hidden");

		window.location = url;
	}


	/**
	 * Adds a link to the group
	 * @param {string} displayName The shown name of the link
	 * @param {string} url The url of the link
	 */
	addLink(link) {

		// Create the link item
		const itemTemplate = document.getElementById("link-item-template").content.cloneNode(true);
		const liText = itemTemplate.querySelector(".link-item-text");
		const liIcon = itemTemplate.querySelector(".link-item-icon");
		const li = itemTemplate.querySelector(".item-li-entry");
		liText.textContent = link.name;
		liIcon.setAttribute(
			"src",
			link.faviconURL ? 
				link.faviconURL : 
				`https://icon.horse/icon?uri=${link.faviconHost ? encodeURIComponent(link.faviconHost) : encodeURIComponent(link.url)
			}`);
		li.addEventListener("click", (e) => {
			e.stopPropagation();
			this.onItemClick.call(this, link.url);
		});

		// Add the link to the DOM & group
		this.linkListWrapper.append(itemTemplate);
		this.links.set(link.url, {
			title: link.name,
			url: link.url,
			faviconHost: link.faviconHost,
			element: itemTemplate,
		});
	}


	/**
	 * Builds the group component
	 * @returns {HTMLElement} The group component
	 */
	buildGroup() {

		// Create the group component
		const groupTemplate = document.getElementById("link-group-template").content.cloneNode(true);
		const linkList = groupTemplate.querySelector(".link-list");
		const linkListIcon = groupTemplate.querySelector(".link-group-icon");
		const li = groupTemplate.querySelector(".group-li-entry");
		li.addEventListener("click", async (e) => {
			await this.onGroupClick();
		});

		li.addEventListener("contextmenu", async (e) => {
			e.preventDefault();
			const tabPromises = Array.from(this.links.keys()).map(url => ChromeTabManager.createTab(url));
			const tabs = await Promise.all(tabPromises);
			ChromeTabManager.createGroup(this.name, tabs);
		});

		linkListIcon.setAttribute("src", `https://icon.horse/icon?uri=${encodeURIComponent(this.faviconSite)}`);

		// Add the group to the DOM
		document.getElementById("link-groups").append(groupTemplate);
		return {
			component: groupTemplate,
			linkListWrapper: linkList,
		};
	}


}
