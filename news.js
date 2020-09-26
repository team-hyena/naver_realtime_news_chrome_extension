window.onload = function() {
  //실행할 코드
  let news = $.ajax({
    dataType: "json",
    url:  "https://www.naver.com/srchrank?frm=main",
    success: function(data){
          
          document.write("<table width='100%' height='100%' border='0' >")
            
          document.write("<td align='center'>")
          document.write("<table border='0' cellspacing='1' cellpadding='0'>");
          document.write("<h1>네이버 실시간 검색어</h1>")
          document.write("<th>랭킹</th>")
          document.write("<th>실시간 검색어</th>")
          document.write("<th>관련 링크</th>")
        for(let i = 0; i < data['data'].length; i++){
          let rawData = data['data'][i]
          let keyword = rawData['keyword']
          let rank = rawData['rank']
          let url = `https://search.naver.com/search.naver?where=nexearch&sm=tab_lve.agallgrpmamsi0en0sp0&ie=utf8&query=${keyword}`
          
          console.log(`rank: ${rawData['rank']}`);
          console.log(`keyword: ${rawData['keyword']}`);
          document.write("<tr>")
          document.write(`<td align='center'>${rawData['rank']}</td> `);
          document.write(`<td align='center'>${rawData['keyword']}</td>`);
          document.write(`<td align='center'><a href = "${url}" target="_blank">링크</a><br></td>`);
          document.write("</tr>");



          
        };

        document.write("</table>");
        document.write("</table>");
    }
  });
}