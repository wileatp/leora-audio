const stories = [
  {id:'mua-di-qua-hien-nha',title:'Mùa đi qua hiên nhà',author:'An Nhiên',category:'Tình cảm',duration:'03:24',episodes:8,description:'Có những người, chỉ cần nhớ thôi cũng đủ làm một mùa trở gió.',cover:'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=900&q=86',coverTitle:'Mùa đi qua\nhiên nhà',episode:'Tập 01 · Một chiều rất khẽ',excerpt:'Chiều hôm ấy, nắng nằm yên trên bậc thềm cũ. An đứng bên hiên nhà, nghe tiếng gió đi qua hàng cây và chợt nhận ra, có những người dù đã rời xa, vẫn dịu dàng ở lại trong ký ức. Cô khẽ mỉm cười. Mùa cũ đã qua, nhưng lòng người thì vẫn còn thương.'},
  {id:'nhung-ngay-troi-xanh',title:'Những ngày trời xanh',author:'Minh Thư',category:'Chữa lành',duration:'02:48',episodes:6,description:'Một hành trình nhỏ để học cách dịu dàng với chính mình.',cover:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=86',coverTitle:'Những ngày\ntrời xanh',episode:'Tập 01 · Ngày mình thôi vội',excerpt:'Có một ngày, ta thức dậy và không còn muốn chạy đua với bất kỳ ai. Ta pha một tách trà, mở ô cửa sổ, để gió đi qua căn phòng. Hóa ra bình yên không phải điều gì xa xôi. Đôi khi, bình yên chỉ là cho phép mình được sống chậm hơn một chút.'},
  {id:'thanh-xuan-nam-ay',title:'Thanh xuân năm ấy',author:'Hạ Lam',category:'Thanh xuân',duration:'04:06',episodes:10,description:'Một lời chưa nói, một sân trường, và mùa hạ không trở lại.',cover:'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900&q=86',coverTitle:'Thanh xuân\nnăm ấy',episode:'Tập 01 · Mùa phượng cuối',excerpt:'Năm tháng ấy, chúng ta từng nghĩ mùa hè sẽ dài vô tận. Tiếng ve, trang lưu bút và những lời hẹn gặp lại cứ thế nằm yên trong ngăn ký ức. Đến một ngày nhìn lại, mới hiểu điều đẹp nhất của thanh xuân không phải là ta đã đi được bao xa, mà là đã từng có nhau.'},
  {id:'gui-nguoi-o-lai',title:'Gửi người ở lại',author:'Lam Chi',category:'Tình cảm',duration:'03:12',episodes:7,description:'Bức thư không gửi, viết cho một người từng rất thân quen.',cover:'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=900&q=86',coverTitle:'Gửi người\nở lại',episode:'Tập 01 · Bức thư tháng mười',excerpt:'Nếu một ngày vô tình đọc được những dòng này, mong bạn biết rằng tôi vẫn nhớ. Không phải nỗi nhớ khiến người ta buồn, mà là thứ dịu dàng như ánh đèn cuối phố. Cảm ơn bạn vì đã từng bước qua những năm tháng đẹp nhất của tôi.'},
  {id:'mot-chut-mua-trong-long',title:'Một chút mưa trong lòng',author:'Tường Vy',category:'Tản văn',duration:'02:36',episodes:5,description:'Những mẩu chuyện bé xíu giữa thành phố rộng và lòng người.',cover:'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=900&q=86',coverTitle:'Một chút mưa\ntrong lòng',episode:'Tập 01 · Phố sau cơn mưa',excerpt:'Thành phố sau cơn mưa có mùi của đất ẩm và những điều vừa được gột rửa. Người ta vội vã đi qua nhau, còn tôi chọn ngồi lại bên ô cửa kính, nhìn những giọt nước cuối cùng trượt dài. Có lẽ, ai rồi cũng cần một cơn mưa để lòng mình nhẹ đi.'},
  {id:'noi-hoa-no-muon',title:'Nơi hoa nở muộn',author:'Diệp An',category:'Chữa lành',duration:'03:51',episodes:9,description:'Không có mùa nào đến muộn với một người đang học cách lớn lên.',cover:'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=900&q=86',coverTitle:'Nơi hoa nở\nmuộn',episode:'Tập 01 · Mùa của riêng mình',excerpt:'Hoa không nở cùng một thời điểm. Có bông chọn tháng ba, có bông đợi đến tận cuối hè. Con người cũng vậy. Không ai cần phải rực rỡ đúng vào mùa của người khác. Chỉ cần tiếp tục lớn lên, rồi sẽ có ngày ánh sáng tìm đến.'}
];

const $ = (selector, root=document) => root.querySelector(selector);
const storyGrid = $('#storyGrid');
const audio = $('#audioElement');
let currentStory = stories[0];
let currentFilter = 'Tất cả';
let searchTerm = '';
let isPlaying = false;
let activeAudioUrl = '';
let speechMode = false;
let toastTimer;
let playedSeconds = 0;
let visibleCount = 6;
let sortNewest = true;
let recentStoryId = localStorage.getItem('leora-recent') || '';
let favorites = new Set(JSON.parse(localStorage.getItem('leora-favorites') || '[]'));

function escapeHTML(value){return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));}
function showToast(message){const toast=$('#toast');toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2600);}
function updateFavoriteCount(){ $('#favoriteCount').textContent=favorites.size; $('#savedLabel').textContent=`${favorites.size} CÂU CHUYỆN ĐÃ LƯU`; $('#savedListCount').textContent=String(favorites.size).padStart(2,'0'); }
function saveFavorites(){localStorage.setItem('leora-favorites',JSON.stringify([...favorites]));updateFavoriteCount();renderSaved();}
function renderStories(){
  let results=stories.filter(story=>currentFilter==='Tất cả'||story.category===currentFilter);
  if(searchTerm){const term=searchTerm.toLocaleLowerCase('vi');results=results.filter(s=>[s.title,s.author,s.category,s.description].some(value=>value.toLocaleLowerCase('vi').includes(term)));}
  if(!sortNewest)results=[...results].reverse();
  const visible=results.slice(0,visibleCount);
  storyGrid.innerHTML=visible.map((story,index)=>`<article class="story-card" style="animation-delay:${index*45}ms"><div class="story-cover"><div class="story-cover-bg" style="background-image:url('${story.cover}')"></div><div class="story-cover-top"><span>LEORA SELECTED</span><span>0${index+1}</span></div><div class="story-cover-title">${escapeHTML(story.coverTitle).replace('\n','<br>')}</div><button class="story-play" data-play="${story.id}" aria-label="Nghe ${escapeHTML(story.title)}">▶</button></div><div class="story-card-info"><div class="story-card-meta"><span>${escapeHTML(story.category.toUpperCase())}</span><span>${story.episodes} TẬP · ${story.duration}</span></div><h3>${escapeHTML(story.title)}</h3><p class="story-card-desc">${escapeHTML(story.description)}</p><div class="story-card-bottom"><span class="story-author">Kể bởi ${escapeHTML(story.author)}</span><div class="story-actions"><button class="tiny-action ${favorites.has(story.id)?'saved':''}" data-favorite="${story.id}" aria-label="${favorites.has(story.id)?'Bỏ lưu':'Lưu'} ${escapeHTML(story.title)}">${favorites.has(story.id)?'♥':'♡'}</button><button class="listen-link" data-play="${story.id}">NGHE THỬ ↗</button></div></div></div></article>`).join('');
  $('#emptyState').hidden=visible.length!==0;
  $('#loadMore').style.display=visible.length>=results.length?'none':'inline-block';
}
function renderSaved(){
  const saved=stories.filter(story=>favorites.has(story.id));
  $('#savedList').innerHTML=saved.length?saved.map(story=>`<div class="saved-item"><div class="saved-item-thumb" style="background-image:url('${story.cover}')"></div><div class="saved-item-copy"><strong>${escapeHTML(story.title)}</strong><span>${escapeHTML(story.category)} · ${story.episodes} tập</span></div><button data-remove-favorite="${story.id}" aria-label="Bỏ lưu ${escapeHTML(story.title)}">×</button></div>`).join(''):'<p class="saved-empty">Nhấn biểu tượng ♡ ở một câu chuyện để lưu lại nơi này.</p>';
  updateFavoriteCount();
}
function setPlayerStory(story){
  currentStory=story;recentStoryId=story.id;localStorage.setItem('leora-recent',story.id);playedSeconds=0;speechMode=false;
  if(activeAudioUrl){URL.revokeObjectURL(activeAudioUrl);activeAudioUrl='';}
  audio.pause();audio.removeAttribute('src');audio.load();
  $('#playerTitle').textContent=story.title;$('#playerEpisode').textContent=story.episode;
  $('#playerCover').style.backgroundImage=`linear-gradient(rgba(70,47,61,.08),rgba(70,47,61,.08)),url('${story.cover}')`;
  $('#playerCover').style.backgroundSize='cover';$('#playerCover').innerHTML='';
  $('#playerHeart').textContent=favorites.has(story.id)?'♥':'♡';$('#playerHeart').classList.toggle('saved',favorites.has(story.id));
  $('#durationTime').textContent=story.duration;$('#currentTime').textContent='00:00';$('#progressRange').value=0;setRangeFill(0);
  renderContinue();
}
function formatTime(seconds){if(!Number.isFinite(seconds)||seconds<0)return '00:00';const m=Math.floor(seconds/60),s=Math.floor(seconds%60);return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;}
function setRangeFill(value){$('#progressRange').style.background=`linear-gradient(to right,#a97d85 0%,#a97d85 ${value}%,#ded5ce ${value}%,#ded5ce 100%)`;}
function setPlayingUI(playing){isPlaying=playing;$('#playButton').innerHTML=playing?'<span>Ⅱ</span>':'<span>▶</span>';$('#playingLabel').classList.toggle('active',playing);$('#playingLabel').innerHTML=playing?'<i></i> ĐANG PHÁT':'<i></i> SẴN SÀNG LẮNG NGHE';}
function startStory(id){
  const story=stories.find(item=>item.id===id)||stories[0];
  if(currentStory.id!==story.id)setPlayerStory(story);
  if(audio.src){audio.play().then(()=>setPlayingUI(true)).catch(()=>showToast('Không thể phát tệp audio này trên trình duyệt.'));return;}
  if('speechSynthesis' in window){
    window.speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(story.excerpt);utterance.lang='vi-VN';utterance.rate=.9;utterance.pitch=1.02;
    const voices=window.speechSynthesis.getVoices();const vietnamese=voices.find(voice=>voice.lang.toLowerCase().startsWith('vi'));if(vietnamese)utterance.voice=vietnamese;
    utterance.onstart=()=>{speechMode=true;setPlayingUI(true);showToast(vietnamese?'Đang phát bản nghe thử bằng giọng đọc thiết bị.':'Đang phát bản nghe thử. Giọng đọc phụ thuộc vào thiết bị của em.');};
    utterance.onend=()=>{speechMode=false;setPlayingUI(false);$('#currentTime').textContent=story.duration;$('#progressRange').value=100;setRangeFill(100);};
    utterance.onerror=()=>{speechMode=false;setPlayingUI(false);showToast('Thiết bị chưa hỗ trợ giọng đọc tiếng Việt. Hãy thêm file MP3 để nghe bản thu.');};
    window.speechSynthesis.speak(utterance);
  }else{showToast('Trình duyệt chưa hỗ trợ nghe thử. Em có thể thêm file MP3.');}
}
function togglePlayback(){
  if(audio.src){if(audio.paused){audio.play().then(()=>setPlayingUI(true)).catch(()=>{});}else{audio.pause();setPlayingUI(false);}return;}
  if(speechMode&&window.speechSynthesis){window.speechSynthesis.cancel();speechMode=false;setPlayingUI(false);return;}
  startStory(currentStory.id);
}
function renderContinue(){
  const story=stories.find(s=>s.id===recentStoryId);
  if(!story){$('#continueTitle').textContent='Chưa có câu chuyện nào';$('#continueMeta').textContent='Những câu chuyện bạn nghe gần đây sẽ nằm ở đây.';$('#continueThumb').innerHTML='<span>LEORA<br>JOURNAL</span>';return;}
  $('#continueTitle').textContent=story.title;$('#continueMeta').textContent=`${story.episode} · Kể bởi ${story.author}`;$('#continueThumb').style.backgroundImage=`url('${story.cover}')`;
}

