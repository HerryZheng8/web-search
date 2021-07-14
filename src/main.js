const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)



const hashMap = xObject || [
  { logo: "A", logoType: "text", url: "https://www.acfun.cn" },
  {
    logo: "B",
    logoType: "text",
    url: "https://www.bilibili.com",
  },
];

const simplifyUrl = (url) => {
    return url.replace('https://','').replace('http://','').replace('www.','').replace(/\/.*/,'') //删除以 / 开头的内容
}

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node,index) => {
    const $li = $(`<li>
      <div class="site">
        <div class="logo">${node.logo[0]}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
            <svg class="icon">
                <use xlink:href="#icon-delete"></use>
            </svg>
        </div>
      </div>
  </li>`).insertBefore($lastLi);
  $li.on('click',() => {
      window.open(node.url)
  })
  $li.on('click','.close',(e) => {
      e.stopPropagation() //阻止冒泡，在点击删除时不触发点击 li 事件
      console.log(hashMap)
      hashMap.splice(index,1)
      render()
  })
  });
};
render()
{
  /* <li>
          <a href="https://www.acfun.cn">
            <div class="site">
              <div class="logo">A</div>
              <div class="link">acfun.cn</div>
            </div>
          </a>
        </li>
        <li>
          <a href="https://www.bilibili.com">
            <div class="site">
              <div class="logo"><img src="./image/bilibili.png" alt=""></div>
              <div class="link">bilibili.com</div>
            </div>
          </a>
        </li> */
}

$(".addButton").on("click", () => {
  let url = window.prompt("请输入需要新增的页面网址");
  if (url.indexOf("http") !== 0) {
    url = "http://" + url;
  }
  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    logoType: "text",
    url: url,
  });
  render()
  });
  window.onbeforeunload = () => {
      const string = JSON.stringify(hashMap)
      localStorage.setItem('x',string)
  }

  $(document).on('keypress',(e)=>{
        const {key} = e //等价 const key = e.key
        const p = document.activeElement
        const input = document.querySelector('.input')
        if(p !== input){
        for(let i = 0;i < hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase() === key){
                    window.open(hashMap[i].url)
        }
        }
    }
    })
