const PARSE_API = 'https://jx.xmflv.cc/?url=';

const platforms = [
  { name: '腾讯视频', url: 'https://v.qq.com/', initial: '腾', color: '#0052d9' },
  { name: '爱奇艺',  url: 'https://www.iqiyi.com/', initial: '奇', color: '#00be06' },
  { name: '优酷视频', url: 'https://youku.com/', initial: '优', color: '#1890ff' },
  { name: '芒果TV',  url: 'https://www.mgtv.com/', initial: '芒', color: '#ff7300' },
  { name: '咪咕视频', url: 'https://www.miguvideo.com/', initial: '咪', color: '#9333ea' },
];

const $ = (sel) => document.querySelector(sel);

const urlInput    = $('#urlInput');
const clearBtn    = $('#clearBtn');
const pasteBtn    = $('#pasteBtn');
const parseBtn    = $('#parseBtn');
const errorMsg    = $('#errorMsg');
const playerSec   = $('#playerSection');
const videoFrame  = $('#videoFrame');
const closePlayer = $('#closePlayer');
const grid        = $('#platformsGrid');

function renderPlatforms() {
  grid.innerHTML = platforms.map(p => `
    <a class="platform-card" href="${p.url}" target="_blank" rel="noopener">
      <div class="platform-icon" style="background:${p.color}">${p.initial}</div>
      <span class="platform-name">${p.name}</span>
    </a>
  `).join('');
}

function showError(msg) {
  errorMsg.textContent = msg;
}

function isValidURL(str) {
  return /^https?:\/\/.+/.test(str);
}

function parseVideo() {
  const url = urlInput.value.trim();

  if (!url) {
    showError('链接不能为空，请重新输入！');
    return;
  }

  if (!isValidURL(url)) {
    showError('链接格式有误，请输入 http(s) 开头的链接！');
    return;
  }

  showError('');
  const src = PARSE_API + encodeURIComponent(url);
  videoFrame.src = src;
  playerSec.style.display = 'block';
  playerSec.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

urlInput.addEventListener('input', () => {
  clearBtn.style.display = urlInput.value ? 'flex' : 'none';
  showError('');
});

clearBtn.addEventListener('click', () => {
  urlInput.value = '';
  clearBtn.style.display = 'none';
  urlInput.focus();
  showError('');
});

pasteBtn.addEventListener('click', async () => {
  try {
    const text = await navigator.clipboard.readText();
    if (text) {
      urlInput.value = text;
      clearBtn.style.display = 'flex';
      showError('');
    }
  } catch {
    showError('粘贴失败，请长按输入框手动粘贴');
  }
});

parseBtn.addEventListener('click', parseVideo);

urlInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') parseVideo();
});

closePlayer.addEventListener('click', () => {
  videoFrame.src = '';
  playerSec.style.display = 'none';
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}

renderPlatforms();
