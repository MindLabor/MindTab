"use strict";

export default class ChromeTabManager {


    /**
     * Creates a new tab without switching to it
     * @param {string} url The url of the tab
     * @async
     */
	static createTab(url) {
		return new Promise((resolve) => {
			chrome.tabs.create({
				url,
				active: false,
			}, tab => resolve(tab));
		});
	}


    /**
     * Creates a tab group with the given tabs
     * @param {string} name The name of the group
     * @param {chrome.tabs.Tab[]} tabs The tabs to add to the group
     */
	static createGroup(name, tabs) {
		chrome.tabs.group({ tabIds: tabs.map(e => e.id) }, groupId => {
			chrome.tabGroups.update(groupId, {
				title: name,
			});
		});
	}


}
