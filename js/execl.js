var previousData = ""; // 全局变量来存储之前录入的数据

function handleFileSelect(evt) {//读取表格并生成txt
    var files = evt.target.files;
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, {type: 'array'});
        var sheet1 = workbook.Sheets[workbook.SheetNames[0]]; // First worksheet
        var sheet2 = workbook.Sheets[workbook.SheetNames[1]]; // Second worksheet
        var rangeSheet1 = { s: { c: 1, r: 2 }, e: { c: 16, r: 6 } }; // B3 to Q7
        var dataInRangeSheet1 = readDataInRange(sheet1, rangeSheet1);
        var rangeSheet2 = { s: { c: 1, r: 39 }, e: { c: 24, r: 42 } }; // B40 to Y43
        var dataInRangeSheet2 = readDataInRange(sheet2, rangeSheet2);
        var combinedData = dataInRangeSheet1.concat(dataInRangeSheet2);
//                generateTable(combinedData);  已弃用
        displayText(combinedData);
    };
    reader.readAsArrayBuffer(files[0]);
}

function readDataInRange(sheet, range) {//表格读取范围
    var dataInRange = [];
    for (var R = range.s.r; R <= range.e.r; ++R) {
        var row = [];
        for (var C = range.s.c; C <= range.e.c; ++C) {
            var cellAddress = { c: C, r: R };
            var cellRef = XLSX.utils.encode_cell(cellAddress);
            var cell = sheet[cellRef];
            var cellValue = cell ? cell.v : '';
            row.push(cellValue);
        }
        dataInRange.push(row);
    }
    return dataInRange;
}



function extractSkillsFromTextarea(Tdata) {// .st处理函数 分割角色数据和描述 
    var data = Tdata;
    var startIndex = data.indexOf('.st');
    if (startIndex === -1) {
        console.error('.st not found.');
        return;
    }
    
    var endIndex = data.indexOf('\t\t', startIndex);
    if (endIndex === -1) {
        console.error('End of skills data not found.');
        return;
    }
    
    var skillsData = data.substring(startIndex + 3, endIndex).trim();
    console.log(skillsData);
    return skillsData;
}


function displayText(data) { //生成txt文本
    var textData = data.map(row => row.join('\t')).join('\n');
    var textArea = document.createElement('textarea');
    textArea.value = transformData(extractSkillsFromTextarea(textData))
    previousData = extractSkillsFromTextarea(textData)
    document.body.appendChild(textArea);
}

function transformData(input) {//分割参数
    var regex = /(力量|敏捷|意志|体质|外貌|教育|体型|智力|灵感|san值|理智|幸运|魔法|体力|会计|人类学|估价|考古学|速记|文学|取悦|魅惑|攀爬|计算机使用|信用|信誉|信用评级|克苏鲁|克苏鲁神话|乔装|闪避|驾驶|汽车驾驶|电气维修|电子学|话术|斗殴|剑|手枪|急救|历史|恐吓|跳跃|英语|母语|法律|图书馆|图书馆使用|聆听|开锁|撬锁|锁匠|机械维修|医学|博物学|自然学|领航|导航|神秘学|重型操作|重型机械|操作重型机械|重型|说服|精神分析|心理学|骑术|生物学|植物学|妙手|侦查|潜行|生存|游泳|投掷|追踪|驯兽|潜水|爆破|读唇|催眠|炮术)(\d+)/g;
    var count =1;
    var matches = input.matchAll(regex);
    var result = "";
    for (const match of matches) {
        if(count%6==0){
            result += match[1] + match[2] + '\n';
        }
        else{
            result += match[1] + match[2] + '\t';
        }
        count++;
    }
    count=1;
    // 去除最后一个制表符
    result = result.slice(0, -1);
    // 添加换行符
    result += '\n';
    console.log(result);
    return result;
}


function generateStyledTable() {//生成一个全新的文本栏显示处理结束的txt
    var container = document.querySelector('.container');
    if (!container) {
        console.error('Container not found.');
        return;
    }
    
    var textArea = document.querySelector('textarea'); 
    if (!textArea) {
        console.error('Textarea not found.');
        return;
    }
    var textLines = textArea.value.split('\n');
    var table = document.createElement('table');
     // 添加斑马条纹和调整样式
//    var evenRowColor = '#F0FDFF';                   表格形式生成已弃用
//    var oddRowColor = '#AEE1E9';                    表格形式生成已弃用
    textLines.forEach(function(line, index) {
        var row = table.insertRow();
        var cells = line.split('\t');
        cells.forEach(function(cellData) {
            var cell = row.insertCell();
            cell.textContent = cellData;
//            cell.style.padding = '6px';              表格形式生成已弃用
//            cell.style.border = '1px solid #ddd';    表格形式生成已弃用
        });
        // 设置斑马条纹
//        row.style.backgroundColor = index % 2 === 0 ? evenRowColor : oddRowColor; 已弃用
    });

//    var card = document.createElement('div');        卡片形式生成已弃用
//    card.className = 'card';           卡片形式生成已弃用
//    card.appendChild(table);           卡片形式生成已弃用
//    container.appendChild(card);       卡片形式生成已弃用
//    container.appendChild(table);      卡片形式生成已弃用
    if (document.body.contains(textArea)) {
        document.body.removeChild(textArea);
    }
/*    setTimeout(function(){
    var children = document.body.children;
        for (var i = children.length - 1; i >= 0; i--) {
            var child = children[i];
            if (!child.classList.contains('banner')) {
                document.body.removeChild(child);
            }
        }
    }, 5000);
*///                                     删除模块已弃用 
    showTooltip();
    addData();
}

function showTooltip() {
    var tooltip = document.getElementById('tooltip');
    tooltip.classList.add('show');
    
    // Hide the tooltip after 3 seconds
    setTimeout(function() {
        tooltip.classList.remove('show');
        showtrips();
    }, 3000);
}

function showtrips() {
    var trips = document.getElementById('trips');
    trips.classList.add('show');
    
    // Hide the trips after 3 seconds
    setTimeout(function() {
        trips.classList.remove('show');
    }, 3000);
}

function addData() {
    var container = document.querySelector('.InputData');
    var newElement = document.createElement('h5');
    newElement.textContent = '测试人物卡  test test test';
    newElement.onclick = function() { showTextarea(this); };
    container.appendChild(newElement);
}

function showTextarea(element) {
    var textarea = document.createElement('textarea');
    textarea.style.display = 'block';
    textarea.value = previousData; // 显示之前录入的数据
    element.parentNode.insertBefore(textarea, element.nextSibling);
}

document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
