var xmlHttp = new XMLHttpRequest()
xmlHttp.onreadystatechange = ()=>{
    if(this.status ==200 && this.readyState == this.DONE) { 
        xmlHttp.responseText
    }
} 

xmlHttp.open('GET', 'naver_rank_url', true)
xmlHttp.send()