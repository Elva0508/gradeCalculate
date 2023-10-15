let hero = document.querySelector(".hero");
let slider = document.querySelector(".slider");
let animation = document.querySelector(".animation-wrapper");

const time_line = new TimelineMax();

//parameter1 是要控制的對象
//parameter2 是duration
//parameter3 是控制對象的原始狀態
//parameter4 是控制對象的動畫結束後的狀態
//parameter5 是設定提早開始跑的時間(原本是一個跑完才會換下一個動作)
time_line
  .fromTo(hero, 1, { height: "0%" }, { height: "100%" })

  .fromTo(hero, 1.2, { width: "80%" }, { width: "100%" })
  .fromTo(slider, 1.2, { x: "-100%" }, { x: "0%" }, "-=1.2")
  .fromTo(animation, 0.3, { opacity: "1" }, { opacity: "0" }); //-=1.2代表提早1.2s開始跑

//阻止輸入資料按ENTER鍵後輸出後端
window.addEventListener("keypress", (e) => {
  if (e.key == "enter") {
    e.preventDefault();
  }
});

//阻止按按鈕後資料送出後端
let buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  window.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

// 根據選擇不同的select option變換顏色
let allSelects = document.querySelectorAll("select");

allSelects.forEach((select) => {
  select.addEventListener("change", (e) => {
    setGPA();
    changeColor(e.target); // e.target就是<select>
    // console.log(select.value);
  });
});

function changeColor(target) {
  if (target.value == "A" || target.value == "A-") {
    target.style = "background-color:lightGreen";
  } else if (
    target.value == "B+" ||
    target.value == "B" ||
    target.value == "B-"
  ) {
    target.style = "background-color:yellow";
  } else if (
    target.value == "C+" ||
    target.value == "C" ||
    target.value == "C-"
  ) {
    target.style = "background-color:orange";
  } else if (
    target.value == "D+" ||
    target.value == "D" ||
    target.value == "D-"
  ) {
    target.style = "background-color:red";
  } else if (target.value == "F") {
    target.style = "background-color:gray";
  } else {
    target.style = "background-color:white";
  }
}

//改變credits後，GPA也要即時更新
let creditsPlus = document.querySelectorAll(".credits");
// console.log(creditsPlus); debug用
creditsPlus.forEach((credit) => {
  credit.addEventListener("change", (e) => {
    setGPA();
  });
});

//改變select後，GPA也要更新
//計算思路：每個form裡的credits*Score(換算字母後的分數) 除以 全部credits相加(分母)
function setGPA() {
  let formLength = document.querySelectorAll("form").length;
  let credits = document.querySelectorAll(".credits");
  let selects = document.querySelectorAll("select");
  let sum = 0;
  let creditSum = 0;
  let result = 0;
  for (let i = 0; i < credits.length; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      creditSum += credits[i].valueAsNumber;
    }
  }
  //   console.log("分母 = " + creditSum); debug用
  for (i = 0; i < formLength; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      sum = sum + convertor(selects[i].value) * credits[i].valueAsNumber;
    }
    // console.log("分子 = " + sum); debug用
  }
  if (creditSum == 0) {
    result = (0.0).toFixed(2);
  } else {
    result = (sum / creditSum).toFixed(2);
  }

  document.getElementById("resultGpa").innerText = result;
}

function convertor(grade) {
  switch (grade) {
    case "A":
      return 4.0;
    case "A-":
      return 3.7;
    case "B+":
      return 3.4;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;
    case "C+":
      return 2.4;
    case "C":
      return 2.0;
    case "C-":
      return 1.7;
    case "D+":
      return 1.4;
    case "D":
      return 1.0;
    case "D-":
      return 0.7;
    case "F":
      return 0.0;
    default:
      return 0;
  }
}

//使用Plus按鈕加入新的form

