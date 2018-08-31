let error = new Error('自定义错误');
console.log(error);

// let arr = [{ name: 1, age: 1 }]
// arr.map(function (o) { let id = o.age + 1; o['id'] = id });
// console.log(arr);

let desc = "abcdefghijklmn";
// console.log(desc.substr(3));
// // const fs = require('fs');
// // let content = fs.readFileSync('test/hello.txt');
// // console.log(content);

// let ba = '156';
// console.log(parseInt(ba, 8));
// let er = '01101110';
// console.log(parseInt(er, 2));

// let content = "<h1 style=\"font-size: 32px; font-weight: bold; border-bottom: 2px solid rgb(204, 204, 204); padding: 0px 4px 0px 0px; text-align: center; margin: 0px 0px 20px;\">HelloWorld<br/></h1><p>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;生如夏花只灿烂，死如蝼蚁只悲哀。古有言之，胜者为王，败着为寇。<br/></p><p><img src=\"/img/1034051217900310528.png\" alt=\"1034051217900310528.png\"/>一只可爱的小恐龙。</p>";
// // let img = content.search(/\b<img src=\"\S*?e\b/);
// let img_path = content.split('<img src=\"')[1].split('" alt')[0];


let arr = [91, 93, 91, 93, 95];
// let new_arr = [];
// for (let i = 0; i < arr.length; i++) {
//     if (new_arr.indexOf(arr[i]) > 0) {
//         set.delete(arr[i]);
//     } else {
//         set.add(arr[i]);
//     }
// }
// console.log(set);
console.log(arr.includes(95));
console.log(desc.includes('mn'));
