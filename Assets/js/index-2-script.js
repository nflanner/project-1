var queryString = document.location.search;
var uneditTitle = queryString.split('=')[1];
var title = '';
if (uneditTitle.includes('%20')) {
    var decomposedName = uneditTitle.split('%20');
    for (var i = 0; i < decomposedName.length; i++) {
        title += ' ' + decomposedName[i];
    }
} else {
    title = uneditTitle;
}