let plusBtn = document.querySelector("#plus-btn");
plusBtn.addEventListener("click", () => {
  let allForm = document.querySelector(".allForm");
  let newForm = document.createElement("form");
  let newInput1 = document.createElement("input");
  let newInput2 = document.createElement("input");
  let newInput3 = document.createElement("input");
  let newSelect = document.createElement("select");
  let newButton = document.createElement("button");
  let newIcon = document.createElement("i");
  newInput1.setAttribute("list", "classOpt");
  newInput1.setAttribute("type", "text");
  newInput1.setAttribute("placeholder", "課程類別");
  newInput2.setAttribute("type", "text");
  newInput2.setAttribute("placeholder", "課程名稱");
  newInput3.setAttribute("type", "number");
  newInput3.classList.add("credits");
  newInput3.setAttribute("min", "0");
  newInput3.setAttribute("max", "8");
  newInput3.setAttribute("placeholder", "學分");
  newSelect.classList.add("select");
  newButton.classList.add("trash");
  newIcon.classList.add("fa-trash");
  newIcon.classList.add("fa-solid");
  newButton.appendChild(newIcon);

  var opt1 = document.createElement("option");
  opt1.setAttribute("value", "");
  let textNode1 = document.createTextNode("");
  opt1.appendChild(textNode1);
  var opt2 = document.createElement("option");
  opt2.setAttribute("value", "A");
  let textNode2 = document.createTextNode("A");
  opt2.appendChild(textNode2);
  var opt3 = document.createElement("option");
  opt3.setAttribute("value", "A-");
  let textNode3 = document.createTextNode("A-");
  opt3.appendChild(textNode3);
  var opt4 = document.createElement("option");
  opt4.setAttribute("value", "B+");
  let textNode4 = document.createTextNode("B+");
  opt4.appendChild(textNode4);
  var opt5 = document.createElement("option");
  opt5.setAttribute("value", "B");
  let textNode5 = document.createTextNode("B");
  opt5.appendChild(textNode5);
  var opt6 = document.createElement("option");
  opt6.setAttribute("value", "B-");
  let textNode6 = document.createTextNode("B-");
  opt6.appendChild(textNode6);
  var opt7 = document.createElement("option");
  opt7.setAttribute("value", "C+");
  let textNode7 = document.createTextNode("C+");
  opt7.appendChild(textNode7);
  var opt8 = document.createElement("option");
  opt8.setAttribute("value", "C");
  let textNode8 = document.createTextNode("C");
  opt8.appendChild(textNode8);
  var opt9 = document.createElement("option");
  opt9.setAttribute("value", "C-");
  let textNode9 = document.createTextNode("C-");
  opt9.appendChild(textNode9);
  var opt10 = document.createElement("option");
  opt10.setAttribute("value", "D+");
  let textNode10 = document.createTextNode("D+");
  opt10.appendChild(textNode10);
  var opt11 = document.createElement("option");
  opt11.setAttribute("value", "D");
  let textNode11 = document.createTextNode("D");
  opt11.appendChild(textNode11);
  var opt12 = document.createElement("option");
  opt12.setAttribute("value", "D-");
  let textNode12 = document.createTextNode("D-");
  opt12.appendChild(textNode12);
  var opt13 = document.createElement("option");
  opt13.setAttribute("value", "F");
  let textNode13 = document.createTextNode("F");
  opt13.appendChild(textNode13);

  newSelect.appendChild(opt1);
  newSelect.appendChild(opt2);
  newSelect.appendChild(opt3);
  newSelect.appendChild(opt4);
  newSelect.appendChild(opt5);
  newSelect.appendChild(opt6);
  newSelect.appendChild(opt7);
  newSelect.appendChild(opt8);
  newSelect.appendChild(opt9);
  newSelect.appendChild(opt10);
  newSelect.appendChild(opt11);
  newSelect.appendChild(opt12);
  newSelect.appendChild(opt13);

  newForm.appendChild(newInput1);
  newForm.appendChild(newInput2);
  newForm.appendChild(newInput3);
  newForm.appendChild(newSelect);
  newForm.appendChild(newButton);
  allForm.appendChild(newForm);

  //使用Plus按鈕加入新的form時讓格子有一個由小到大的動畫
  newForm.style = "animation : scaleUp 0.5s ease";

  //使用trash按鈕刪除新增後的form
  let allTrash = document.querySelectorAll(".trash");
  allTrash.forEach((trash) => {
    trash.addEventListener("click", (e) => {
      e.target.parentElement.parentElement.classList.add("remove"); //先完成動畫，才刪除
      window.setTimeout(() => {
        e.target.parentElement.parentElement.remove();
        setGPA();
      }, 480); //刪除form時製作由大變小的動畫
    });
  });

  //讓新增的select也可以變換顏色
  let allSelects = document.querySelectorAll("select");
  allSelects.forEach((select) => {
    select.addEventListener("change", (e) => {
      setGPA();
      changeColor(e.target);
    });
  });

  //讓新增的form改變credits後，GPA也要即時更新
  let creditsPlus = document.querySelectorAll(".credits");
  creditsPlus.forEach((credit) => {
    credit.addEventListener("change", (e) => {
      setGPA();
    });
  });
});

