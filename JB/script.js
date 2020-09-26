var naver_rank_url = "https://www.naver.com/srchrank?frm=main"
var naver_query_url = "https://search.naver.com/search.naver?where=nexearch&sm=tab_lve.agallgrpmamsi0en0sp0&ie=utf8&query="

chrome.tabs.executeScript({
    file: "content.js"
}, (result)=> {
    if(chrome.runtime.lastError) {
        console.error("Script injection failed: " + chrome.runtime.lastError.message)
    }

    var context = document.getElementById('context')
    context.text = result


})