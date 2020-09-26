// 주소 요청
function request(url) {
  
  option = {
    method: 'GET'
  }
  
  return fetch(url, option)
    .then(function (res) {
      return res.json()
    })
    .then(result => result['data'])
    .catch(err => console.error(err))
}


const btn = document.querySelector('.click')
btn.addEventListener('click', event => {
  const rank_url = 'https://www.naver.com/srchrank?frm=main'
  
  request(rank_url).then(res => {
    let elem = document.querySelector('tbody.data')
    for (data of res){
      makingTable(elem, data.rank, data.keyword)
    }
  })
})

function makingTable(elem, rank, keyword) {
  const search_url = 'https://search.naver.com/search.naver?query='
  let key_search = document.createElement('a')
  key_search.href = search_url + keyword
  key_search.innerText = keyword
  key_search.target = '_blank'
  
  let td_rank = document.createElement('td')
  td_rank.innerText = rank
  
  let tr = document.createElement('tr')
  console.log(tr)
  tr.append(td_rank)
  tr.append(key_search)

  elem.append(tr)
  // console.log(elem.classList, rank, title)
}