//使用按鈕刪除原有的form
let allTrash = document.querySelectorAll(".trash");
allTrash.forEach((trash) => {
  trash.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.classList.add("remove"); //先完成動畫，才刪除
    window.setTimeout(() => {
      e.target.parentElement.parentElement.remove();
      setGPA();
    }, 480); //刪除form時製作由大變小的動畫
  });
});

//排序演算法
let btn1 = document.querySelector(".descending");
let btn2 = document.querySelector(".ascending");

btn1.addEventListener("click", (e) => {
  handleSorting("descending");
});
btn2.addEventListener("click", (e) => {
  handleSorting("ascending");
});

function handleSorting(direction) {
  let grader = document.querySelectorAll("form");
  let object_array = [];
  for (i = 0; i < grader.length; i++) {
    let grader_catogory = grader[i].children[0].value;
    let grader_number = grader[i].children[1].value;
    let grader_credits = grader[i].children[2].value;
    let grader_score = grader[i].children[3].value;

    if (
      !(
        grader_catogory == "" &&
        grader_number == "" &&
        grader_credits == "" &&
        grader_score == ""
      )
    ) {
      let class_object = {
        class_catogory: grader_catogory,
        class_number: grader_number,
        class_credits: grader_credits,
        class_score: grader_score,
      }; //將form裡面的資料做成一個物件
      object_array.push(class_object); //將物件推入array中
    }
  }

  //取得object_array之後，將score的等級換算成數字
  for (i = 0; i < object_array.length; i++) {
    object_array[i].class_score_number = convertor(object_array[i].class_score);
  }

  object_array = mergeSort(object_array);
  if (direction == "ascending") {
    object_array = object_array.reverse();
  }

  //根據object的內容更新網頁中form的順序
  let allForm = document.querySelector(".allForm");
  allForm.innerHTML = "";
  for (i = 0; i < object_array.length; i++) {
    allForm.innerHTML += `<form>
          <input list="classOpt" type="text" placeholder="課程類別" value ="${object_array[i].class_catogory}" /><!--
          --><input type="text" value ="${object_array[i].class_number}" placeholder="課程名稱" /><!--
          --><input
          type="number"
          class="credits"
          value ="${object_array[i].class_credits}"
          min="0"
          max="8"
          placeholder="學分"
          /><!--
          --><select name="計算機" class="select">
          <option value=""></option>
          <option value="A">A</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B">B</option>
          <option value="B-">B-</option>
          <option value="C+">C+</option>
          <option value="C">C</option>
          <option value="C-">C-</option>
          <option value="D+">D+</option>
          <option value="D">D</option>
          <option value="D-">D-</option>
          <option value="F">F</option></select
          ><!--
          --><button class="trash"><i class="fa-solid fa-trash"></i></button>
          </form>`;
  }
  //因為select標籤沒辦法直接用${}賦予value的值，所以要直接用JS手動更改
  allForm = document.querySelectorAll("Form"); //因為allForm抓取的是靜態的nodeList，上面已經更改過了，要更新allForm的值
  for (i = 0; i < allForm.length; i++) {
    allForm[i].children[3].value = object_array[i].class_score;
    changeColor(allForm[i].children[3]);
  }

  //改變排序後，credits更動，GPA也要即時更新
  let allCredits = document.querySelectorAll(".credits");
  allCredits.forEach((credit) => {
    credit.addEventListener("change", (e) => {
      setGPA();
    });
  });

  //改變排序後，更改select時，GPA跟顏色也要更新
  let allSelects = document.querySelectorAll("select");

  allSelects.forEach((select) => {
    select.addEventListener("change", (e) => {
      setGPA();
      changeColor(e.target); // e.target就是<select>
    });
  });

  //改變排序後，使用按鈕刪除原有的form
  let allTrash = document.querySelectorAll(".trash");
  allTrash.forEach((trash) => {
    trash.addEventListener("click", (e) => {
      e.target.parentElement.parentElement.classList.add("remove"); //先完成動畫，才刪除
      window.setTimeout(() => {
        e.target.parentElement.parentElement.remove();
        setGPA();
      }, 480); //刪除form時製作由大變小的動畫
    });
  });
}
function merge(a1, a2) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < a1.length && j < a2.length) {
    if (a1[i].class_score > a2[j].class_score) {
      result.push(a2[j]);
      j++;
    } else {
      result.push(a1[i]);
      i++;
    }
  }

  while (i < a1.length) {
    result.push(a1[i]);
    i++;
  }
  while (j < a2.length) {
    result.push(a2[j]);
    j++;
  }

  return result;
}

function mergeSort(arr) {
  if (arr.length == 0) {
    return;
  }

  if (arr.length == 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle, arr.length);
    return merge(mergeSort(left), mergeSort(right));
  }
}
