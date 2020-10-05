function matching(){
  chrome.tabs.executeScript({
    
    file: 'js.js' //길며는 꼭 꼭 꼭 파일로 만들어라.. 그리고 마지막에 보낼 result는 return하면 안 되고 그냥 호출하고 마무리해라.
    //문자가 들어와야 하는데 만약에 코드에 '가 있으면 에러가 나니까 "를 써준다.
  
  }, function(result){ //execute this callback function with result that is same to code result
    //위에서 한 번 페이지(탭)로 돌아갔다가 다시 팝업으로 온 것이다. 바깥에다가 써놓으면 안 된다.
    //팝업에서 한 번 나갔다가(exechuteScript) 페이지에서 정보를 가지도 다시 돌아와서, 그때부터 이야기를 시작해야 한다.
    const keywordsArray = result[0];
    const list = document.querySelector("#list");
    list.querySelectorAll('*').forEach(n => n.remove());


    function goToNewsSearch(event){
      const Btn = event.target;
      const url = "https://search.naver.com/search.naver?where=news&sm=tab_jum&query="+Btn.previousSibling.innerHTML; //https://까지 꼭 있어야 함.
      chrome.tabs.update({url: url});
    }
    for(i in keywordsArray){
      console.log(keywordsArray[i]);
      const li = document.createElement("li");
      const span = document.createElement("span");
      const newtab = document.createElement("button");
      span.innerText = keywordsArray[i];
      newtab.innerText = "관련 뉴스 보러가기";
      li.appendChild(span);
      li.appendChild(newtab);
      list.appendChild(li);
      newtab.addEventListener('click', goToNewsSearch);
    }

    chrome.storage.sync.set({
      "keywords": keywordsArray
    });
  })
}

// document.getElementById("rank-btn").onclick = chrome.tabs.update({url: "https://datalab.naver.com/keyword/realtimeList.naver"}); 왜 안 될까? 알 수가 없다.
chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  const dataLab = "https://datalab.naver.com/keyword/realtimeList.naver";
  const newsSearch = "https://search.naver.com/search.naver?where=news&sm=tab_jum&query="
  const currentUrl = tabs[0].url;
  if(currentUrl.indexOf(dataLab) !== -1){
    chrome.tabs.update({url: currentUrl});
    setTimeout(matching, 1000);
  }else{
    if(currentUrl.indexOf(newsSearch) !== -1){
      chrome.tabs.update({url: currentUrl});
      chrome.storage.sync.get(function(data){
        console.log(data.keywords);
        function goToNewsSearch(event){
          const Btn = event.target;
          const url = "https://search.naver.com/search.naver?where=news&sm=tab_jum&query="+Btn.previousSibling.innerHTML; //https://까지 꼭 있어야 함.
          chrome.tabs.update({url: url});
        }
        for(i in data.keywords){
          console.log(data.keywords[i]);
          const li = document.createElement("li");
          const span = document.createElement("span");
          const newtab = document.createElement("button");
          const list = document.querySelector("#list");
          span.innerText = data.keywords[i];
          newtab.innerText = "관련 뉴스 보러가기";
          li.appendChild(span);
          li.appendChild(newtab);
          list.appendChild(li);
          newtab.addEventListener('click', goToNewsSearch);
        }
      })
    }else{
      chrome.tabs.update({url: dataLab});
      setTimeout(matching, 1000);
    }
  }
});



//chrome.storage.sync.get(null, function (data) { console.info(data) });
//how to see bookmark in chrome extension console.
//permission을 주고 난 후에는 꼭 다시 등록해야 함.