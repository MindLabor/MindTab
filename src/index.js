"use strict";

import MindClock from "./MindClock.js";
import MindLinker from "./MindLinker.js";
import MindSearcher from "./MindSearcher.js";

const mindClock = new MindClock();
mindClock.start();

const mindSearcher = new MindSearcher();
mindSearcher.setUpSearch();

const mindLinker = new MindLinker();
mindLinker.setUpLinkListDismisser();
