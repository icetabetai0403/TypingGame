// 変数の初期化
let untyped = "";
let typed = "";
let score = 0;

// 必要なHTML要素の取得
const untypedField = document.getElementById("untyped");
const typedField = document.getElementById("typed");
const wrap = document.getElementById("wrap");
const start = document.getElementById("start");
const count = document.getElementById("count");
const textcountField = document.getElementById("textcount");

// 複数のテキストを格納する配列
const textLists = [
  "Hello World",
  "This is my App",
  "How are you?",
  "Today is sunny",
  "I love JavaScript!",
  "Good morning",
  "I am Japanese",
  "Let it be",
  "Samurai",
  "Typing Game",
  "Information Technology",
  "I want to be a programmer",
  "What day is today?",
  "I want to build a web app",
  "Nice to meet you",
  "Chrome Firefox Edge Safari",
  "machine learning",
  "Brendan Eich",
  "John Resig",
  "React Vue Angular",
  "Netscape Communications",
  "undefined null NaN",
  "Thank you very much",
  "Google Apple Facebook Amazon",
  "ECMAScript",
  "console.log",
  "for while if switch",
  "var let const",
  "Windows Mac Linux iOS Android",
  "programming",
];

// ランダムなテキストを表示
const createText = () => {
  // 正タイプした文字列をクリア
  typed = "";
  typedField.textContent = typed;
  // 配列のインデックス数からランダムな数値を生成する
  let random = Math.floor(Math.random() * textLists.length);
  // 配列からランダムにテキストを取得し画面に表示する
  untyped = textLists[random];
  untypedField.textContent = untyped;
};

// キー入力の判定
const keyPress = (e) => {
  if (isGameOver) return;
  // 誤タイプの場合
  if (e.key !== untyped.substring(0, 1)) {
    wrap.classList.add("mistyped");
    wrap.classList.add("shake");
    // 語タイプのときに効果音を鳴らす
    const typeSound = new Audio("audio/whistle.mp3");
    typeSound.play();
    // 100ms後に背景色を元に戻す
    setTimeout(() => {
      wrap.classList.remove("mistyped");
      wrap.classList.remove("shake");
    }, 100);
    return;
  }

  // 正タイプの場合
  // スコアのインクリメント
  score++;
  wrap.classList.remove("mistyped");
  typed += untyped.substring(0, 1);
  untyped = untyped.substring(1);
  typedField.textContent = typed;
  untypedField.textContent = untyped;

  // 正タイプのときに効果音を鳴らす
  const typeSound = new Audio("audio/mouseclick.mp3");
  typeSound.play();

  // 現在のスコアを表示させる
  let textCount = textcountField.textContent;
  textcountField.textContent = score;

  // テキストがなくなったら新しいテキストを表示
  if (untyped === "") {
    createText();
  }
};

// タイピングスキルのランクを判定
const rankCheck = (score) => {
  // テキストを格納する変数を作る
  let text = "";

  // スコアに応じて異なるメッセージを変数textに格納する
  if (score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if (score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
  } else if (score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
  } else if (score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます!`;
  }

  // 生成したメッセージと一緒に文字列を返す
  return `${score}文字打てました!\n${text}`;
};

// グローバル変数として isGameOver を追加
let isGameOver = false;

// ゲームを終了
const gameOver = () => {
  clearInterval(timerId);
  isGameOver = true;

  // キーボードイベントリスナーを削除
  document.removeEventListener("keypress", keyPress);

  // 結果表示
  const result = rankCheck(score);

  // ポップアップで結果を表示
  setTimeout(() => {
    alert(result);

    // アラートが閉じられた後の処理
    typedField.textContent = "";

    // 「スタート画面に戻る」ボタンを作成
    const restartButton = document.createElement("button");
    restartButton.textContent = "スタート画面に戻る";
    restartButton.id = "restart";

    // ボタンコンテナを取得し、既存のスタートボタンを削除して新しいボタンを追加
    const buttonContainer = document.getElementById("button-container");
    buttonContainer.innerHTML = "";
    buttonContainer.appendChild(restartButton);

    // ボタンのクリックイベント
    restartButton.addEventListener("click", () => {
      window.location.reload();
    });
  }, 10);
};

// グローバル変数として timer の id を保持
let timerId;

// カウントダウンタイマー
const timer = () => {
  let time = parseFloat(count.textContent);

  timerId = setInterval(() => {
    time -= 0.01;
    if (time <= 0) {
      time = 0;
      count.textContent = time.toFixed(2);
      typedField.textContent = "";
      untypedField.textContent = "タイムアップ！";
      clearInterval(timerId);
      gameOver();
    } else {
      count.textContent = time.toFixed(2);
    }
  }, 10);
};

// ゲームスタート時の処理
start.addEventListener("click", () => {
  // 「スタート」ボタンを非表示にする
  start.style.display = "none";

  // カウントダウンを開始する
  startCountdown();
});

untypedField.textContent = "スタートボタンで開始";

// カウントダウン用の関数を追加
const startCountdown = () => {
  let countDown = 3;
  const countdownSound = new Audio("audio/countdown.mp3"); // カウントダウン音声ファイルのパスを適切に設定してください

  const countdownInterval = setInterval(() => {
    if (countDown > 0) {
      untypedField.textContent = countDown;
      countdownSound.play();
      countDown--;
    } else {
      clearInterval(countdownInterval);
      untypedField.textContent = "";
      createText();
      timer();
      document.addEventListener("keypress", keyPress);
    }
  }, 1000);
};
