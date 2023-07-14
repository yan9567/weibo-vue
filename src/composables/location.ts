function gotoUrl(url: string) {
    window.location.href = url;
    //window.location.reload(); //刷新
}

function openUrl(url: string){
    window.open(url);
}

export {gotoUrl, openUrl}