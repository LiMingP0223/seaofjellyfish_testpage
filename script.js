const results = {
  "1": { name: "HO1忘掉自己的幸福也就等於忘掉自己的不幸。", desc: "你是社團裏高一届的前輩。", img: "thefish1.jpg" },
  "2": { name: "HO2我知這世界本該如露水般短暫，然而，然而。", desc: "你是社團的團長" , img: "thefish2.jpg"},
  "3": { name: "HO3輕輕地叫了自己的名字，落下淚來的那十六嵗的春天", desc: "你是被拉進社團的成員。", img: "thefish3.jpg" }
};


const questions = [
  {
    q: "假如你有一个非常要好的朋友，你希望TA对你的感情是？",
    options: [
      { text: "A. 朋友以上，恋人未满。", type: ["1"] },
      { text: "B. 对抗路，完全就是损友啊！", type: ["3"] },
      { text: "C.良师益友，总是帮助你…… ", type: ["2"] }
    ]
  },
  {
    q: "假如有人曾经伤害过你，但是后来又向你道歉？",
    options: [
      { text: "A. 绝对不会原谅", type: ["1" ,"2"]},
      { text: "B. 如果真心改错的话会原谅", type: ["3" ]}
    ]
  },
  {
    q: "你希望和家人是哪种相处模式？",
    options: [
      { text: "A. 温柔照顾你，独自背负压力", type: ["1" ]},
      { text: "B. 严格要求你，但是对你很好", type:[ "2","3" ]},
      { text: "C. 对你时而疏远时而靠近", type:[ "3" ]}
    ]
  },
  {
    q: "你能接受你的角色被集体欺凌吗？",
    options: [
      { text: "A. 能", type: ["1","3" ]},
      { text: "B. 不能", type: ["2"] },
      { text: "C. 看具体情况", type: ["1","2","3"] }
    ]
  },
  {
    q: "你能接受你的角色与NPC有你未知的关系吗？",
    options: [
      { text: "A. 接受良好", type: ["2"] },
      { text: "B. 不能接受 ", type:[ "1"] },
      { text: "C. 看具体情况", type: ["1","2","3" ]}
    ]
  }
];

// ================= 逻辑控制区 =================

let currentQuestion = 0;
// 分数初始化
let scores = { "1": 0, "2": 0, "3": 0 }; 

// 开始测试
function startQuiz() {
  document.getElementById('home-section').style.display = 'none';
  document.getElementById('quiz-section').style.display = 'block';
  renderQuestion();
}

// 渲染题目
function renderQuestion() {
  const qData = questions[currentQuestion];
  
  document.getElementById('progress-text').textContent = `第 ${currentQuestion + 1} / ${questions.length} 题`;
  document.getElementById('question-text').textContent = qData.q;
  
  const optionsContainer = document.getElementById('options-container');
  optionsContainer.innerHTML = ''; 
  
  qData.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.textContent = opt.text;
    btn.onclick = () => selectOption(opt.type);
    optionsContainer.appendChild(btn);
  });
}

// 选择选项
function selectOption(type) {
  scores[type]++;
  currentQuestion++;
  if (currentQuestion < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

// 显示结果
function showResult() {
  document.getElementById('quiz-section').style.display = 'none';
  document.getElementById('result-section').style.display = 'block';

  let highestType = "1";
  let highestScore = -1;
  
  for (let key in scores) {
    if (scores[key] > highestScore) {
      highestScore = scores[key];
      highestType = key;
    }
  }

  const resultData = results[highestType];
  document.getElementById('result-name').textContent = resultData.name;
  document.getElementById('result-desc').textContent = resultData.desc;
  document.getElementById('result-image').src = resultData.img; 
  }