storyGrid.addEventListener('click',event=>{
  const play=event.target.closest('[data-play]');const favorite=event.target.closest('[data-favorite]');
  if(play){startStory(play.dataset.play);return;}
  if(favorite){const id=favorite.dataset.favorite;favorites.has(id)?favorites.delete(id):favorites.add(id);saveFavorites();renderStories();return;}
});
$('#savedList').addEventListener('click',event=>{const remove=event.target.closest('[data-remove-favorite]');if(!remove)return;favorites.delete(remove.dataset.removeFavorite);saveFavorites();renderStories();});
$('#filterBar').addEventListener('click',event=>{const pill=event.target.closest('[data-filter]');if(!pill)return;currentFilter=pill.dataset.filter;document.querySelectorAll('.filter-pill').forEach(button=>button.classList.toggle('selected',button===pill));visibleCount=6;renderStories();});
$('#loadMore').addEventListener('click',()=>{visibleCount+=3;renderStories();});
$('#clearFilters').addEventListener('click',()=>{currentFilter='Tất cả';searchTerm='';$('#searchInput').value='';document.querySelectorAll('.filter-pill').forEach(button=>button.classList.toggle('selected',button.dataset.filter==='Tất cả'));renderStories();});
$('#sortButton').addEventListener('click',()=>{sortNewest=!sortNewest;$('#sortButton').innerHTML=sortNewest?'Mới cập nhật <span>⌄</span>':'Cũ hơn <span>⌃</span>';renderStories();});
$('#searchToggle').addEventListener('click',()=>{$('#searchPanel').classList.toggle('open');$('#searchPanel').setAttribute('aria-hidden',String(!$('#searchPanel').classList.contains('open')));if($('#searchPanel').classList.contains('open'))$('#searchInput').focus();});
$('#searchClose').addEventListener('click',()=>$('#searchPanel').classList.remove('open'));
$('#searchInput').addEventListener('input',event=>{searchTerm=event.target.value.trim();visibleCount=6;renderStories();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){$('#searchPanel').classList.remove('open');$('#mainNav')?.classList.remove('open');}if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();$('#searchPanel').classList.add('open');$('#searchInput').focus();}});
$('#heroPlay').addEventListener('click',()=>startStory(stories[0].id));$('#coverPlay').addEventListener('click',()=>startStory(stories[0].id));$('#collectionPlay').addEventListener('click',()=>startStory(stories[1].id));$('#playButton').addEventListener('click',togglePlayback);
$('#playerHeart').addEventListener('click',()=>{favorites.has(currentStory.id)?favorites.delete(currentStory.id):favorites.add(currentStory.id);saveFavorites();$('#playerHeart').textContent=favorites.has(currentStory.id)?'♥':'♡';$('#playerHeart').classList.toggle('saved',favorites.has(currentStory.id));renderStories();showToast(favorites.has(currentStory.id)?'Đã lưu vào góc nhỏ của bạn.':'Đã bỏ khỏi danh sách đã lưu.');});
$('#previousButton').addEventListener('click',()=>{const index=stories.findIndex(s=>s.id===currentStory.id);startStory(stories[(index-1+stories.length)%stories.length].id);});
$('#nextButton').addEventListener('click',()=>{const index=stories.findIndex(s=>s.id===currentStory.id);startStory(stories[(index+1)%stories.length].id);});
$('#continueButton').addEventListener('click',()=>startStory(recentStoryId||stories[0].id));
$('#uploadButton').addEventListener('click',()=>$('#audioUpload').click());
$('#audioUpload').addEventListener('change',event=>{const file=event.target.files?.[0];if(!file)return;if(!file.type.startsWith('audio/')&&!/\.(mp3|m4a|wav|ogg)$/i.test(file.name)){showToast('Vui lòng chọn một file audio.');return;}if(activeAudioUrl)URL.revokeObjectURL(activeAudioUrl);activeAudioUrl=URL.createObjectURL(file);audio.src=activeAudioUrl;audio.load();speechMode=false;showToast(`Đã thêm “${file.name}” cho ${currentStory.title}.`);audio.play().then(()=>setPlayingUI(true)).catch(()=>{setPlayingUI(false);showToast('File đã sẵn sàng. Nhấn nút phát để nghe.');});event.target.value='';});
audio.addEventListener('loadedmetadata',()=>{$('#durationTime').textContent=formatTime(audio.duration);$('#progressRange').max=audio.duration||100;});
audio.addEventListener('timeupdate',()=>{if(!audio.duration)return;const value=audio.currentTime/audio.duration*100;$('#progressRange').value=audio.currentTime;setRangeFill(value);$('#currentTime').textContent=formatTime(audio.currentTime);});
audio.addEventListener('play',()=>setPlayingUI(true));audio.addEventListener('pause',()=>{if(audio.currentTime>0)setPlayingUI(false);});audio.addEventListener('ended',()=>setPlayingUI(false));
$('#progressRange').addEventListener('input',event=>{if(audio.src&&audio.duration){audio.currentTime=Number(event.target.value);setRangeFill(audio.currentTime/audio.duration*100);}else if(speechMode){showToast('Có thể tua khi nghe file MP3 đã tải lên.');}});
$('#mobileMenu').addEventListener('click',()=>$('.main-nav').classList.toggle('open'));
document.querySelectorAll('.main-nav a').forEach(link=>link.addEventListener('click',()=>$('.main-nav').classList.remove('open')));
$('#profileButton').addEventListener('click',()=>showToast('Bản demo hiện lưu thư viện trên thiết bị này. Tài khoản trực tuyến cần kết nối backend.'));

setPlayerStory(currentStory);renderStories();renderSaved();renderContinue();
