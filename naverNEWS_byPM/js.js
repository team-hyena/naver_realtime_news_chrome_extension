let array = [];
for(let j=1; j<3; j++){
  for(let i=1; i<11; i++){
    let text = document.querySelector(`#content > div > div.selection_area > div.selection_content > div.field_list > div > div > ul:nth-child(${j}) > li:nth-child(${i}) > div > span.item_title_wrap > span.item_title`).innerText;
    console.log(text);
    array.push(text);
  }
}

array;