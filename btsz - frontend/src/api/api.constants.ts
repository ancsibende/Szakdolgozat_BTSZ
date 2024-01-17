export const LOGIN = "/auth/login";
export const LOGOUT = "/auth/logout";

//USER-MANAGEMENT
export const USER_MANAGEMENT = "users";
export const TEAMS = "teams";

//EVENTS & RESULTS
export const EVENTS = "events";
export const ADDEVENT = "addevent";
export const DELEVENT = "event/{:id}";
export const HOMEEVENTS = "events/";
export const ADDRESULT = "event/{:id}/addresults";
export const EDITRESULT = "event/{:id}/editresults";
export const GETEVENTWRESULTSFEMALE = "events/withresults/female";
export const GETEVENTWRESULTSMALE = "events/withresults/male";
export const UPLOADIMAGE = "image/upload/{:id}";
export const GETIMAGE = "image/{:id}";

//NEWS
export const NEWS = "news";
export const ADDNEWS = "news/add";
export const DELNEWS = "news/{:id}";
