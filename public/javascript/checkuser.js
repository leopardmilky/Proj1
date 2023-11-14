window.onpageshow = function(event){
    console.log("event: ", event);
    console.log("event.persisted: ", event.persisted);
    if(event.persisted){
        window.location.reload();
    }
}

history.pushState(null, null, location.href);
window.onpopstate = function (e) {
    history.go(1);
};